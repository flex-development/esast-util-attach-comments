/**
 * @file Utilities - compare
 * @module esast-util-attach-comments/utils/compare
 */

import type { Nilable } from '@flex-development/tutils'
import type { BaseNodeWithoutComments } from 'estree'

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
 * Object containing positional info.
 *
 * @internal
 */
type PositionalInfo = Pick<BaseNodeWithoutComments, 'loc' | 'position'>

/**
 * Compare `node` against the start position of `comment`.
 *
 * @see {@linkcode PositionalInfo}
 *
 * @internal
 *
 * @this {void}
 *
 * @param {Nilable<PositionalInfo>?} [comment] - Comment node
 * @param {Nilable<PositionalInfo>?} [node] - Node to check
 * @param {boolean?} [end] - Use `end` position of `node` in comparsion?
 * @return {number} Comparison result
 */
function compare(
  this: void,
  comment?: Nilable<PositionalInfo>,
  node?: Nilable<PositionalInfo>,
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

  // compare source location
  if (comment?.loc?.start && node?.loc?.[field]) {
    return (
      comment.loc.start.line - node.loc[field].line ||
      comment.loc.start.column - node.loc[field].column
    )
  }

  return Number.NaN
}

export default compare
