/**
 * @file Unit Tests - visitor
 * @module esast-util-attach-comments/tests/unit/visitor
 */

import testSubject from '../visitor'

describe('unit:visitor', () => {
  it('should return visitor function', () => {
    expect(testSubject({ comments: [], index: 0 })).to.be.a('function')
  })
})
