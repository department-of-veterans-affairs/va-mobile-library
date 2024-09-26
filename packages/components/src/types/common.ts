export type TextWithA11y = {
  /** Text to display */
  text: string
  /** Accessibility override for text */
  a11y?: string
}

export type TextWithA11yAndValue = TextWithA11y & { value?: string | number }

export type StringOrTextWithA11y = string | TextWithA11y

export type StringOrTextWithA11yAndValue = string | TextWithA11yAndValue
