if (typeof Proxy === "undefined") {
  throw new Error("Proxies are not supported in this environment");
}

require("harmony-reflect");

function isPrimitive (value) {
  return Object(value) !== value;
}

var IMMUTABLE_MSG = "Enums are immutable once created";
var PRIMITIVE_MSG = "Enum only accepts primitives";

var handler = {
  enumerate: function enumerate (target) {
    return Object.keys(target)[Symbol.iterator]();
  },
  defineProperty: function defineProperty () {
    throw new Error(IMMUTABLE_MSG);
  },
  deleteProperty: function deleteProperty () {
    throw new Error(IMMUTABLE_MSG);
  },
  set: function set () {
    throw new Error(IMMUTABLE_MSG);
  },
  get: function get (target, prop) {
    if (prop in target) return target[prop];
    throw new Error("Enum does not contain " + prop);
  }
};

function enumFromObject (obj) {
  var map = Object.freeze(Object.keys(obj).reduce(function (map, key) {
    if (!isPrimitive(obj[key])) throw new TypeError(PRIMITIVE_MSG);
    map[key] = obj[key];
    return map;
  }, Object.create(null)));

  return new Proxy(map, handler);
}

function enumFromArray (arr) {
  var map = Object.freeze(arr.reduce(function (map, item) {
    if (!isPrimitive(item)) throw new TypeError(PRIMITIVE_MSG);
    map[item] = item;
    return map;
  }, Object.create(null)));

  return new Proxy(map, handler);
}

function EnumFactory (source) {
  if (isPrimitive(source)) throw new TypeError();
  if (Array.isArray(source)) return enumFromArray(source);
  return enumFromObject(source);
}

module.exports = EnumFactory;
