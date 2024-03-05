/**
 * @file Unit Tests - compare
 * @module esast-util-attach-comments/utils/tests/unit/compare
 */

import type { Point, Position } from 'unist'
import testSubject from '../compare'

describe('unit:utils/compare', () => {
  it('should return Number.NaN if comparison cannot be made', () => {
    // Arrange
    const cases: Parameters<typeof testSubject>[] = [
      [],
      [{}, null],
      [null, {}, true]
    ]

    // Act + Expect
    cases.forEach(params => expect(testSubject(...params)).to.be.NaN)
  })

  describe.each<'loc' | 'position'>([
    'loc',
    'position'
  ])('%s', field => {
    let comment: Record<string, Position>

    beforeAll(() => {
      comment = {
        [field]: {
          end: { column: 33, line: 11, offset: 411 },
          start: { column: 18, line: 11, offset: 396 }
        }
      }
    })

    it(`should return node.${field}.end.column comparison result`, () => {
      // Arrange
      const end: Point = { column: 16, line: 11, offset: 394 }
      const start: Point = { column: 5, line: 11, offset: 383 }

      // Act
      const result = testSubject(comment, { [field]: { end, start } }, true)

      // Expect
      expect(result).to.equal(comment[field]!.start.column - end.column)
    })

    it(`should return node.${field}.end.line comparison result`, () => {
      // Arrange
      const end: Point = { column: 21, line: 5, offset: 216 }
      const start: Point = { column: 13, line: 5, offset: 208 }

      // Act
      const result = testSubject(comment, { [field]: { end, start } })

      // Expect
      expect(result).to.equal(comment[field]!.start.line - end.line)
    })

    it(`should return node.${field}.start.column comparison result`, () => {
      // Arrange
      const end: Point = { column: 43, line: 11, offset: 421 }
      const start: Point = { column: 34, line: 11, offset: 412 }

      // Act
      const result = testSubject(comment, { [field]: { end, start } })

      // Expect
      expect(result).to.equal(comment[field]!.start.column - start.column)
    })

    it(`should return node.${field}.start.line comparison result`, () => {
      // Arrange
      const end: Point = { column: 50, line: 3, offset: 144 }
      const start: Point = { column: 1, line: 3, offset: 95 }

      // Act
      const result = testSubject(comment, { [field]: { end, start } })

      // Expect
      expect(result).to.equal(comment[field]!.start.line - start.line)
    })
  })
})
