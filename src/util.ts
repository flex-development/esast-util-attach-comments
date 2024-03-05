/**
 * @file attachComments
 * @module esast-util-attach-comments/util
 */

import type { Nilable } from '@flex-development/tutils'
import type { Comment, Node } from 'estree'
import { visit } from 'estree-util-visit'
import type { State } from './types'
import { compare } from './utils'
import visitor from './visitor'

/**
 * Attach comment nodes.
 *
 * @template {Node} [T=Node] - Node type
 *
 * @this {void}
 *
 * @param {T} tree - Tree to attach comments to
 * @param {Nilable<Comment[]>?} [comments] - List of comments
 * @return {void} Nothing
 */
function attachComments<T extends Node = Node>(
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
