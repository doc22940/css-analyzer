const test = require('ava')
const analyze = require('../../../src/analyzer/selectors/universal')

test('it responds with the correct structure', t => {
  const fixture = []
  const {total, totalUnique, unique} = analyze(fixture)

  t.is(total, 0)
  t.is(totalUnique, 0)
  t.deepEqual(unique, [])
})

test('it counts the total of all universal selectors', t => {
  const fixture = ['*', '.el * .el', '*', '*::before', '.el > *']
  const {total: actual} = analyze(fixture)
  const expected = 5

  t.is(actual, expected)
})

test('it counts the total of all unique universal selectors', t => {
  const fixture = ['*', '.el * .el', '*', '*::before', '.el > *']
  const {totalUnique: actual} = analyze(fixture)
  const expected = 4

  t.is(actual, expected)
})

test('it finds all unique universal selectors, sorts them and adds a count', t => {
  const fixture = ['*', '*', '.el > *']
  const {unique: actual} = analyze(fixture)
  const expected = [
    {
      value: '*',
      count: 2
    },
    {
      value: '.el > *',
      count: 1
    }
  ]

  t.deepEqual(actual, expected)
})

test('it does not report selectors that are not universal selectors', t => {
  const fixture = ['[class*="test"]']
  const {total, totalUnique, unique} = analyze(fixture)

  t.is(total, 0)
  t.is(totalUnique, 0)
  t.deepEqual(unique, [])
})
