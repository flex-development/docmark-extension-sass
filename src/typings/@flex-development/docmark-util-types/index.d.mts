import type {} from '@flex-development/docmark-util-types'

declare module '@flex-development/docmark-util-types' {
  interface TokenFields {
    /**
     * Whether the comment is loud.
     *
     * Loud comments are block comments that compile to a CSS comment when
     * written somewhere that a [statement][] is allowed.
     *
     * [statement]: https://sass-lang.com/documentation/syntax/structure#statements
     *
     * @see https://sass-lang.com/documentation/syntax/comments
     */
    loud?: boolean | undefined
  }
}
