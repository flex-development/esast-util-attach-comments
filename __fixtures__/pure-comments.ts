/**
 * @file Fixtures - PURE_COMMENTS
 * @module fixtures/PURE_COMMENTS
 */

import type { Comment } from 'estree'

/**
 * `@__PURE__` block comments.
 *
 * @type {ReadonlyArray<Comment>}
 */
export default Object.freeze<Comment[]>([
  {
    position: {
      end: { column: 33, line: 11, offset: 411 },
      start: { column: 18, line: 11, offset: 396 }
    },
    type: 'Block',
    value: ' @__PURE__ '
  },
  {
    position: {
      end: { column: 27, line: 14, offset: 535 },
      start: { column: 12, line: 14, offset: 520 }
    },
    type: 'Block',
    value: ' @__PURE__ '
  }
])
