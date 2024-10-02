export type TextWithA11y = {
  /** Text to display */
  text: string
  /** Accessibility override for text */
  a11yLabel?: string
}

export type StringOrTextWithA11y = string | TextWithA11y
