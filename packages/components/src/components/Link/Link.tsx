import { Colors } from '@department-of-veterans-affairs/mobile-tokens'
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  Text,
  TextStyle,
  View,
  ViewProps,
} from 'react-native'
import React, { FC } from 'react'

import {
  CalendarData,
  FormDirectionsUrl,
  LocationData,
  OnPressCalendar,
  leaveAppPromptText,
  useExternalLink,
} from '../../utils/OSfunctions'
import { Icon, IconProps } from '../Icon/Icon'
import { useColorScheme } from '../../utils'

// Convenience type to default type-specific props to not existing/being optional
type nullTypeSpecifics = {
  calendarData?: never
  locationData?: never
  /** Optional onPress override logic */
  onPress?: () => void
  phoneNumber?: never
  textNumber?: never
  TTYnumber?: never
  url?: never
}

type calendar = Omit<nullTypeSpecifics, 'calendarData'> & {
  type: 'calendar'
  calendarData: CalendarData
}

type call = Omit<nullTypeSpecifics, 'phoneNumber'> & {
  type: 'call'
  phoneNumber: string
}

type callTTY = Omit<nullTypeSpecifics, 'TTYnumber'> & {
  type: 'call TTY'
  TTYnumber: string
}

type custom = Omit<nullTypeSpecifics, 'onPress'> & {
  type: 'custom'
  /** Required onPress override logic */
  onPress: () => void
}

type directions = Omit<nullTypeSpecifics, 'locationData'> & {
  type: 'directions'
  locationData: LocationData
}

// TODO: Ticket 168 created for in-line link
// See lines 373-390 for app code:
// src/screens/BenefitsScreen/ClaimsScreen/AppealDetailsScreen/AppealStatus/AppealCurrentStatus/AppealCurrentStatus.tsx
// type normalText = {
//   text: string
//   textA11y: string
// }

// type inLineLink = {
//   type: 'in line link'
//   paragraphText: normalText[] | LinkProps[]
// }

type text = Omit<nullTypeSpecifics, 'textNumber'> & {
  type: 'text'
  textNumber: string
}

type url = Omit<nullTypeSpecifics, 'url'> & {
  type: 'url'
  url: string
}

type linkTypes = calendar | call | callTTY | custom | directions | text | url

// TODO: Ticket 170 created to revisit adding analytics after calendar support added/or deemed infeasible
// type analytics = {
//   onPress?: () => void
//   onConfirm?: () => void
//   hasCalendarPermission?: () => void
//   onRequestCalendarPermission?: () => void
//   onCalendarPermissionSuccess?: () => void
//   onCalendarPermissionFailure?: () => void
// }

export type LinkProps = linkTypes & {
  /** Display text for the link */
  text: string
  /** Color variant */
  variant?: 'default' | 'base'
  /** Optional icon override, sized by default to 24x24 */
  icon?: IconProps | 'no icon'
  /** Optional a11yLabel override; should be used for phone numbers */
  a11yLabel?: string
  /** Optional a11yHint to provide additional context */
  a11yHint?: string
  /** Optional override text for leaving app confirmation prompt */
  promptText?: leaveAppPromptText
  /** Optional analytics event logging */
  // analytics?: analytics
  /** Optional TestID */
  testID?: string
}

/** [View guidance for the Link component on the VA Mobile Documentation Site](https://department-of-veterans-affairs.github.io/va-mobile-app/design/Components/Buttons%20and%20links/Link)  */
export const Link: FC<LinkProps> = ({
  type,
  text,
  variant = 'default',
  onPress,
  icon,
  a11yLabel,
  a11yHint,
  promptText,
  // analytics,
  testID,
  // Type-specific props
  calendarData,
  locationData,
  phoneNumber,
  textNumber,
  TTYnumber,
  url,
}) => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const launchExternalLink = useExternalLink()

  let _onPress: () => Promise<void> = async () => {
    null // Empty function to keep TS happy a function exists
  }

  switch (type) {
    case 'calendar':
      icon = icon ? icon : { name: 'Calendar' }
      _onPress = async (): Promise<void> => {
        await OnPressCalendar(calendarData)
        return
      }
      break
    case 'call':
      icon = icon ? icon : { name: 'Phone' }
      _onPress = async (): Promise<void> => {
        launchExternalLink(`tel:${phoneNumber}`)
      }
      break
    case 'call TTY':
      icon = icon ? icon : { name: 'PhoneTTY' }
      _onPress = async (): Promise<void> => {
        launchExternalLink(`tel:${TTYnumber}`)
      }
      break
    case 'custom':
      icon = icon ? icon : 'no icon'
      onPress = onPress
      break
    case 'directions':
      icon = icon ? icon : { name: 'Directions' }
      const directions = FormDirectionsUrl(locationData)
      _onPress = async (): Promise<void> => {
        launchExternalLink(directions, promptText)
      }
      break
    case 'text':
      icon = icon ? icon : { name: 'Text' }
      _onPress = async (): Promise<void> => {
        launchExternalLink(`sms:${textNumber}`)
      }
      break
    case 'url':
      icon = icon ? icon : { name: 'ExternalLink' }
      _onPress = async (): Promise<void> => {
        launchExternalLink(url, promptText)
      }
      break
  }

  if (icon !== 'no icon' && (!icon.height || !icon.width)) {
    icon.height = 24
    icon.width = 24
  }

  let linkColor: string

  switch (variant) {
    case 'base':
      linkColor = isDarkMode ? Colors.grayLightest : Colors.grayDark
      break
    default:
      linkColor = isDarkMode ? Colors.uswdsBlueVivid30 : Colors.primary
  }

  const pressableProps: PressableProps = {
    onPress: onPress ? onPress : _onPress,
    'aria-label': a11yLabel,
    accessibilityHint: a11yHint,
    role: 'link',
    accessible: true,
  }

  const viewStyle: ViewProps['style'] = {
    alignItems: 'center',
    flexDirection: 'row',
  }

  const innerViewStyle: ViewProps['style'] = {
    flexShrink: 1,
    marginLeft: icon === 'no icon' ? 0 : 5,
  }

  const getTextStyle = (pressed: boolean): TextStyle => {
    // TODO: Replace with typography tokens
    const regularFont: TextStyle = {
      fontFamily: 'SourceSansPro-Regular',
      fontSize: 20,
      lineHeight: 30,
    }
    const pressedFont: TextStyle = {
      fontFamily: 'SourceSansPro-Bold',
      fontSize: 20,
      lineHeight: 30,
    }

    const textStyle: TextStyle = {
      color: linkColor,
      textDecorationColor: linkColor,
      textDecorationLine: 'underline',
    }

    return { ...(pressed ? pressedFont : regularFont), ...textStyle }
  }

  return (
    <Pressable {...pressableProps} testID={testID}>
      {({ pressed }: PressableStateCallbackType) => (
        <View style={viewStyle}>
          {icon === 'no icon' ? null : <Icon fill={linkColor} {...icon} />}
          <View style={innerViewStyle}>
            <Text style={getTextStyle(pressed)}>{text}</Text>
          </View>
        </View>
      )}
    </Pressable>
  )
}
