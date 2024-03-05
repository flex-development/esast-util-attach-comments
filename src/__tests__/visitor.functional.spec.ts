/**
 * @file Functional Tests - visitor
 * @module esast-util-attach-comments/tests/functional/visitor
 */

import PURE_COMMENTS from '#fixtures/pure-comments'
import type { State } from '#src/types'
import * as utils from '#src/utils'
import type { Spy } from '#tests/interfaces'
import type { NewExpression, Program } from 'estree'
import testSubject from '../visitor'

describe('functional:visitor', () => {
  let emptyProgram: Program
  let emptyState: State
  let keycheck: Spy<(typeof utils)['keycheck']>
  let slice: Spy<(typeof utils)['slice']>

  beforeAll(() => {
    emptyProgram = { body: [], sourceType: 'module', type: 'Program' }
    emptyState = { comments: [], index: 0 }
  })

  beforeEach(() => {
    keycheck = vi.spyOn(utils, 'keycheck').mockName('keycheck')
    slice = vi.spyOn(utils, 'slice').mockName('slice')
  })

  describe('enter', () => {
    describe('!state.comments.length', () => {
      beforeEach(() => {
        testSubject(emptyState)(emptyProgram, undefined)
      })

      it('should do nothing if no comments to attach', () => {
        expect(keycheck).not.toHaveBeenCalled()
      })
    })

    describe('state.comments.length > 0', () => {
      let node: NewExpression
      let state: State

      beforeAll(() => {
        state = {
          comments: [...PURE_COMMENTS],
          index: 1
        }

        node = {
          arguments: [],
          callee: {
            name: 'WeakSet',
            position: {
              end: { column: 39, line: 14, offset: 547 },
              start: { column: 32, line: 14, offset: 540 }
            },
            type: 'Identifier'
          },
          position: {
            end: { column: 41, line: 14, offset: 549 },
            start: { column: 28, line: 14, offset: 536 }
          },
          type: 'NewExpression'
        }
      })

      beforeEach(() => {
        testSubject(state)(node, 'value')
      })

      it('should attach leading comments', () => {
        // Arrange
        const property: string = 'leadingComments'

        // Expect
        expect(slice).toHaveBeenCalledOnce()
        expect(slice).toHaveBeenCalledWith(state, node)
        expect(node).to.have.deep.property(property, [state.comments[1]])
      })
    })
  })

  describe('leave', () => {
    let leave: true

    beforeAll(() => {
      leave = true
    })

    describe('!state.comments.length', () => {
      beforeEach(() => {
        testSubject(emptyState, leave)(emptyProgram, undefined)
      })

      it('should do nothing if no comments to attach', () => {
        expect(keycheck).not.toHaveBeenCalled()
      })
    })

    describe('state.comments.length > 0', () => {
      let node: Program
      let state: State

      beforeAll(() => {
        state = {
          comments: [
            {
              position: {
                end: { column: 38, line: 2, offset: 38 },
                start: { column: 1, line: 2, offset: 1 }
              },
              type: 'Line',
              value: '# sourceMappingURL=polyfill.mjs.map'
            }
          ],
          index: 0
        }

        node = {
          body: [],
          position: {
            end: { column: 1, line: 3, offset: 39 },
            start: { column: 1, line: 1, offset: 0 }
          },
          sourceType: 'module',
          type: 'Program'
        }
      })

      beforeEach(() => {
        testSubject(state)(node, undefined)
        testSubject(state, leave)(node, undefined)
      })

      it('should attach comments', () => {
        expect(slice).toHaveBeenCalledWith(state, node)
        expect(node).to.have.deep.property('comments', state.comments)
        expect(node).to.have.deep.property('trailingComments', state.comments)
      })
    })
  })
})
