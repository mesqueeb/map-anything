import test from 'ava'
import { mapObject } from '../src/index'

test('mapObjectWithObjects', (t) => {
  const target = {
    '001': { name: 'Bulbasaur', level: 10 },
    '004': { name: 'Charmander', level: 8 },
    '007': { name: 'Squirtle', level: 11 },
  }

  const res = mapObject(target, (pkmn) => {
    return { ...pkmn, level: pkmn.level + 1 }
  })
  t.deepEqual(res, {
    '001': { name: 'Bulbasaur', level: 11 },
    '004': { name: 'Charmander', level: 9 },
    '007': { name: 'Squirtle', level: 12 },
  })
})

test('with types', (t) => {
  type Pokemon = { name: string, level: number }
  const target: { [id in string]: Pokemon } = {
    '001': { name: 'Bulbasaur', level: 10 },
    '004': { name: 'Charmander', level: 8 },
    '007': { name: 'Squirtle', level: 11 },
  }
  const mapFn = (pkmn: Pokemon): Pokemon => ({ ...pkmn, level: pkmn.level + 1 })

  const res = mapObject(target, mapFn)
  t.deepEqual(res, {
    '001': { name: 'Bulbasaur', level: 11 },
    '004': { name: 'Charmander', level: 9 },
    '007': { name: 'Squirtle', level: 12 },
  })
})

test('mapObjectWithNumbers', (t) => {
  const target = {
    '001': 1,
    '004': 2,
    '007': 3,
  }

  const res = mapObject(target, (val, a, b) => val + 1)

  t.deepEqual(res, {
    '001': 2,
    '004': 3,
    '007': 4,
  })
})

test('set to propname + test type inside of second arg', (t) => {
  type Pokemon = { name: string, level: number }
  const target: { [id in string]: Pokemon } = {
    '001': { name: 'Bulbasaur', level: 10 },
    '004': { name: 'Charmander', level: 8 },
    '007': { name: 'Squirtle', level: 11 },
  }
  const res = mapObject(target, (pkmn, propName) => propName)
  t.deepEqual(res, {
    '001': '001',
    '004': '004',
    '007': '007',
  })
})

test('replace objects with numbers', (t) => {
  type Pokemon = { name: string, level: number }
  const target: { [id in string]: Pokemon } = {
    '001': { name: 'Bulbasaur', level: 10 },
    '004': { name: 'Charmander', level: 8 },
    '007': { name: 'Squirtle', level: 11 },
  }
  const mapFn = (pkmn: Pokemon) => pkmn.name

  const res = mapObject(target, mapFn)
  t.deepEqual(res, {
    '001': 'Bulbasaur',
    '004': 'Charmander',
    '007': 'Squirtle',
  })
})
