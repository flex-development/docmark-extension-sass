/**
 * @file lineComment
 * @module docmark-extension-sass/lineComment
 */

import { factoryLineComment } from '@flex-development/docmark-factory-line'
import { codes, ev, kind, tt } from '@flex-development/docmark-util-symbol'
import type {
  ContinuableConstruct,
  Event
} from '@flex-development/docmark-util-types'
import { ok } from 'devlop'
import indented from './internal/indented.mts'

/**
 * The sass line comment construct.
 *
 * This construct is expected to run at the `source` content level.
 *
 * @see {@linkcode ContinuableConstruct}
 *
 * @const {ContinuableConstruct} lineComment
 */
const lineComment: ContinuableConstruct = factoryLineComment({
  allowIndentedContinuation: indented,
  construct: { resolve: resolveLineComment },
  fields: { info: undefined },
  markers: [codes.slash, codes.slash, { code: codes.slash, optional: true }]
})

export default lineComment

/**
 * Determine if any line comments are documentation comments.
 *
 * @internal
 *
 * @this {void}
 *
 * @param {Event[]} events
 *  The current list of events
 * @return {Event[]}
 *  The list of changed events
 */
function resolveLineComment(this: void, events: Event[]): Event[] {
  /**
   * The index of the current event.
   *
   * @var {number} index
   */
  let index: number = -1

  while (++index < events.length) {
    ok(events[index], 'expected `events[index]`')
    const [event, token, self] = events[index]!

    // determine if a line comment is a documentation comment.
    if (
      event === ev.enter &&
      token.type === tt.comment &&
      token.kind === kind.line
    ) {
      ok(self.containerState, 'expected `containerState` inside comment')
      ok(self.containerState.openerWidth, 'expected comment opener width')

      // a documentation line comment opener contains three characters.
      // any other line comment opener contains two characters.
      token.info = self.containerState.openerWidth === 3
      if (!token.info) delete token.info
    }
  }

  return events
}
