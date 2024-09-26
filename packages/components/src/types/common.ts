export type TextWithA11y = {
  /** Text to display */
  text: string
  /** Accessibility override for text */
  a11y?: string
}

export type TextWithA11yAndValue = TextWithA11y & {
  /** Value that may differ from provided text */
  value?: string | number
}

export type StringOrTextWithA11y = string | TextWithA11y
