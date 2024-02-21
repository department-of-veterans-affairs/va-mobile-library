import { Colors } from '@department-of-veterans-affairs/mobile-tokens'
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  Text,
  TextProps,
  TextStyle,
  View,
} from 'react-native'
import React, { FC, useState } from 'react'

import {
  CalendarData,
  FormDirectionsUrl,
  LocationData,
  OnPressCalendar,
  isIOS,
  leaveAppPromptText,
  useExternalLink,
} from '../../utils/OSfunctions'
import { Icon, IconProps } from '../Icon/Icon'
import { useColorScheme, useIsScreenReaderEnabled } from '../../utils'

// Convenience type to default type-specific props to not existing/being optional
type nullTypeSpecifics = {
  calendarData?: never
  locationData?: never
  /** Optional onPress override logic */
  onPress?: () => void
  paragraphText?: never
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

type normalText = {
  text: string
  textA11y?: string
}

type inline = Omit<nullTypeSpecifics, 'paragraphText'> & {
  type: 'inline'
  paragraphText: normalText[] | LinkProps[]
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
  | calendar
  | call
  | callTTY
  | custom
  | directions
  | inline
  | text
  | url

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
  /** Internally used by 'inline' type. Not recommended for consumer use, but
   * available to manually insert a link into a paragraph. True builds link
   * component with RN Text instead of Pressable for improved wrapping behavior */
  inlineSingle?: boolean
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
  inlineSingle,
  testID,
  // Type-specific props
  calendarData,
  locationData,
  paragraphText,
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
      icon = icon ? icon : { name: 'TTY' }
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
    case 'inline':
      return inlineLink(paragraphText)
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
    style: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }
  const viewProps: TextProps = {
    'aria-label': a11yLabel ? a11yLabel : text,
    accessibilityHint: a11yHint,
    role: 'link',
    accessible: true,
  }

  const iconDisplay =
    icon === 'no icon' ? null : inlineSingle ? (
      <>
        <Icon fill={linkColor} {...icon} />
        {/* Space forms padding prior to link text */}
        <Text> </Text>
      </>
    ) : (
      <View style={{ marginRight: 5 }}>
        <Icon fill={linkColor} {...icon} />
      </View>
    )

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

  const [pressStyle, setPressStyle] = useState(false)
  if (inlineSingle) {
    const onPressProps: TextProps = {
      onPressIn: () => {
        setPressStyle(true)
      },
      onPress: onPress ? onPress : _onPress,
      onPressOut: () => {
        setPressStyle(false)
      },
    }
    return (
      <Text accessible={true}>
        {iconDisplay}
        <Text {...onPressProps} {...viewProps} style={getTextStyle(pressStyle)}>
          {text}
        </Text>
      </Text>
    )
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

const ParagraphText: FC<normalText> = ({ text, textA11y }) => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'

  // TODO: Replace with typography tokens
  const regularFont: TextStyle = {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 20,
    lineHeight: 30,
    color: isDarkMode ? Colors.grayLightest : Colors.grayDark,
  }

  return (
    <Text style={regularFont} accessible={true} aria-label={textA11y}>
      {text}
    </Text>
  )
}

const inlineLink: FC<inline['paragraphText']> = (paragraphTextArray) => {
  const screenReaderEnabled = useIsScreenReaderEnabled()
  if (screenReaderEnabled && isIOS) {
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {paragraphTextArray.map((item, index) => {
          // key included as this is a list of React components and the renderer worries about losing track
          if ('type' in item) {
            // Link if type prop exists
            item.inlineSingle = undefined
            return <Link {...item} key={index} />
          } else {
            return <ParagraphText {...item} key={index} />
          }
        })}
      </View>
    )
  }
  return (
    <Text>
      {paragraphTextArray.map((item, index) => {
        // key included as this is a list of React components and the renderer worries about losing track
        if ('type' in item) {
          // Link if type prop exists
          item.inlineSingle = true
          return <Link {...item} key={index} />
        } else {
          return <ParagraphText {...item} key={index} />
        }
      })}
    </Text>
  )
}
