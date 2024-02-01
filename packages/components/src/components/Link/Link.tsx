import { AccessibilityProps, TouchableWithoutFeedback, TouchableWithoutFeedbackProps } from 'react-native'
import { SvgProps } from 'react-native-svg'
// import Box from './Box'
import React, { FC } from 'react'

import { Icon, IconProps } from '../Icon/Icon'
// import { useTheme } from 'utils/hooks'
// import TextView, { ColorVariant, TextViewProps } from './TextView'

type CalendarData = {
  title: string
  startTime: number
  endTime: number
  location: string
  latitude: number
  longitude: number
}

type calendar = {
  type: 'calendar'
  eventData: CalendarData
}

type call = {
  type: 'call' | 'call TTY'
  phoneNumber: string
}

type chat = {
  type: 'chat'
  url: string
}

type custom = {
  type: 'custom'
  onPress: onPress
}

type AppointmentAddress = {
  street: string
  city: string
  state: string // 2 letter abbreviation
  zipCode: string
}

type LocationData = {
  name: string
  address?: AppointmentAddress
  lat?: number
  long?: number
}

type directions = {
  type: 'directions'
  locationData: LocationData
}

type text = {
  type: 'text'
  textNumber: string
}

type url = {
  type: 'url'
  url: string
}

type linkType = calendar
              | call
              | chat
              | custom
              | directions
              | text
              | url

type onPress = {
 /** Custom logic to overrides built in onPress logic */
  custom?: () => void
}

type analytics = {
  onPress?: () => void
  onConfirm?: () => void
  hasCalendarPermission?: () => void
  onRequestCalendarPermission?: () => void
  onCalendarPermissionSuccess?: () => void
  onCalendarPermissionFailure?: () => void
}

/**
 *  Signifies the props that need to be passed in to {@link ClickForActionLink}
 */
export type LinkProps = {
  /** Display text for the link */
  text: string
  /** Preset link types that include default icons and onPress behavior */
  type: linkType
  /** Optional onPress logic */
  onPress?: onPress
  /** Optional icon override */
  icon?: IconProps | 'no icon'
  /** Optional a11yLabel override; should be used for phone numbers */
  a11yLabel?: string
  /** Optional analytics event logging */
  analytics?: analytics
  /** Optional TestID */
  testID?: string
}

/**
 * Reusable component used for opening native calling app, texting app, or opening a url in the browser
 */
export const Link: FC<LinkProps> = ({
  text,
  type,
  onPress,
  icon,
  a11yLabel,
  analytics,
  testID
}) => {
  // const theme = useTheme()

  const textViewProps = {
    color: 'link',
    variant: 'MobileBody',
    ml: 4,
    textDecoration: 'underline',
    textDecorationColor: 'link',
  }

  const pressableProps: TouchableWithoutFeedbackProps = {
    onPress: onPress?.custom,
    accessibilityLabel: a11yLabel,
    accessibilityRole: 'link',
    accessible: true,
  }

  // ON PRESS ASYNC, DOES THAT NEED ANY SPECIAL HANDLING!?

  return (
    <TouchableWithoutFeedback testID={testID} {...pressableProps}>
      {/* <Box flexDirection={'row'} py={theme.dimensions.buttonPadding} alignItems={'center'}>
        {icon ? <Icon fill='blue' {...icon} /> : null}
        <Box flexShrink={1}>
          <TextView {...textViewProps}>{text}</TextView>
        </Box>
      </Box> */}
    </TouchableWithoutFeedback>
  )
}
