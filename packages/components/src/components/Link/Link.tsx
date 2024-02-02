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
  onPressCalendar,
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

type appointmentAddress = {
  street: string
  city: string
  state: string // 2 letter abbreviation
  zipCode: string
}

type locationData = {
  name: string
  address?: appointmentAddress
  lat?: number
  long?: number
}

type directions = {
  type: 'directions'
  locationData: locationData
}

type normalText = {
  text: string
  textA11y: string
}

// Split to separate ticket, see lines 373-390 for app code:
// src/screens/BenefitsScreen/ClaimsScreen/AppealDetailsScreen/AppealStatus/AppealCurrentStatus/AppealCurrentStatus.tsx
type inLineLink = {
  type: 'in line link'
  paragraphText: normalText[] | LinkProps[]
}

type text = {
  type: 'text'
  textNumber: string
}

type url = {
  type: 'url'
  url: string
}

type linkType = calendar | call | callTTY | custom | directions | text | url

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
  /**  */
  variant?: 'default' | 'base'
  /** Optional onPress logic */
  onPress?: () => void | ((data: string | CalendarData | locationData) => void)
  /** Optional icon override, sized by default to 24x24 */
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
  variant = 'default',
  onPress,
  icon,
  a11yLabel,
  analytics,
  testID,
}) => {
  const colorScheme = webStorybookColorScheme() || useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const launchExternalLink = useExternalLink()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let _onPress: (() => void) | (() => Promise<void>) | any = () => {
    return
  }

  switch (type.type) {
    case 'calendar':
      icon = icon ? icon : { name: 'Calendar' }
      console.log('calendar switch')
      _onPress = async (): Promise<void> => {
        await onPressCalendar(type.calendarData)
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
      _onPress = () => {
        null
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
        launchExternalLink(type.url)
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
      linkColor = isDarkMode ? Colors.colorGrayLightest : Colors.colorGrayMedium
      break
    default:
      linkColor = isDarkMode
        ? Colors.colorUswdsSystemColorBlueVivid30
        : Colors.colorUswdsSystemColorBlueVivid60
  }

  const pressableProps: PressableProps = {
    onPress: _onPress ? _onPress : onPress,
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

    // ON PRESS STYLE BUGGED ON IOS (STORYBOOK) BUT WORKS ON WEB/ANDROID

    const textStyle: TextStyle = {
      color: linkColor,
      textDecorationColor: linkColor,
      textDecorationLine: 'underline',
    }

    return { ...(pressed ? pressedFont : regularFont), ...textStyle }
  }

  // ON PRESS ASYNC, DOES THAT NEED ANY SPECIAL HANDLING!?

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
