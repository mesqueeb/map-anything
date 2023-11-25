import { test, expect } from 'vitest'
import { mapObject, mapObjectAsync } from '../src/index'

test('mapObjectWithObjects', () => {
  type Pokemon = { name: string; level: number }

  const target: { [id in string]: Pokemon } = {
    '001': { name: 'Bulbasaur', level: 10 },
    '004': { name: 'Charmander', level: 8 },
    '007': { name: 'Squirtle', level: 11 },
  }

  const res = mapObject(target, (pkmn) => {
    return { ...pkmn, level: pkmn.level + 1 }
  })
  expect(res).toEqual({
    '001': { name: 'Bulbasaur', level: 11 },
    '004': { name: 'Charmander', level: 9 },
    '007': { name: 'Squirtle', level: 12 },
  })
})

test('with types', () => {
  type Pokemon = { name: string; level: number }

  const target: { [id in string]: Pokemon } = {
    '001': { name: 'Bulbasaur', level: 10 },
    '004': { name: 'Charmander', level: 8 },
    '007': { name: 'Squirtle', level: 11 },
  }
  const mapFn = (pkmn: Pokemon): Pokemon => ({ ...pkmn, level: pkmn.level + 1 })

  const res = mapObject(target, mapFn)
  expect(res).toEqual({
    '001': { name: 'Bulbasaur', level: 11 },
    '004': { name: 'Charmander', level: 9 },
    '007': { name: 'Squirtle', level: 12 },
  })
})

test('mapObjectWithNumbers', () => {
  const target = { '001': 1, '004': 2, '007': 3 }

  const res = mapObject(target, (val, a, b) => val + 1)

  expect(res).toEqual({ '001': 2, '004': 3, '007': 4 })
})

test('mapAsyncObjectWithNumbers', async () => {
  const target = { '001': 1, '004': 2, '007': 3 }

  const res = await mapObjectAsync(target, async (val, a, b) => {
    await new Promise((resolve) => setTimeout(resolve, 10))
    return val + 1
  })

  expect(res).toEqual({ '001': 2, '004': 3, '007': 4 })
})

test('set to propname + test type inside of second arg', () => {
  type Pokemon = { name: string; level: number }

  const target: { [id in string]: Pokemon } = {
    '001': { name: 'Bulbasaur', level: 10 },
    '004': { name: 'Charmander', level: 8 },
    '007': { name: 'Squirtle', level: 11 },
  }
  const res = mapObject(target, (pkmn, propName) => propName)
  expect(res).toEqual({
    '001': '001',
    '004': '004',
    '007': '007',
  })
})

test('replace objects with numbers', () => {
  type Pokemon = { name: string; level: number }

  const target: { [id in string]: Pokemon } = {
    '001': { name: 'Bulbasaur', level: 10 },
    '004': { name: 'Charmander', level: 8 },
    '007': { name: 'Squirtle', level: 11 },
  }

  const mappedNames = mapObject(target, (pkmn: Pokemon) => pkmn.name)

  expect(mappedNames).toEqual({
    '001': 'Bulbasaur',
    '004': 'Charmander',
    '007': 'Squirtle',
  })
})
