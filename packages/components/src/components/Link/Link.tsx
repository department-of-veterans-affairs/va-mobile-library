import * as Colors from '@department-of-veterans-affairs/mobile-tokens'
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  Text,
  TextStyle,
  View,
  ViewProps,
  useColorScheme,
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
import { webStorybookColorScheme } from '../../utils'

type calendar = {
  type: 'calendar'
  calendarData: CalendarData
}

type call = {
  type: 'call'
  phoneNumber: string
}

type callTTY = {
  type: 'call TTY'
  TTYnumber: string
}

type custom = {
  type: 'custom'
  onPress: () => void
}

type directions = {
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

type text = {
  type: 'text'
  textNumber: string
}

type url = {
  type: 'url'
  url: string
}

type linkType = calendar | call | callTTY | custom | directions | text | url

// TODO: Ticket 170 created to revisit adding analytics after calendar support added/or deemed infeasible
// type analytics = {
//   onPress?: () => void
//   onConfirm?: () => void
//   hasCalendarPermission?: () => void
//   onRequestCalendarPermission?: () => void
//   onCalendarPermissionSuccess?: () => void
//   onCalendarPermissionFailure?: () => void
// }

export type LinkProps = {
  /** Display text for the link */
  text: string
  /** Preset link types that include default icons and onPress behavior */
  type: linkType
  /** Color variant, primary by default */
  variant?: 'default' | 'base'
  /** Optional onPress override logic */
  onPress?: () => void
  /** Optional icon override, sized by default to 24x24 */
  icon?: IconProps | 'no icon'
  /** Optional a11yLabel override; should be used for phone numbers */
  a11yLabel?: string
  /** Optional override text for leaving app confirmation prompt */
  promptText?: leaveAppPromptText
  /** Optional analytics event logging */
  // analytics?: analytics
  /** Optional TestID */
  testID?: string
}

export const Link: FC<LinkProps> = ({
  text,
  type,
  variant = 'default',
  onPress,
  icon,
  a11yLabel,
  promptText,
  // analytics,
  testID,
}) => {
  const colorScheme = webStorybookColorScheme() || useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const launchExternalLink = useExternalLink()

  let _onPress: () => Promise<void> = async () => {
    null // Empty function to keep TS happy a function exists
  }

  switch (type.type) {
    case 'calendar':
      icon = icon ? icon : { name: 'Calendar' }
      _onPress = async (): Promise<void> => {
        await OnPressCalendar(type.calendarData)
        return
      }
      break
    case 'call':
      icon = icon ? icon : { name: 'Phone' }
      _onPress = async (): Promise<void> => {
        launchExternalLink(`tel:${type.phoneNumber}`)
      }
      break
    case 'call TTY':
      icon = icon ? icon : { name: 'PhoneTTY' }
      _onPress = async (): Promise<void> => {
        launchExternalLink(`tel:${type.TTYnumber}`)
      }
      break
    case 'custom':
      icon = icon ? icon : 'no icon'
      onPress = type.onPress
      break
    case 'directions':
      icon = icon ? icon : { name: 'Directions' }
      const directions = FormDirectionsUrl(type.locationData)
      _onPress = async (): Promise<void> => {
        launchExternalLink(directions, promptText)
      }
      break
    case 'text':
      icon = icon ? icon : { name: 'Text' }
      _onPress = async (): Promise<void> => {
        launchExternalLink(`sms:${type.textNumber}`)
      }
      break
    case 'url':
      icon = icon ? icon : { name: 'ExternalLink' }
      _onPress = async (): Promise<void> => {
        launchExternalLink(type.url, promptText)
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
      linkColor = isDarkMode ? Colors.colorGrayLightest : Colors.colorGrayDark
      break
    default:
      linkColor = isDarkMode
        ? Colors.colorUswdsSystemColorBlueVivid30
        : Colors.colorUswdsSystemColorBlueVivid60
  }

  const pressableProps: PressableProps = {
    onPress: onPress ? onPress : _onPress,
    'aria-label': a11yLabel,
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
