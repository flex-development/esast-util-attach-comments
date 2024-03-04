/**
 * @file Utilities - slice
 * @module esast-util-attach-comments/utils/slice
 */

import type { State } from '#src/types'
import type { Comment, Node } from 'estree'
import compare from './compare'

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
  ) result.push(state.comments[state.index++]!)

  return result
}

export default slice
