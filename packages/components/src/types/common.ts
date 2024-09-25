export type TextA11y = {
  /** Text to display */
  text: string
  /** Accessibility override for text */
  a11y?: string
}

export type AccessibleText = string | TextA11y
