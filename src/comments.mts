/**
 * @file comments
 * @module docmark-extension-sass/comments
 */

import { codes, constants } from '@flex-development/docmark-util-symbol'
import type { NormalizedExtension } from '@flex-development/docmark-util-types'
import blockComment from './block.comment.mts'
import lineComment from './line.comment.mts'

/**
 * The sass comments syntax extension.
 *
 * @see {@linkcode NormalizedExtension}
 *
 * @const {NormalizedExtension} comments
 */
const comments: NormalizedExtension = {
  [constants.contentTypeSource]: {
    [codes.slash]: [blockComment, lineComment]
  }
}

export default comments
