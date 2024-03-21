/**
 * @file E2E Tests - api
 * @module esast-util-attach-comments/tests/e2e/api
 */

import * as testSubject from '../index'

describe('e2e:esast-util-attach-comments', () => {
  it('should expose public api', () => {
    expect(testSubject).to.have.keys(['attachComments'])
  })
})
