/**
 * @file Type Tests - State
 * @module esast-util-attach-comments/types/tests/unit-d/State
 */

import type { Comment } from '@flex-development/esast'
import type { Index } from '@flex-development/unist-util-visit'
import type TestSubject from '../state'

describe('unit-d:types/State', () => {
  it('should match [comments: Comment[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('comments')
      .toEqualTypeOf<Comment[]>()
  })

  it('should match [index: Index]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('index').toEqualTypeOf<Index>()
  })
})
