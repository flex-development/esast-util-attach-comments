/**
 * @file Unit Tests - slice
 * @module esast-util-attach-comments/utils/tests/unit/slice
 */

import comments from '#fixtures/comments'
import type { State } from '#src/types'
import { clone } from '@flex-development/tutils'
import type { PositionalInfo } from '@flex-development/unist-util-types'
import testSubject from '../slice'

describe('unit:utils/slice', () => {
  let state: State

  afterEach(() => {
    state.index = 0
  })

  beforeAll(() => {
    state = { comments: clone(comments), index: 0 }
  })

  describe('after', () => {
    let info: PositionalInfo

    beforeAll(() => {
      info = {
        position: {
          end: { column: 2, line: 136 },
          start: { column: 1, line: 44 }
        }
      }
    })

    beforeEach(() => {
      state.index = state.comments.length - 1
    })

    it('should return comments to insert after position', () => {
      // Act
      const result = testSubject(state, info, true)

      // Expect
      expect(result).to.eql([state.comments.at(-1)])
    })
  })

  describe('before', () => {
    let info: PositionalInfo

    beforeAll(() => {
      info = {
        position: {
          end: { column: 20, line: 88 },
          start: { column: 26, line: 85 }
        }
      }
    })

    beforeEach(() => {
      state.index = 0
    })

    it('should return comments to insert before position', () => {
      // Act
      const result = testSubject(state, info)

      // Expect
      expect(result).to.eql(state.comments.slice(0, 10))
    })
  })

  describe('trail', () => {
    let info: PositionalInfo

    beforeAll(() => {
      info = {
        position: {
          end: { column: 27, line: 97 },
          start: { column: 9, line: 96 }
        }
      }
    })

    beforeEach(() => {
      state.index = 11
    })

    it('should return trailing comments', () => {
      // Act
      const result = testSubject(state, info, undefined, true)

      // Expect
      expect(result).to.eql([state.comments.at(state.index - 1)])
    })
  })
})
