/**
 * @file Integration Tests - util
 * @module esast-util-attach-comments/tests/integration/util
 */

import { constant } from '@flex-development/tutils'
import { fromJs } from 'esast-util-from-js'
import type { Program } from 'estree'
import { visit } from 'estree-util-visit'
import { read } from 'to-vfile'
import { inspectNoColor as inspect } from 'unist-util-inspect'
import type { VFile } from 'vfile'
import type { TestContext } from 'vitest'
import testSubject from '../util'

describe('integration:util', () => {
  let file: VFile
  let tree: Program

  beforeAll(async () => {
    file = await read('__fixtures__/gemoji-shortcode.mjs')
  })

  beforeEach((ctx: TestContext): void => {
    ctx.expect.addSnapshotSerializer({
      print: (val: unknown): string => inspect(val, { showPositions: false }),
      test: constant(true)
    })

    tree = fromJs(String(file), { module: true })
  })

  it('should attach comments', () => {
    // Act
    testSubject(tree, tree.comments)

    // Expect
    expect(tree).toMatchSnapshot()
  })

  it('should handle empty comments list', () => {
    // Act
    testSubject(tree)

    // Expect
    visit(tree, node => {
      if (node.type !== 'Program') {
        expect(node).not.to.have.property('comments')
        expect(node).not.to.have.property('leadingComments')
        expect(node).not.to.have.property('trailingComments')
      }
    })
  })
})
