# Map anything 🗺

<a href="https://www.npmjs.com/package/map-anything"><img src="https://img.shields.io/npm/v/map-anything.svg" alt="Total Downloads"></a>
<a href="https://www.npmjs.com/package/map-anything"><img src="https://img.shields.io/npm/dw/map-anything.svg" alt="Latest Stable Version"></a>

```
npm i map-anything
```

Array.map but for objects with good TypeScript support. A small and simple integration.

## Motivation

I always want to do:

```js
someObject.map(val => someFunction)
```

But this doesn't exist for objects, you need to do this instead:

```js
Object.entries(someObject).reduce((carry, [key, value], index, array) => {
  carry[key] = someFunction(value, key, array)
  return carry
}, {})
```

So I made a wrapper function for that. 😃

`map-anything` has very good [#TypeScript](#typescript) support as well.

## Meet the family (more tiny utils with TS support)

- [is-what 🙉](https://github.com/mesqueeb/is-what)
- [is-where 🙈](https://github.com/mesqueeb/is-where)
- [merge-anything 🥡](https://github.com/mesqueeb/merge-anything)
- [check-anything 👁](https://github.com/mesqueeb/check-anything)
- [remove-anything ✂️](https://github.com/mesqueeb/remove-anything)
- [getorset-anything 🐊](https://github.com/mesqueeb/getorset-anything)
- [map-anything 🗺](https://github.com/mesqueeb/map-anything)
- [filter-anything ⚔️](https://github.com/mesqueeb/filter-anything)
- [copy-anything 🎭](https://github.com/mesqueeb/copy-anything)
- [case-anything 🐫](https://github.com/mesqueeb/case-anything)
- [flatten-anything 🏏](https://github.com/mesqueeb/flatten-anything)
- [nestify-anything 🧅](https://github.com/mesqueeb/nestify-anything)

## Usage

```js
import { mapObject } from 'map-anything'

const pokemon = {
  '001': { name: 'Bulbasaur', level: 10 },
  '004': { name: 'Charmander', level: 8 },
  '007': { name: 'Squirtle', level: 11 },
}

const levelUp = mapObject(pokemon, (pkmn) => {
  return { ...pkmn, level: pkmn.level + 1 }
})

levelUp ===
  {
    '001': { name: 'Bulbasaur', level: 11 },
    '004': { name: 'Charmander', level: 9 },
    '007': { name: 'Squirtle', level: 12 },
  }
```

### Access the propName in the map function

A function passed to `Array.map` will get the value as first argument and an **index** as second. With `mapObject` you will get the **propName** as second argument.

```js
import { mapObject } from 'map-anything'

const addIds = mapObject(pokemon, (pkmn, propName) => {
  const id = propName
  return { ...pkmn, id }
})

addIds ===
  {
  '001': { name: 'Bulbasaur', level: 10, id: '001' },
  '004': { name: 'Charmander', level: 8, id: '004' },
  '007': { name: 'Squirtle', level: 11, id: '007' },
  }
```

## TypeScript

Without having to specify the return type in the reducer, I've set `map-anything` up so it automatically detects that type for you!

![typescript support](https://raw.githubusercontent.com/mesqueeb/map-anything/master/.github/typescript-support.png)

## Source code

The source code is rather simple, it's doing something like the snippet show here below.
<br />However, it's adding amazing typescript.

```JavaScript
function mapObject (object, fn) {
  return Object.entries(object)
    .reduce((carry, [key, value], index, array) => {
      carry[key] = fn(value, key, array)
      return carry
    }, {})
}
```
