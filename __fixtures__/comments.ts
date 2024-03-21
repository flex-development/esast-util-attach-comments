/**
 * @file Fixtures - comments
 * @module fixtures/comments
 */

import type { State } from '#src/types'
import { sort } from '@flex-development/tutils'
import raw from './comments.json' assert { type: 'json' }

/**
 * Sorted comments list.
 *
 * @see {@linkcode State.comments}
 *
 * @type {State['comments']}
 */
export default sort(<State['comments']>raw, (comment1, comment2) => {
  return (
    comment1.position!.start.line - comment2.position!.start.line ||
    comment1.position!.start.column - comment2.position!.start.column
  )
})
