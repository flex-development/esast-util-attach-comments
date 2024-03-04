/**
 * @file Utilities - compare
 * @module esast-util-attach-comments/utils/compare
 */

import type { Comment, Node } from 'estree'

declare module 'estree' {
  interface BaseNodeWithoutComments {
    position?: import('unist').Position | undefined
  }
}

/**
 * Field to compare on.
 *
 * @internal
 */
type Field = 'end' | 'start'

/**
 * Compare `node` against the start position of `comment`.
 *
 * @see {@linkcode Comment}
 * @see {@linkcode Node}
 *
 * @internal
 *
 * @this {void}
 *
 * @param {Pick<Comment, 'position'>} comment - Comment node
 * @param {Pick<Comment | Node, 'position'>} node - Node to check
 * @param {boolean?} [end] - Use `end` position of `node` in comparsion?
 * @return {number} Comparison result
 */
function compare(
  this: void,
  comment: Pick<Comment, 'position'>,
  node: Pick<Comment | Node, 'position'>,
  end?: boolean
): number {
  /**
   * Field to compare on.
   *
   * @const {Field} field
   */
  const field: Field = end ? 'end' : 'start'

  // compare positions
  if (comment.position?.start && node.position?.[field]) {
    return (
      comment.position.start.line - node.position[field].line ||
      comment.position.start.column - node.position[field].column
    )
  }

  return Number.NaN
}

export default compare
