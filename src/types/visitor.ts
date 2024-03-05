/**
 * @file Type Definitions - Visitor
 * @module esast-util-attach-comments/types/Visitor
 */

import type { Optional } from '@flex-development/tutils'
import type { Node } from 'estree'
import type { CONTINUE, EXIT } from 'estree-util-visit'

/**
 * Attach comments when entering or leaving `node`.
 *
 * @see {@linkcode CONTINUE}
 * @see {@linkcode EXIT}
 * @see {@linkcode Node}
 *
 * @internal
 *
 * @template {Node} [T=Node] - Node type
 *
 * @param {T} node - Node being entered or exited
 * @param {Optional<string>} key - Field at which `node` lives in its parent
 * (or where a list of nodes live if `parent[key]` is an array)
 * @return {typeof CONTINUE | typeof EXIT} Next action
 */
type Visitor<T extends Node = Node> = (
  node: T,
  key: Optional<string>
) => typeof CONTINUE | typeof EXIT

export type { Visitor as default }
