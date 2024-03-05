/**
 * @file visitor
 * @module esast-util-attach-comments/visitor
 */

import type { Optional } from '@flex-development/tutils'
import type { Node } from 'estree'
import { CONTINUE, EXIT } from 'estree-util-visit'
import type { State, Visitor } from './types'
import { keycheck, slice } from './utils'

declare module 'estree' {
  interface BaseNode {
    comments?: Comment[] | undefined
  }
}

/**
 * Create a visitor to attach comments when entering or leaving a node.
 *
 * @see {@linkcode State}
 * @see {@linkcode Visitor}
 *
 * @param {State} state - Visitor state
 * @param {boolean?} [leave] - Visiting nodes on exit?
 * @return {Visitor} Visitor function
 */
function visitor(state: State, leave?: boolean): Visitor {
  /**
   * Attach comments when entering or leaving `node`.
   *
   * @param {Node} node - Node being entered or exited
   * @param {Optional<string>} key - Field at which `node` lives in its parent
   * (or where a list of nodes live if `parent[key]` is an array)
   * @return {typeof CONTINUE | typeof EXIT} Next action
   */
  return (node: Node, key: Optional<string>): typeof CONTINUE | typeof EXIT => {
    if (!state.comments.length) return EXIT

    if (keycheck(key)) {
      if ((state.leave = !!leave)) {
        node.comments = []
        node.trailingComments = []
        node.trailingComments.push(...slice(state, node))
        node.comments.push(...node.leadingComments!)
        node.comments.push(...node.trailingComments)
      } else {
        node.leadingComments = []
        node.leadingComments.push(...slice(state, node))
      }
    }

    return CONTINUE
  }
}

export default visitor
