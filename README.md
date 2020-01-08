# Map anything 🗺

```
npm i map-anything
```

Array.map but for objects. A small and simple integration.

## Motivation

I always want to do:

```js
someObject.map(val => someFunction)
```

But this doesn't exist for objects, so you need to do this instead:

```js
Object.entries(someObject).reduce((carry, [key, value], index, array) => {
  carry[key] = someFunction(value, index, array)
  return carry
}, {})
```

So I made a wrapper function for that. 😃

## Meet the family

- [copy-anything 🎭](https://github.com/mesqueeb/copy-anything)
- [merge-anything 🥡](https://github.com/mesqueeb/merge-anything)
- [filter-anything ⚔️](https://github.com/mesqueeb/filter-anything)
- [find-and-replace-anything 🎣](https://github.com/mesqueeb/find-and-replace-anything)
- [compare-anything 🛰](https://github.com/mesqueeb/compare-anything)
- [flatten-anything 🏏](https://github.com/mesqueeb/flatten-anything)
- [is-what 🙉](https://github.com/mesqueeb/is-what)

## Usage

```js
import { mapObject } from 'map-anything'

const pokemon = {
  '001': { name: 'Bulbasaur', level: 10 },
  '004': { name: 'Charmander', level: 8 },
  '007': { name: 'Squirtle', level: 11 }
}

const levelUp = mapObject(pokemon, pkmn => {
  pkmn.level++
  return pkmn
})

levelUp ===
  {
    '001': { name: 'Bulbasaur', level: 11 },
    '004': { name: 'Charmander', level: 9 },
    '007': { name: 'Squirtle', level: 12 }
  }
```

> Please note, just like `Array.map` when using nested values/objects, the original object will also have its values modified because of references.

## Source code

The source code is literally just this:

```JavaScript
function mapObject (object, fn) {
  return Object.entries(object)
    .reduce((carry, [key, value], index, array) => {
      carry[key] = fn(value, index, array)
      return carry
    }, {})
}
```
