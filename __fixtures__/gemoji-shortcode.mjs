/**
 * @file Fixtures - gemojiShortcode
 * @module fixtures/gemojiShortcode
 */

import { ok as assert } from 'devlop'
import { asciiAlphanumeric } from 'micromark-util-character'
import { codes } from 'micromark-util-symbol'

/**
 * Construct a union of `T` and `undefined`.
 *
 * @template T
 * @typedef {import('@flex-development/tutils').Optional<T>} Optional
 */

/**
 * @typedef {import('micromark-util-types').Code} Code
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').Effects} Effects
 * @typedef {import('micromark-util-types').State} State
 * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
 */

/**
 * Guard whether `code` can come before a gemoji.
 *
 * @see {@linkcode Code}
 *
 * @this {TokenizeContext}
 *
 * @param {Code} code - Previous character code
 * @return {boolean} `true` if `code` allowed before construct
 */
function previous(code) {
  return code !== codes.backslash && code !== codes.colon
}

/**
 * Gemoji (`:+1:`) construct.
 *
 * @type {Construct}
 */
export default {
  /**
   * Construct name.
   */
  name: 'gemoji',

  /**
   * Guard whether `code` can come before this construct.
   *
   * @see {@linkcode Code}
   *
   * @this {TokenizeContext}
   *
   * @param {Code} code - Previous character code
   * @return {boolean} `true` if `code` allowed before construct
   */
  previous,

  /**
   * Set up a state machine to process character codes.
   *
   * @see {@linkcode Code}
   * @see {@linkcode Effects}
   * @see {@linkcode State}
   *
   * @this {TokenizeContext}
   *
   * @param {Effects} effects - Context object to transition state machine
   * @param {State} ok - Success state function
   * @param {State} nok - Error state function
   * @return {State} Initial state
   */
  tokenize(effects, ok, nok) {
    /**
     * Process the inside (`+1`) and end (`:`) of a gemoji shortcode.
     *
     * @param {Code} code - Character code to process
     * @return {Optional<State>} Next state
     */
    function inside(code) {
      switch (true) {
        /* end gemoji */ case code === codes.colon:
          effects.consume(code)
          effects.exit('gemoji')
          return ok
        /* inside gemoji */
        case asciiAlphanumeric(code):
        case code === codes.dash:
        case code === codes.plusSign:
        case code === codes.underscore:
          effects.consume(code)
          return inside
        default:
          return nok(code) /* invalid gemoji */
      }
    }

    /**
     * Begin processing a gemoji shortcode.
     *
     * @param {Code} code - Character code to process
     * @return {Optional<State>} Next state
     */
    function begin(code) {
      switch (code) {
        // ignore lone and back to back colons
        case codes.eof:
        case codes.colon:
          return nok(code)
        // entering possible gemoji
        default:
          effects.consume(code)
          return inside
      }
    }

    /**
     * Process the start of a gemoji shortcode (`:`).
     *
     * @param {Code} code - Character code to process
     * @return {State} Next state
     */
    const start = code => {
      assert(code === codes.colon, 'expected `:`')
      assert(previous.call(this, this.previous), 'expected correct previous')
      effects.enter('gemoji')
      effects.consume(code)
      return begin
    }

    return start
  }
}
//# sourceMappingURL=gemoji-shortcode.mjs.map
