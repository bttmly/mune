if (typeof Proxy === "undefined") {
  throw new Error("Proxies are not supported in this environment");
}

require("harmony-reflect");

function isPrimitive (value) {
  return Object(value) !== value;
}

function print (msg) {
  var args = [].slice.call(arguments, 1);
  var i = -1;
  return msg.replace(/\%s/g, function () {
    i += 1;
    return args[i];
  });
}

var Errors;

var handler = {
  defineProperty: function defineProperty () {
    throw new Error(Errors.IMMUTABLE);
  },
  deleteProperty: function deleteProperty () {
    throw new Error(Errors.IMMUTABLE);
  },
  set: function set () {
    throw new Error(Errors.IMMUTABLE);
  },
  get: function get (target, prop) {
    if (prop in target) return target[prop];
    throw new Error(print(Errors.DOESNT_CONTAIN, prop));
  }
};

function enumFromObject (obj) {
  var map = Object.freeze(Object.keys(obj).reduce(function (map, key) {
    if (!isPrimitive(obj[key])) throw new TypeError(Errors.NOT_PRIMITIVE);
    map[key] = obj[key];
    return map;
  }, Object.create(null)));

  return new Proxy(map, handler);
}

function enumFromArray (arr) {
  var map = Object.freeze(arr.reduce(function (map, item) {
    if (!isPrimitive(item)) throw new TypeError(Errors.NOT_PRIMITIVE);
    if (map[item]) throw new Error(print(Errors.REPEATED_PROP, item));
    map[item] = item;
    return map;
  }, Object.create(null)));

  return new Proxy(map, handler);
}

function EnumFactory (source) {
  if (isPrimitive(source)) throw new TypeError(Errors.NOT_AN_OBJECT);
  if (Array.isArray(source)) return enumFromArray(source);
  return enumFromObject(source);
}

Errors = EnumFactory({
  IMMUTABLE: "Enums are immutable once created",
  NOT_PRIMITIVE: "Enum only accepts primitives",
  DOESNT_CONTAIN: "Enum does not contain %s",
  REPEATED_PROP: "Attempted to add %s to enum more than once",
  NOT_AN_OBJECT: "Enum must be initialized with an object-like value."
});

module.exports = EnumFactory;
