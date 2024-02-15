import { Colors } from '@department-of-veterans-affairs/mobile-tokens'
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
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

// TODO: Ticket 168 created for in-line link
// See lines 373-390 for app code:
// src/screens/BenefitsScreen/ClaimsScreen/AppealDetailsScreen/AppealStatus/AppealCurrentStatus/AppealCurrentStatus.tsx
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
  /** Optional TestID */
  testID?: string
}

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
  paragraphText,
  phoneNumber,
  textNumber,
  TTYnumber,
  url,
}) => {
  const colorScheme = webStorybookColorScheme() || useColorScheme()
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
    style: { flexDirection: 'row' },
  }

  const viewStyle: ViewProps['style'] = {
    // alignItems: 'center',
    // flex: 1,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
  }

  const innerViewStyle: ViewProps['style'] = {
    // flex: 1,
    // flexWrap: 'wrap',
    // flexShrink: 1,
    marginLeft: icon === 'no icon' ? 0 : 5,
  }

  const iconViewStyle: ViewProps['style'] = {
    // flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginRight: 5,
  }

  const iconDisplay =
    icon === 'no icon' ? null : (
      <View style={iconViewStyle}>
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
      // flex: 1
      // flexWrap: 'wrap'
    }

    return { ...(pressed ? pressedFont : regularFont), ...textStyle }
  }

  // const buildLinkText = text.split(' ').map((word) => {<Text style={getTextStyle(pressed)}>{word}</Text>})

  // return (
  //   <Text style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
  //     {iconDisplay}
  //     {text.split(' ').map((word) => {
  //       return (
  //         <Pressable {...pressableProps} testID={testID}>
  //           {({ pressed }: PressableStateCallbackType) => (
  //             <Text style={getTextStyle(pressed)}>{word + ' '}</Text>
  //           )}
  //         </Pressable>
  //       )
  //     })}
  //   </Text>
  // )

  return (
    <Pressable {...pressableProps} testID={testID}>
      {({ pressed }: PressableStateCallbackType) => (
        <>
          {iconDisplay}
          {/* {text.split(' ').map((word) => {
            return <Text style={getTextStyle(pressed)}>{word + ' '}</Text>
          })} */}
          <Text style={getTextStyle(pressed)}>{text}</Text>
        </>
      )}
    </Pressable>
  )
}

const paragraphText: FC<normalText> = ({ text, textA11y }) => {
  const colorScheme = webStorybookColorScheme() || useColorScheme()
  const isDarkMode = colorScheme === 'dark'

  // TODO: Replace with typography tokens
  const regularFont: TextStyle = {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 20,
    lineHeight: 30,
    color: isDarkMode ? Colors.grayLightest : Colors.grayDark,
    // flex: 1,
  }

  return (
    <Text style={regularFont} aria-label={textA11y}>
      {text}
    </Text>
  )
}

const inlineLink: FC<inline['paragraphText']> = (paragraphTextArray) => {
  const viewStyle: ViewProps['style'] = {
    flexDirection: 'row',
    flexWrap: 'wrap',
}

  // return (
  //   <View>
  //     <Text>
  // eslint-disable-next-line max-len
  //       This is a long paragraph of text. <TouchableWithoutFeedback onPress={()=>{}}><Text style={{ fontWeight: 'bold' }}>Pressable text</Text></TouchableWithoutFeedback> embedded within it.
  //     </Text>
  //   </View>
  // );
  
  // return (
  //   <View>
  //     <Text>
  //       This is a long paragraph of text.{' '}
  //       <Pressable onPress={() => {}}>
  //         <View>
  // {/* eslint-disable-next-line max-len */}
  //           <Text style={{ fontWeight: 'bold' }}>Pressable text</Text>
  //         </View>
  //       </Pressable>{' '}
  //       embedded within it.
  //     </Text>
  //   </View>
  // )

  return (
    <Text>
      {/* Test {' '} */}
      {paragraphTextArray.map((item) => {
        if ('type' in item) {
          // Link if type prop exists
          return <Link {...item} />
        } else {
          return paragraphText(item)
        }
      })}
      {/* {' '} more words. */}
    </Text>
  )
  return (
    <View style={viewStyle}>
      {paragraphTextArray.map((item) => {
        if ('type' in item) {
          // Link if type prop exists
          return <Link {...item} />
        } else {
          return paragraphText(item)
        }
      })}
    </View>
  )

  // return paragraphTextArray.map((item) => {
  //   let paragraph
  //   if ('type' in item) { // Link if type prop exists
  //     paragraph = paragraph + (<Link {...item} />)
  //   } else {
  //     paragraph = paragraph + paragraphText({text: item.text, textA11y: item.textA11y})
  //   }

  //   return paragraph
  // })
}
