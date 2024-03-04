/**
 * @file Type Tests - State
 * @module esast-util-attach-comments/types/tests/unit-d/State
 */

import type { Comment } from 'estree'
import type TestSubject from '../state'

describe('unit-d:types/State', () => {
  it('should match [comments: Comment[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('comments')
      .toEqualTypeOf<Comment[]>()
  })

  it('should match [index: number]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('index').toEqualTypeOf<number>()
  })
})
