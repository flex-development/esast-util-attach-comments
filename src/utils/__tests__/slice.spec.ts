/**
 * @file Unit Tests - slice
 * @module esast-util-attach-comments/utils/tests/unit/slice
 */

import type { State } from '#src/types'
import type { NewExpression } from 'estree'
import testSubject from '../slice'

describe('unit:utils/slice', () => {
  let node: NewExpression
  let state: State

  beforeAll(() => {
    state = {
      comments: [
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
      ],
      index: 0
    }

    node = {
      arguments: [],
      callee: {
        name: 'Set',
        position: {
          end: { column: 41, line: 11, offset: 419 },
          start: { column: 38, line: 11, offset: 416 }
        },
        type: 'Identifier'
      },
      position: {
        end: { column: 43, line: 11, offset: 421 },
        start: { column: 34, line: 11, offset: 412 }
      },
      type: 'NewExpression'
    }
  })

  it('should return slice from state.comments', () => {
    expect(testSubject(state, node))
      .to.be.an('array')
      .of.length(1)
      .with.deep.ordered.members([state.comments[0]])
  })
})
