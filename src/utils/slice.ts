/**
 * @file Utilities - slice
 * @module esast-util-attach-comments/utils/slice
 */

import type { State } from '#src/types'
import type { Comment, LineCommentData } from '@flex-development/esast'
import type { Optional } from '@flex-development/tutils'
import type { PositionalInfo } from '@flex-development/unist-util-types'
import { ok } from 'devlop'
import compare from './compare'

/**
 * Get a comments slice.
 *
 * @see {@linkcode Comment}
 * @see {@linkcode PositionalInfo}
 * @see {@linkcode State}
 *
 * @internal
 *
 * @this {void}
 *
 * @param {State} state - Visitor state
 * @param {PositionalInfo} node - Positional info of node being visited
 * @param {boolean?} [end] - Use `end` position of `node` in comparison?
 * @param {boolean?} [trail] - Slice trailing comments only?
 * @return {Comment[]} Slice from `state.comments`
 */
function slice(
  this: void,
  state: State,
  node: PositionalInfo,
  end?: boolean,
  trail?: boolean
): Comment[] {
  if (trail) end = trail

  /**
   * Slice result.
   *
   * @const {Comment[]} result
   */
  const result: Comment[] = []

  /**
   * Check if a comment should be included in {@linkcode result}.
   *
   * @param {number} diff - Comparison result
   * @return {boolean} `true` if comment should be included in slice
   */
  const check = (diff: number): boolean => {
    return !Number.isNaN(diff) && !!diff && (end ? diff > 0 : diff < 1)
  }

  /**
   * Current comment.
   *
   * @var {Optional<Comment>} comment
   */
  let comment: Optional<Comment> = state.comments[state.index]

  // slice comments
  while (comment && check(compare(comment, node, end))) {
    ok(comment.position, 'expected `comment.position`')
    ok(node.position, 'expected `node.position`')

    // mark leading and trailing comments
    if (comment.position.start.line === comment.position.end.line) {
      if (
        comment.position.start.line === node.position.start.line ||
        comment.position.start.line === node.position.end.line
      ) {
        /**
         * Leading comment check.
         *
         * @const {boolean} leading
         */
        const leading: boolean = compare(comment, node) < 1

        /**
         * Trailing comment check.
         *
         * @const {boolean} trailing
         */
        const trailing: boolean = compare(comment, node, true) > 0

        // set leading and trailing fields on comment.data
        if (leading || trailing) {
          comment.data ??= {}
          if (leading) (<Record<string, any>>comment.data).leading = leading
          if (trailing) (<Record<string, any>>comment.data).trailing = trailing
        }
      }
    }

    // slice trailing comments only
    if (trail) {
      const { trailing } = <LineCommentData>(comment.data ?? {})
      if (!trailing) break
    }

    result.push(comment)
    comment = state.comments[++state.index]
  }

  return result
}

export default slice
