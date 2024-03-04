/**
 * @file Type Definitions - State
 * @module esast-util-attach-comments/types/State
 */

import type { Comment } from 'estree'

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
  index: number
}

export type { State as default }
