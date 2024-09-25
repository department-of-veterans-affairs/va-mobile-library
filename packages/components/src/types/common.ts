export type AccessibleText =
  | string
  | {
      /** Text to display */
      text: string
      /** Accessibility override for text */
      a11y?: string
    }
