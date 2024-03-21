/**
 * @file attachComments
 * @module esast-util-attach-comments/util
 */

import type { Comment, EsastNode } from '@flex-development/esast'
import type { Nilable } from '@flex-development/tutils'
import { visit } from '@flex-development/unist-util-visit'
import type { State } from './types'
import { compare } from './utils'
import visitor from './visitor'

/**
 * Attach comment nodes to [`tree`][1].
 *
 * Given `comments`, the algorithm visits each node in `tree`, and adds comments
 * as close as possible to where they originated. The algorithm performs
 * [*depth-first*][2] [*tree traversal*][3] in [*reverse preorder*][4]
 * (**NRL**).
 *
 * Leading and trailing comments are marked using two boolean fields, both of
 * which are set on `node.data`: `leading` and `trailing`. Leading comments
 * start and end on the same [`start`][5] line as the non-comment node they
 * precede. Trailing comments start and end on the same [`end`][5] line as the
 * non-comment node they succeed.
 *
 * [1]: https://github.com/syntax-tree/unist#tree
 * [2]: https://github.com/syntax-tree/unist#depth-first-traversal
 * [3]: https://github.com/syntax-tree/unist#tree-traversal
 * [4]: https://github.com/syntax-tree/unist#preorder
 * [5]: https://github.com/syntax-tree/unist#position
 *
 * @see {@linkcode Comment}
 * @see {@linkcode EsastNode}
 *
 * @template {EsastNode} [T=EsastNode] - Tree to traverse
 *
 * @this {void}
 *
 * @param {T} tree - Tree to attach comments to
 * @param {Nilable<Comment[]>?} [comments] - List of comments
 * @return {void} Nothing
 */
function attachComments<T extends EsastNode = EsastNode>(
  this: void,
  tree: T,
  comments?: Nilable<Comment[]>
): void {
  /**
   * Visitor state.
   *
   * @const {State} state
   */
  const state: State = {
    comments: [...(comments ?? [])].sort(compare),
    index: 0
  }

  return void visit(tree, {
    enter: visitor(state),
    leave: visitor(state, true)
  })
}

export default attachComments
