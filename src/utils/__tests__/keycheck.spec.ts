/**
 * @file Unit Tests - keycheck
 * @module esast-util-attach-comments/utils/tests/unit/keycheck
 */

import testSubject from '../keycheck'

describe('unit:utils/keycheck', () => {
  it('should return false if key === "comments"', () => {
    expect(testSubject('comments')).to.be.false
  })

  it('should return false if key === "leadingComments"', () => {
    expect(testSubject('leadingComments')).to.be.false
  })

  it('should return false if key === "trailingComments"', () => {
    expect(testSubject('trailingComments')).to.be.false
  })

  it('should return true if key === undefined', () => {
    expect(testSubject()).to.be.true
  })

  it('should return true if key is not comment field', () => {
    expect(testSubject('body')).to.be.true
  })
})
