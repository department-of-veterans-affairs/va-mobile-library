import { AccessibilityProps, TouchableWithoutFeedback, TouchableWithoutFeedbackProps } from 'react-native'
import { SvgProps } from 'react-native-svg'
import Box from './Box'
import React, { FC } from 'react'

import { Icon, IconProps } from '../Icon/Icon'
import { useTheme } from 'utils/hooks'
import TextView, { ColorVariant, TextViewProps } from './TextView'

/**
 *  Signifies the props that need to be passed in to {@link ClickForActionLink}
 */
export type LinkButtonProps = AccessibilityProps & {
  /** phone number or text for url that is displayed to the user, may be different than actual number or url used */
  text: string

  /** */
  onPress: () => void

  /** */
  icon?: IconProps

  /** Accessibility label for the link, mandatory for every element with a link role */
  a11yLabel: string

  /** Optional TestID */
  testID?: string
}

/**
 * Reusable component used for opening native calling app, texting app, or opening a url in the browser
 */
export const Link: FC<LinkButtonProps> = ({
  text,
  onPress,
  icon,
  a11yLabel,
  testID,
  ...props
}) => {
  const theme = useTheme()

  const textViewProps: TextViewProps = {
    color: 'link',
    variant: 'MobileBody',
    ml: 4,
    textDecoration: 'underline',
    textDecorationColor: 'link',
  }

  const pressableProps: TouchableWithoutFeedbackProps = {
    onPress,
    accessibilityLabel: a11yLabel,
    accessibilityRole: 'link',
    accessible: true,
    ...props,
  }

  // ON PRESS ASYNC, DOES THAT NEED ANY SPECIAL HANDLING!?

  return (
    <TouchableWithoutFeedback testID={testID} {...pressableProps}>
      <Box flexDirection={'row'} py={theme.dimensions.buttonPadding} alignItems={'center'}>
        {icon ? <Icon fill='blue' {...icon} /> : null}
        <Box flexShrink={1}>
          <TextView {...textViewProps}>{text}</TextView>
        </Box>
      </Box>
    </TouchableWithoutFeedback>
  )
}
