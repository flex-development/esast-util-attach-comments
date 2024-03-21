/**
 * @file Type Definitions - State
 * @module esast-util-attach-comments/types/State
 */

import type { Comment } from '@flex-development/esast'
import type { Index } from '@flex-development/unist-util-visit'

/**
 * Visitor state.
 *
 * @internal
 */
type State = {
  /**
   * Sorted comments list.
   *
   * @see {@linkcode Comment}
   */
  comments: Comment[]

  /**
   * Index of current comment.
   */
  index: Index
}

export type { State as default }
