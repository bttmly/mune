var expect = require("chai").expect;

var Enum = require("../lib");

describe("bad call", function () {
  it("throws when passed a string", function () {
    expect(function () {
      Enum("string");
    }).to.throw(/Enum must be initialized with an object-like value/);
  });

  it("throws when passed a number", function () {
    expect(function () {
      Enum(123);
    }).to.throw(/Enum must be initialized with an object-like value/);
  });

  it("throws when passed a boolean", function () {
    expect(function () {
      Enum(false);
    }).to.throw(/Enum must be initialized with an object-like value/);
  });

  if (typeof Symbol !== "undefined") {
    it("throws when passed a symbol", function () {
      expect(function () {
        Enum(Symbol("s"));
      }).to.throw(/Enum must be initialized with an object-like value/);
    });
  }

});

describe("enum", function () {
  it("has a null prototype", function () {
    expect(Object.getPrototypeOf(Enum([1]))).to.equal(null);
  });
});

describe("enum from array", function () {
  var arr, e;
  beforeEach(function () {
    arr = ["Diamonds", "Clubs", "Hearts", "Spades"];
    e = Enum(arr);
  });

  it("mandates that each member of the array is a primitive value", function () {
    expect(function () {
      Enum([{}])
    }).to.throw(/Enum only accepts primitives/);
  });

  it("throws when trying to initialize an enum with an array with a repeated value", function () {
    expect(function () {
      Enum(["a", "b", "c", "b"]);
    }).to.throw(/Attempted to add b to enum more than once/)
  });

  it("creates an enum with each of the array's members", function () {
    expect(Object.keys(e).sort()).to.deep.equal(arr.sort());
    arr.forEach(function (member) {
      expect(e[member]).to.equal(member);
    });
  });

  it("allows enumeration of keys with `for ... in`", function () {
    var vals = [];
    for (var key in e) vals.push(key);
    expect(vals).to.deep.equal(arr);
  });

  it("throws on property access when value isn't in enum", function () {
    expect(function () {
      e.NotASuit;
    }).to.throw(/Enum does not contain NotASuit/);
  });

  it("throws when attempting to set a property", function () {
    expect(function () {
      e.Circles = "Circles";
    }).to.throw(/Enums are immutable once created/);
  });

  it("throws when attempting to define a property", function () {
    expect(function () {
      Object.defineProperty(e, "Circles", {
        value: "Circles"
      });
    }).to.throw(/Enums are immutable once created/);
  });

  it("throws when attempting to delete a property", function () {
    expect(function () {
      delete e.Spades;
    }).to.throw(/Enums are immutable once created/);
  });

  it("reports as non-extensible", function () {
    expect(Object.isExtensible(e)).to.equal(false);
  });

});

describe("enum from object", function () {
  var map, e;
  beforeEach(function () {
    map = {
      GSW: "Golden State Warriors",
      OKC: "Oklahoma City Thunder",
      SAS: "San Antonio Spurs"
    }
    e = Enum(map);
  });

  it("can create an enum from an existing enum", function () {
    var ee = Enum(e);
    Object.keys(ee).forEach(function (key) {
      expect(ee[key]).to.equal(e[key]);
    });
  });

  it("mandates that each property of the object is a primitive value", function () {
    expect(function () {
      Enum({obj: {}})
    }).to.throw(/Enum only accepts primitives/);
  });

  it("creates an enum with each of the array's members", function () {
    expect(Object.keys(e).sort()).to.deep.equal(Object.keys(map).sort());
    Object.keys(map).forEach(function (member) {
      expect(e[member]).to.equal(map[member]);
    });
  });

  it("allows enumeration of keys with `for ... in`", function () {
    var vals = [];
    for (var key in e) vals.push(key);
    expect(vals).to.deep.equal(Object.keys(map));
  });

  it("throws on property access when value isn't in enum", function () {
    expect(function () {
      e.MIA;
    }).to.throw(/Enum does not contain MIA/);
  });

  it("throws when attempting to set a property", function () {
    expect(function () {
      e.MIA = "Miami Heat";
    }).to.throw(/Enums are immutable once created/);
  });

  it("throws when attempting to define a property", function () {
    expect(function () {
      Object.defineProperty(e, "MIA", {
        value: "Miami Heat"
      });
    }).to.throw(/Enums are immutable once created/);
  });

  it("throws when attempting to delete a property", function () {
    expect(function () {
      delete e.GSW;
    }).to.throw(/Enums are immutable once created/);
  });

  it("reports as non-extensible", function () {
    expect(Object.isExtensible(e)).to.equal(false);
  });

});
