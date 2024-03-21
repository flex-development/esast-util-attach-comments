/**
 * @file Utilities - compare
 * @module esast-util-attach-comments/utils/compare
 */

import type { Nilable } from '@flex-development/tutils'
import type { PositionalInfo } from '@flex-development/unist-util-types'

/**
 * Position field to compare on.
 *
 * @internal
 */
type Field = 'end' | 'start'

/**
 * Compare the position of a `node` against the start or end position of another
 * node. Returns {@linkcode Number.NaN} if a comparison cannot be made.
 *
 * @see {@linkcode PositionalInfo}
 *
 * @internal
 *
 * @this {void}
 *
 * @param {Nilable<PositionalInfo>?} [node] - Positional info of first node
 * @param {Nilable<PositionalInfo>?} [other] - Positional info of second node
 * @param {boolean?} [end] - Use `end` position of `other` node?
 * @return {number} Comparison result or `Number.NaN`
 */
function compare(
  this: void,
  node?: Nilable<PositionalInfo>,
  other?: Nilable<PositionalInfo>,
  end?: boolean
): number {
  /**
   * Other node position field to compare on.
   *
   * @const {Field} otherField
   */
  const otherField: Field = end ? 'end' : 'start'

  /**
   * Node position field to compare on.
   *
   * @const {Field} nodeField
   */
  const nodeField: Field = otherField === 'end' ? 'start' : 'end'

  // compare positions
  if (node?.position?.[nodeField] && other?.position?.[otherField]) {
    return (
      node.position[nodeField].line - other.position[otherField].line ||
      node.position[nodeField].column - other.position[otherField].column
    )
  }

  return Number.NaN
}

export default compare
