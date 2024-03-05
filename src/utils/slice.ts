/**
 * @file Utilities - slice
 * @module esast-util-attach-comments/utils/slice
 */

import type { State } from '#src/types'
import type { Comment, Node } from 'estree'
import compare from './compare'

declare module 'estree' {
  interface Comment {
    leading?: boolean | undefined
    trailing?: boolean | undefined
  }
}

/**
 * Get a comments slice.
 *
 * @see {@linkcode Comment}
 * @see {@linkcode Node}
 * @see {@linkcode State}
 *
 * @internal
 *
 * @this {void}
 *
 * @param {State} state - Visitor state
 * @param {Node} node - Node being visited
 * @return {Comment[]} Slice from `state.comments`
 */
function slice(this: void, state: State, node: Node): Comment[] {
  /**
   * Slice result.
   *
   * @const {Comment[]} result
   */
  const result: Comment[] = []

  // get slice
  while (
    state.comments[state.index] &&
    compare(state.comments[state.index], node, state.leave) < 1
  ) {
    /**
     * Comment node.
     *
     * @const {Comment} comment
     */
    const comment: Comment = state.comments[state.index++]!

    // set fields
    comment.leading = state.leave !== true
    comment.trailing = state.leave === true

    // add comment to slice
    result.push(comment)
  }

  return result
}

export default slice
