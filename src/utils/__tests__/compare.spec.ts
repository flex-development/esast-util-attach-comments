/**
 * @file Unit Tests - compare
 * @module esast-util-attach-comments/utils/tests/unit/compare
 */

import comments from '#fixtures/comments.json' assert { type: 'json' }
import type { Shake } from '@flex-development/tutils'
import type { PositionalInfo } from '@flex-development/unist-util-types'
import type { Point, Position } from 'unist'
import testSubject from '../compare'

describe('unit:utils/compare', () => {
  it('should return Number.NaN if comparison cannot be made', () => {
    expect(testSubject()).to.be.NaN
  })

  describe('position', () => {
    let node: Required<Shake<PositionalInfo>>

    beforeAll(() => {
      node = comments[0]!
    })

    it('should return position.end.column comparison result', () => {
      // Arrange
      const position: Position = {
        end: node.position.start,
        start: { column: 1, line: node.position.start.line - 2 }
      }

      // Act
      const result = testSubject(node, { position }, true)

      // Expect
      expect(result).to.equal(node.position.start.column - position.end.column)
    })

    it('should return position.end.line comparison result', () => {
      // Arrange
      const { position } = comments[1]!

      // Act
      const result = testSubject(node, { position }, true)

      // Expect
      expect(result).to.equal(node.position.start.line - position.end.line)
    })

    it('should return position.start.column comparison result', () => {
      // Arrange
      const start: Point = {
        ...node.position.end,
        column: node.position.end.column + 4
      }

      // Act
      const result = testSubject(node, {
        position: {
          end: node.position.end,
          start
        }
      })

      // Expect
      expect(result).to.equal(node.position.end.column - start.column)
    })

    it('should return position.start.line comparison result', () => {
      // Arrange
      const { position } = comments[2]!

      // Act
      const result = testSubject(node, { position })

      // Expect
      expect(result).to.equal(node.position.end.line - position.start.line)
    })
  })
})
