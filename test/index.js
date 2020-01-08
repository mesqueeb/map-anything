import test from 'ava'
import { mapObject } from '../dist/index.cjs'

test('mapObject', t => {
  let res, target
  target = {
    '001': { name: 'Bulbasaur', level: 10 },
    '004': { name: 'Charmander', level: 8 },
    '007': { name: 'Squirtle', level: 11 }
  }
  res = mapObject(target, pkmn => {
    pkmn.level++
    return pkmn
  })
  t.deepEqual(res, {
    '001': { name: 'Bulbasaur', level: 11 },
    '004': { name: 'Charmander', level: 9 },
    '007': { name: 'Squirtle', level: 12 }
  })
})
