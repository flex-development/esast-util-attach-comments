/**
 * @file Utilities - compare
 * @module esast-util-attach-comments/utils/compare
 */

import type { Nilable } from '@flex-development/tutils'
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
 * @param {Nilable<Pick<Comment, 'position'>>?} [comment] - Comment node
 * @param {Nilable<Pick<Comment | Node, 'position'>>?} [node] - Node to check
 * @param {boolean?} [end] - Use `end` position of `node` in comparsion?
 * @return {number} Comparison result
 */
function compare(
  this: void,
  comment?: Nilable<Pick<Comment, 'position'>>,
  node?: Nilable<Pick<Comment | Node, 'position'>>,
  end?: boolean
): number {
  /**
   * Field to compare on.
   *
   * @const {Field} field
   */
  const field: Field = end ? 'end' : 'start'

  // compare positions
  if (comment?.position?.start && node?.position?.[field]) {
    return (
      comment.position.start.line - node.position[field].line ||
      comment.position.start.column - node.position[field].column
    )
  }

  return Number.NaN
}

export default compare
