/**
 * @file Type Tests - Visitor
 * @module esast-util-attach-comments/types/tests/unit-d/Visitor
 */

import type { Optional } from '@flex-development/tutils'
import type { NewExpression } from 'estree'
import type { CONTINUE, EXIT } from 'estree-util-visit'
import type TestSubject from '../visitor'

describe('unit-d:types/Visitor', () => {
  it('should be callable with [T, Optional<string>]', () => {
    expectTypeOf<TestSubject<NewExpression>>()
      .parameters
      .toEqualTypeOf<[NewExpression, Optional<string>]>()
  })

  it('should return typeof CONTINUE | typeof EXIT', () => {
    expectTypeOf<TestSubject>()
      .returns
      .toEqualTypeOf<typeof CONTINUE | typeof EXIT>()
  })
})
