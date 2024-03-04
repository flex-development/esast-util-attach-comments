/**
 * @file Type Tests - State
 * @module esast-util-attach-comments/types/tests/unit-d/State
 */

import type { Optional } from '@flex-development/tutils'
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

  it('should match [leave?: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('leave')
      .toEqualTypeOf<Optional<boolean>>()
  })
})
