/**
 * @file Unit Tests - indented
 * @module docmark-extension-sass/internal/tests/unit/indented
 */

import type {
  LanguageOptions,
  TokenizeContext
} from '@flex-development/docmark-util-types'
import { beforeEach, describe, expect, it } from 'vitest'
import testSubject from '../indented.mts'

describe('unit:internal/indented', () => {
  let context: TokenizeContext

  beforeEach(() => {
    context = { parser: { constructs: { settings: {} } } } as TokenizeContext
  })

  it.each<[options: LanguageOptions]>([
    [{}],
    [{ indented: false }],
    [{ indented: null }],
    [{ indented: undefined }]
  ])('should return `false` if indented syntax is disabled (%j)', options => {
    // Setup
    context.parser.constructs.settings = { sass: options }

    // Act + Expect
    expect(testSubject.call(context)).to.be.false
  })

  it('should return `true` if indented syntax is enabled', () => {
    // Setup
    context.parser.constructs.settings = { sass: { indented: true } }

    // Act + Expect
    expect(testSubject.call(context)).to.be.true
  })
})
