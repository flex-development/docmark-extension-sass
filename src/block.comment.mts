/**
 * @file blockComment
 * @module docmark-extension-sass/blockComment
 */

import { factoryBlockComment } from '@flex-development/docmark-factory-block'
import { codes, ev, kind, tt } from '@flex-development/docmark-util-symbol'
import type {
  ContinuableConstruct,
  Event
} from '@flex-development/docmark-util-types'
import { ok } from 'devlop'
import indented from './internal/indented.mts'

/**
 * The sass block comment construct.
 *
 * This construct is expected to run at the `source` content level.
 *
 * @see {@linkcode ContinuableConstruct}
 *
 * @const {ContinuableConstruct} blockComment
 */
const blockComment: ContinuableConstruct = factoryBlockComment({
  allowIndentedContinuation: indented,
  construct: { resolve: resolveBlockComment },
  fields: { info: undefined, loud: undefined },
  markers: {
    closer: [codes.asterisk, codes.slash],
    line: codes.asterisk,
    opener: [
      { code: codes.slash },
      { code: codes.asterisk },
      { code: codes.asterisk, optional: true }
    ]
  }
})

export default blockComment

/**
 * Determine if any block comments are documentation comments.
 *
 * Any block comments that are not docblocks are considered loud comments.
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
function resolveBlockComment(this: void, events: Event[]): Event[] {
  ok(events[0], 'expected at least `1` event')
  ok(events[0][0] === ev.enter, 'expected `enter` event')
  ok(events[0][1].type === tt.comment, 'expected `comment` token')
  ok(events[0][1].kind === kind.block, 'expected `block` comment token')
  ok(events[0][2].containerState, 'expected `containerState` inside comment')
  ok(events[0][2].containerState.openerWidth, 'expected comment opener width')

  // a documentation comment opener contains three characters.
  // any other block comment opener contains two characters.
  events[0][1].info = events[0][2].containerState.openerWidth === 3

  // if it's not a docblock, it's a loud comment.
  events[0][1].loud = !events[0][1].info
  delete events[0][1][events[0][1].loud ? 'info' : 'loud']

  return events
}
