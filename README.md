# mune
(it's just 'enum' backwards)

## Why?
Most other enum implementations in JavaScript have one or both of the following issues:

1. Too complicated. The values are wrapped in a strange way to make them `instanceof` their containing enum, or some other such nonsense. Alternately, there are a ton of superfluous methods addressing obscure use-cases that I never seem to run into.
2. They are functions that you call to ensure something is a member. Aesthetically, I'm not a fan.

ES6 [proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) give us the ability to hook into many fundamental operations. This allows us to create enums that work with simple property access, and throw errors if an attempt is made to add, change, or delete a property. 

Besides being able to throw when accessing an undefined property, this is better than just a [frozen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) object, because messing with frozen objects just fails silently unless you're in strict mode.
