/**
 * @file Internal - indented
 * @module docmark-extension-sass/internal/indented
 */

import type { TokenizeContext } from '@flex-development/docmark-util-types'

/**
 * Check whether continued lines of a block or line comment
 * can be indented in lieu of an explicit line marker.
 *
 * @internal
 *
 * @this {TokenizeContext}
 *
 * @return {boolean}
 *  Whether a continued line can be indented
 */
function indented(this: TokenizeContext): boolean {
  return !!this.parser.constructs.settings.sass?.indented
}

export default indented
