/**
 * @file Utilities - keycheck
 * @module esast-util-attach-comments/utils/keycheck
 */

/**
 * Allow comment node attachments by `key`.
 *
 * @internal
 *
 * @this {void}
 *
 * @param {string?} key - Field at which a node lives in its parent (or where a
 * list of nodes live if `parent[key]` is an array)
 * @return {boolean} `true` if comments can be attached, `false` otherwise
 */
function keycheck(this: void, key?: string): boolean {
  return !key || !/^(?:comments|(?:leading|trailing)Comments)$/.test(key)
}

export default keycheck
