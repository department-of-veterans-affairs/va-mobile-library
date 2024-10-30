import {
  Pressable,
  PressableProps,
  Text,
  TextProps,
  TextStyle,
} from 'react-native'
import { t } from 'i18next'
import React, { FC } from 'react'

import { ComponentWrapper } from '../../wrapper'
import {
  FormDirectionsUrl,
  LocationData,
  leaveAppPromptText,
  useExternalLink,
} from '../../utils/OSfunctions'
import { Icon, IconProps } from '../Icon/Icon'
import { Spacer } from '../Spacer/Spacer'
import { useTheme } from '../../utils'

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
  onOpenURLError?: (e?: unknown, url?: LinkProps['url']) => void
}

export type LinkProps = linkTypes & {
  /** Display text for the link */
  text: string
  /** Color variant */
  variant?: 'default' | 'base'
  /** Optional icon override, sized by default to 24x24 */
  icon?: Partial<IconProps> | 'no icon'
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
  /** Optional for testing pressed state in test suites */
  testOnlyPressed?: boolean
}

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
  testOnlyPressed,
  // Type-specific props
  locationData,
  phoneNumber,
  textNumber,
  TTYnumber,
  url,
}) => {
  const theme = useTheme()
  const launchExternalLink = useExternalLink()

  // TODO: Replace with typography tokens
  const font = {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 20,
    lineHeight: 30,
  }

  let _icon: IconProps | 'no icon'

  /** Function to massage Partial<IconProps> data into IconProps based on variant icon defaults */
  const setIcon = (name?: IconProps['name']) => {
    switch (icon) {
      case 'no icon':
        return { noIcon: true }
      case undefined:
        if (name) return { name }
        return { noIcon: true }
      default:
        if (icon.svg) return icon as IconProps
        if (!name && !icon.name) return { noIcon: true }

        if (!icon.name) icon.name = name
        return icon as IconProps
    }
  }

  let _onPress: () => void

  /** Handler for links not using launchExternalLink prompt */
  const customOnPress: () => void = () => {
    if (analytics?.onPress) analytics.onPress()
    if (onPress) onPress()
  }

  switch (type) {
    case 'attachment':
      _icon = setIcon('AttachFile')
      _onPress = customOnPress
      break
    case 'calendar':
      _icon = setIcon('CalendarToday')
      _onPress = customOnPress
      break
    case 'call':
      _icon = setIcon('Phone')
      _onPress = () => launchExternalLink(`tel:${phoneNumber}`, analytics)
      break
    case 'call TTY':
      _icon = setIcon('TTY')
      _onPress = () => launchExternalLink(`tel:${TTYnumber}`, analytics)
      break
    case 'custom':
      _icon = setIcon()
      _onPress = customOnPress
      break
    case 'directions':
      _icon = setIcon('Directions')
      const directions = FormDirectionsUrl(locationData)
      _onPress = () => launchExternalLink(directions, analytics, promptText)
      break
    case 'text':
      _icon = setIcon('PhoneIphone')
      _onPress = () => launchExternalLink(`sms:${textNumber}`, analytics)
      break
    case 'url':
      _icon = setIcon('Launch')
      _onPress = () => launchExternalLink(url, analytics, promptText)
      break
  }

  _icon.alignWithTextLineHeight = font.lineHeight

  let linkColor: string

  switch (variant) {
    case 'base':
      linkColor = theme.vadsColorForegroundDefault
      break
    default:
      linkColor = theme.vadsColorActionForegroundDefault
  }

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
    hitSlop: 7, // Adds with lineHeight to achieve 44 pixel touch target
    ...a11yProps,
    style: ({ pressed }) => ({
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: pressed
        ? theme.vadsColorSurfaceSecondary
        : 'transparent',
    }),
    testOnly_pressed: testOnlyPressed,
  }

  const textStyle: TextStyle = {
    ...font,
    color: linkColor,
    textDecorationColor: linkColor,
    textDecorationLine: 'underline',
    flexShrink: 1, // RN Text takes full width in row flexbox; shrink to wrap as appropriate
  }

  return (
    <ComponentWrapper>
      <Pressable {...pressableProps} testID={testID}>
        <Icon fill={linkColor} {..._icon} />
        {icon === 'no icon' ? null : <Spacer size="2xs" horizontal />}
        <Text style={textStyle}>{text}</Text>
      </Pressable>
    </ComponentWrapper>
  )
}
