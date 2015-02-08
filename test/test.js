var expect = require("chai").expect;

var Enum = require("..");

describe("bad call", function () {
  it("throws when passed a string", function () {
    expect(function () {
      Enum("string");
    }).to.throw(TypeError);
  });

  it("throws when passed a number", function () {
    expect(function () {
      Enum(123);
    }).to.throw(TypeError);
  });

  it("throws when passed a boolean", function () {
    expect(function () {
      Enum(false);
    }).to.throw(TypeError);
  });

  it("throws when passed a symbol", function () {
    expect(function () {
      Enum(Symbol("s"));
    }).to.throw(TypeError);
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
    }).to.throw();
  });

  it("creates an enum with each of the array's members", function () {
    expect(Object.keys(e)).to.deep.equal(arr);
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
    }).to.throw();
  });

  it("throws when attempting to set a property", function () {
    expect(function () {
      e.Circles = "Circles";
    }).to.throw();
  });

  it("throws when attempting to define a property", function () {
    expect(function () {
      Object.defineProperty(e, "Circles", {
        value: "Circles"
      });
    }).to.throw();
  });

  it("throws when attempting to delete a property", function () {
    expect(function () {
      delete e.Spades;
    }).to.throw();
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

  it("mandates that each property of the object is a primitive value", function () {
    expect(function () {
      Enum({obj: {}})
    }).to.throw();
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
    }).to.throw();
  });

  it("throws when attempting to set a property", function () {
    expect(function () {
      e.MIA = "Miami Heat";
    }).to.throw();
  });

  it("throws when attempting to define a property", function () {
    expect(function () {
      Object.defineProperty(e, "MIA", {
        value: "Miami Heat"
      });
    }).to.throw();
  });

  it("throws when attempting to delete a property", function () {
    expect(function () {
      delete e.GSW;
    }).to.throw();
  });

  it("reports as non-extensible", function () {
    expect(Object.isExtensible(e)).to.equal(false);
  });

});
