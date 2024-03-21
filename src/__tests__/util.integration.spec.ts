/**
 * @file Integration Tests - util
 * @module esast-util-attach-comments/tests/integration/util
 */

import comments from '#fixtures/comments'
import * as utils from '#src/utils'
import type { Spy } from '#tests/interfaces'
import type { Root } from '@flex-development/esast'
import { clone, constant } from '@flex-development/tutils'
import { inspectNoColor as inspect } from 'unist-util-inspect'
import type { TestContext } from 'vitest'
import testSubject from '../util'

describe('integration:util', () => {
  let slice: Spy<(typeof utils)['slice']>
  let tree: Root

  beforeEach(async () => {
    slice = vi.spyOn(utils, 'slice').mockName('slice')
    tree = clone((await import('#fixtures/tree')).default)
  })

  beforeEach((ctx: TestContext): void => {
    ctx.expect.addSnapshotSerializer({
      print: (val: unknown): string => inspect(val),
      test: constant(true)
    })
  })

  it('should attach comments', () => {
    // Act
    testSubject(tree, comments)

    // Expect
    expect(tree).toMatchSnapshot()
  })

  it('should handle empty comments list', () => {
    // Act
    testSubject(tree)

    // Expect
    expect(slice).not.toHaveBeenCalled()
  })
})
