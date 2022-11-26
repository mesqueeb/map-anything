import { test, expect } from 'vitest'
import { mapMap } from '../src/index'

test('mapMapWithObjects', () => {
  type Pokemon = { name: string; level: number }

  const target: Map<string, Pokemon> = new Map([
    ['001', { name: 'Bulbasaur', level: 10 }],
    ['004', { name: 'Charmander', level: 8 }],
    ['007', { name: 'Squirtle', level: 11 }],
  ])

  const res = mapMap(target, (pkmn) => {
    return { ...pkmn, level: pkmn.level + 1 }
  })
  expect([...res.entries()]).toEqual([
    ['001', { name: 'Bulbasaur', level: 11 }],
    ['004', { name: 'Charmander', level: 9 }],
    ['007', { name: 'Squirtle', level: 12 }],
  ])
})

test('with types', () => {
  type Pokemon = { name: string; level: number }

  const target: Map<string, Pokemon> = new Map([
    ['001', { name: 'Bulbasaur', level: 10 }],
    ['004', { name: 'Charmander', level: 8 }],
    ['007', { name: 'Squirtle', level: 11 }],
  ])
  const mapFn = (pkmn: Pokemon): Pokemon => ({ ...pkmn, level: pkmn.level + 1 })

  const res = mapMap(target, mapFn)
  expect([...res.entries()]).toEqual([
    ['001', { name: 'Bulbasaur', level: 11 }],
    ['004', { name: 'Charmander', level: 9 }],
    ['007', { name: 'Squirtle', level: 12 }],
  ])
})

test('mapMapWithNumbers', () => {
  const target = new Map([
    ['001', 1],
    ['004', 2],
    ['007', 3],
  ])

  const res = mapMap(target, (val, a, b) => val + 1)

  expect([...res.entries()]).toEqual([
    ['001', 2],
    ['004', 3],
    ['007', 4],
  ])
})

test('set to propname + test type inside of second arg', () => {
  type Pokemon = { name: string; level: number }

  const target: Map<string, Pokemon> = new Map([
    ['001', { name: 'Bulbasaur', level: 10 }],
    ['004', { name: 'Charmander', level: 8 }],
    ['007', { name: 'Squirtle', level: 11 }],
  ])

  const res = mapMap(target, (pkmn, propName) => propName)
  expect([...res.entries()]).toEqual([
    ['001', '001'],
    ['004', '004'],
    ['007', '007'],
  ])
})

test('replace objects with numbers', () => {
  type Pokemon = { name: string; level: number }

  const target: Map<string, Pokemon> = new Map([
    ['001', { name: 'Bulbasaur', level: 10 }],
    ['004', { name: 'Charmander', level: 8 }],
    ['007', { name: 'Squirtle', level: 11 }],
  ])

  const res = mapMap(target, (pkmn: Pokemon) => pkmn.name)

  expect([...res.entries()]).toEqual([
    ['001', 'Bulbasaur'],
    ['004', 'Charmander'],
    ['007', 'Squirtle'],
  ])
})
