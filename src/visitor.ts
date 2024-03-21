/**
 * @file visitor
 * @module esast-util-attach-comments/visitor
 */

import type { Comment, EsastNode } from '@flex-development/esast'
import type { Optional } from '@flex-development/tutils'
import {
  CONTINUE,
  EXIT,
  SKIP,
  type Action,
  type Index,
  type VisitedAncestor,
  type VisitedNode,
  type VisitedParent,
  type Visitor
} from '@flex-development/unist-util-visit'
import { ok } from 'devlop'
import type { State } from './types'
import { slice } from './utils'

/**
 * Create a visitor to attach comments when entering or leaving a node.
 *
 * @see {@linkcode EsastNode}
 * @see {@linkcode State}
 * @see {@linkcode Visitor}
 *
 * @template {EsastNode} [T=EsastNode] - esast node
 *
 * @this {void}
 *
 * @param {State} state - Visitor state
 * @param {boolean?} [leave] - Visiting nodes on exit?
 * @return {Visitor<T>} Visitor function
 */
function visitor<T extends EsastNode = EsastNode>(
  this: void,
  state: State,
  leave?: boolean
): Visitor<T> {
  /**
   * Attach comments when entering or leaving `node`.
   *
   * @see {@linkcode Action}
   * @see {@linkcode Index}
   * @see {@linkcode VisitedAncestor}
   * @see {@linkcode VisitedNode}
   * @see {@linkcode VisitedParent}
   *
   * @param {VisitedNode<T>} node - Node being entered or exited
   * @param {Optional<Index>} index - Index of `node` in `parent`
   * @param {Optional<VisitedParent<T>>} parent - Parent of `node`
   * @param {VisitedAncestor<T>[]} ancestors - Ancestors of `node`, if any, with
   * the last node being the grandparent of `node`
   * @return {Action | Index} Next action or index
   */
  return (
    node: VisitedNode<T>,
    index: Optional<Index>,
    parent: Optional<VisitedParent<T>>,
    ancestors: VisitedAncestor<T>[]
  ): Action | Index => {
    if (state.index >= state.comments.length) return EXIT
    if (!parent || !node.position) return CONTINUE
    if (node.type === 'comment') return SKIP
    ok(typeof index === 'number', 'expected `index` to be a number')

    /**
     * Comments slice result.
     *
     * @var {Comment[]} result
     */
    let result: Comment[] = []

    // attach comments
    if (!leave) {
      // insert comments positioned before node
      result = slice(state, node)
      parent.children.splice(index, 0, ...result)
      index += result.length

      // insert trailing comments
      result = slice(state, node, undefined, true)
      parent.children.splice(index + 1, 0, ...result)
      index += result.length
    } else {
      // insert comments positioned after last node in tree
      if (!ancestors.length && !parent.children[index + 1]) {
        result = slice(state, node, true)
        parent.children.splice(index + 1, 0, ...result)
        index += result.length
      }
    }

    return index + 1
  }
}

export default visitor
