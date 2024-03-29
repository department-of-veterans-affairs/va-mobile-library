import { Colors } from '@department-of-veterans-affairs/mobile-tokens'
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  Text,
  TextProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import React, { FC } from 'react'

import {
  FormDirectionsUrl,
  LocationData,
  leaveAppPromptText,
  useExternalLink,
} from '../../utils/OSfunctions'
import { Icon, IconProps } from '../Icon/Icon'
import { t } from 'i18next'
import { useColorScheme } from '../../utils'

// Convenience type to default type-specific props to not existing/being optional
type nullTypeSpecifics = {
  locationData?: never
  /** Optional onPress override logic */
  onPress?: () => void
  phoneNumber?: never
  textNumber?: never
  TTYnumber?: never
  url?: never
}

type attachment = Omit<nullTypeSpecifics, 'onPress'> & {
  type: 'attachment'
  /** Required onPress override logic */
  onPress: () => void
}

type calendar = Omit<nullTypeSpecifics, 'calendarData'> & {
  type: 'calendar'
  /** Required onPress override logic */
  onPress: () => void
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

type text = Omit<nullTypeSpecifics, 'textNumber'> & {
  type: 'text'
  textNumber: string
}

type url = Omit<nullTypeSpecifics, 'url'> & {
  type: 'url'
  url: string
}

type linkTypes =
  | attachment
  | calendar
  | call
  | callTTY
  | custom
  | directions
  | text
  | url

type a11yValue = {
  /** Index value of item in list, will have +1 added to */
  index: number
  total: number
}

export type LinkAnalytics = {
  onPress?: () => void
  onConfirm?: () => void
  onCancel?: () => void
}

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
  /** Optional a11yValue for "[position #] of [list total #]" or a custom value descriptive string */
  a11yValue?: a11yValue | string
  /** Optional override text for leaving app confirmation prompt */
  promptText?: leaveAppPromptText
  /** Optional analytics event logging */
  analytics?: LinkAnalytics
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
  a11yValue,
  promptText,
  analytics,
  testID,
  // Type-specific props
  locationData,
  phoneNumber,
  textNumber,
  TTYnumber,
  url,
}) => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const launchExternalLink = useExternalLink()

  let _onPress: () => void = async () => {
    null // Empty function to keep TS happy a function exists
  }

  /** Handler for links not using launchExternalLink prompt */
  const customOnPress: () => void = () => {
    if (analytics?.onPress) analytics.onPress()
    if (onPress) onPress()
  }

  switch (type) {
    case 'attachment':
      icon = icon ? icon : { name: 'PaperClip' }
      _onPress = customOnPress
      break
    case 'calendar':
      icon = icon ? icon : { name: 'Calendar' }
      _onPress = customOnPress
      break
    case 'call':
      icon = icon ? icon : { name: 'Phone' }
      _onPress = async (): Promise<void> => {
        launchExternalLink(`tel:${phoneNumber}`, analytics)
      }
      break
    case 'call TTY':
      icon = icon ? icon : { name: 'TTY' }
      _onPress = async (): Promise<void> => {
        launchExternalLink(`tel:${TTYnumber}`, analytics)
      }
      break
    case 'custom':
      icon = icon ? icon : 'no icon'
      _onPress = customOnPress
      break
    case 'directions':
      icon = icon ? icon : { name: 'Directions' }
      const directions = FormDirectionsUrl(locationData)
      _onPress = async (): Promise<void> => {
        launchExternalLink(directions, analytics, promptText)
      }
      break
    case 'text':
      icon = icon ? icon : { name: 'Text' }
      _onPress = async (): Promise<void> => {
        launchExternalLink(`sms:${textNumber}`, analytics)
      }
      break
    case 'url':
      icon = icon ? icon : { name: 'ExternalLink' }
      _onPress = async (): Promise<void> => {
        launchExternalLink(url, analytics, promptText)
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

  const iconViewStyle: ViewStyle = {
    marginRight: 5, // Spacer to text
    // Below keeps icon aligned with first row of text, centered, and scalable
    alignSelf: 'flex-start',
    minHeight: 30,
    alignItems: 'center',
    justifyContent: 'center',
  }

  const iconDisplay =
    icon === 'no icon' ? null : (
      <View style={iconViewStyle}>
        <Icon fill={linkColor} {...icon} />
      </View>
    )

  let ariaValue
  if (typeof a11yValue === 'string') {
    ariaValue = a11yValue
  } else if (a11yValue) {
    ariaValue = t('listPosition', {
      position: a11yValue.index + 1,
      total: a11yValue.total,
    })
  }

  const a11yProps: TextProps = {
    'aria-label': a11yLabel || text, // or text for Android not reading text if aria-value set
    accessibilityHint: a11yHint,
    'aria-valuetext': ariaValue,
    role: 'link',
    accessible: true,
  }

  const pressableProps: PressableProps = {
    onPress: _onPress,
    hitSlop: 7,
    ...a11yProps,
    style: {
      flexDirection: 'row',
      alignItems: 'center',
    },
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
        <>
          {iconDisplay}
          <Text style={getTextStyle(pressed)}>{text}</Text>
        </>
      )}
    </Pressable>
  )
}
