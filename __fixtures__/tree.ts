/**
 * @file Fixtures - tree
 * @module fixtures/tree
 */

import type { Root } from '@flex-development/esast'
import { read } from 'to-vfile'
import type { VFile } from 'vfile'

/**
 * JSON file.
 *
 * @const {VFile} file
 */
const file: VFile = await read('__fixtures__/tree.json', 'utf8')

/**
 * ECMAScript syntax tree.
 *
 * @type {Root}
 */
export default <Root>Object.freeze(JSON.parse(String(file)))
