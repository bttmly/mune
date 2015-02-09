# mune [![Build Status](https://travis-ci.org/nickb1080/mune.svg?branch=master)](https://travis-ci.org/nickb1080/mune)
(it's just 'enum' backwards)

## Installation
`npm install mune`

## Usage
```js
var Enum = require("mune");

// can create from an array
var DYNAMIC_LANGS = Enum(["JavaScript", "Python", "Ruby"]);

DYNAMIC_LANGS.JavaScript // => "JavaScript"

delete DYNAMIC_LANGS.JavaScript // => throws error
DYNAMIC_LANGS.Haskell // => throws error
DYNAMIC_LANGS.Clojure = "Clojure"; // => throws error
DYNAMIC_LANGS.Ruby = "Ruby!!!" // => throws error
Object.defineProperty(DYNAMIC_LANGS, "PHP", {
  value: "PHP"
}) // => throws error

// can also create from an object
var EXTENSIONS = Enum({
  ".js": "JavaScript",
  ".rb": "Ruby",
  ".py": "Python"
});

EXTENSIONS[".js"] // => "JavaScript"

delete EXTENSIONS.JavaScript // => throws error
EXTENSIONS.Haskell // => throws error
EXTENSIONS[".clj"] = "Clojure"; // => throws error
EXTENSIONS[".rb"] = "Ruby!!!" // => throws error
Object.defineProperty(EXTENSIONS, ".php", {
  value: "PHP"
}) // => throws error

```

## Why?
Enums are a handy way to store and reference strings and numbers that have particular semantic meaning in an application.

Most other enum implementations in JavaScript have one or both of the following issues:

1. Too complicated. The values are wrapped in a strange way to make them `instanceof` their containing enum, or some other such nonsense. Alternately, there are a ton of superfluous methods addressing obscure use-cases that I never seem to run into.

2. They are functions that you call with a string or whatever to ensure something is a member. Aesthetically, I'm not a fan.

ES6 [proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) give us the ability to hook into many fundamental operations. This allows us to create enums that work with simple property access, and throw errors if an attempt is made to add, change, or delete a property.

Besides being able to throw when accessing an undefined property, this is better than just a [frozen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) object, because messing with frozen objects just fails silently unless you're in strict mode.

## Caveats
Well, one, you need to have a Proxy implementation available. `harmony-reflect` is used here to patch old, non-compliant versions. Also, calling `JSON.stringify()` on an enum will error out becuase it tries to find a `.toJSON` method on the object.
