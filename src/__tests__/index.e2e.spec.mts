/**
 * @file E2E Tests - api
 * @module docmark-extension-sass/tests/e2e/api
 */

import * as testSubject from '@flex-development/docmark-extension-sass'
import { describe, expect, it } from 'vitest'

describe('e2e:docmark-extension-sass', () => {
  it('should expose public api', () => {
    expect(Object.keys(testSubject)).toMatchSnapshot()
  })
})
