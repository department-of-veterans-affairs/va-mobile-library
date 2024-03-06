import { AccessibilityRole, ScrollView, View } from 'react-native'
import { Colors } from '@department-of-veterans-affairs/mobile-tokens'
import { HapticFeedbackTypes } from 'react-native-haptic-feedback'
import React, { FC, RefObject, useEffect, useState } from 'react'

import { triggerHaptic } from 'utils/haptics'
import { useAutoScrollToElement } from 'utils/hooks'

import { Box, BoxProps, TextView } from './index'
import { IconProps } from '../Icon/Icon'
import { useColorScheme } from '../../utils'

export type AlertProps = {
  /** Alert variant */
  variant: 'info' | 'success' | 'warning' | 'error'
  /** Optional boolean for determining when to focus on error alert boxes (e.g. onSaveClicked). */
  focusOnError?: boolean
  /** Optional ref for the parent scroll view. Used for scrolling to error alert boxes. */
  scrollViewRef?: RefObject<ScrollView>
  /** body of the alert */
  text?: string
  /** optional bolded title text */
  title?: string
  /** optional accessibility label for the text */
  textA11yLabel?: string
  /** optional accessibility label for the title */
  titleA11yLabel?: string
  /** optional accessibility role for the title */
  titleRole?: AccessibilityRole
  /** optional testID */
  testId?: string
}

/**
 * Displays content in a box styled as an alert
 */
export const Alert: FC<AlertProps> = ({
  variant,
  children,
  focusOnError = true,
  scrollViewRef,
  title,
  text,
  textA11yLabel,
  titleA11yLabel,
  titleRole,
  testId,
}) => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const [scrollRef, viewRef, scrollToAlert] = useAutoScrollToElement()
  const [shouldFocus, setShouldFocus] = useState(true)

  const boxPadding = 20

  const contentColor = isDarkMode ? Colors.grayLightest : Colors.grayDark
  let backgroundColor, borderColor, iconProps: IconProps

  switch (variant) {
    case 'info':
      backgroundColor = Colors.primaryAltLightest
      borderColor = Colors.primaryAltDark
      iconProps = { name: 'Info', fill: '#000' } // Change fill to 'base'

      if (isDarkMode) {
        backgroundColor = Colors.uswdsBlueVivid80
        borderColor = Colors.primaryAltLight
      }
      break
    case 'success':
      break
    case 'warning':
      break
    case 'error':
      break
  }

  useEffect(() => {
    if (variant === 'error' && scrollViewRef?.current && (title || text)) {
      scrollRef.current = scrollViewRef.current
      scrollToAlert(-boxPadding)
    }
    setShouldFocus(focusOnError)
  }, [
    variant,
    focusOnError,
    scrollRef,
    scrollToAlert,
    scrollViewRef,
    text,
    title,
  ])

  const boxProps: BoxProps = {
    backgroundColor: backgroundColor,
    borderLeftWidth: 8, // TODO: Replace with sizing token
    borderLeftColor: borderColor,
    py: boxPadding,
    px: boxPadding,
    testID: testId,
  }

  const vibrate = (): void => {
    if (variant === 'error') {
      triggerHaptic(HapticFeedbackTypes.notificationError)
    } else if (variant === 'warning') {
      triggerHaptic(HapticFeedbackTypes.notificationWarning)
    }
  }

  const titleAccessibilityRole = titleRole
    ? titleRole
    : text || children
      ? 'header'
      : undefined

  return (
    <Box {...boxProps}>
      {!!title && (
        <View
          ref={viewRef}
          accessible={true}
          accessibilityLabel={titleA11yLabel || title}
          accessibilityRole={titleAccessibilityRole}>
          <TextView variant="MobileBodyBold" mb={text ? 20 : 0}>
            {title}
          </TextView>
        </View>
      )}
      {!!text && (
        <View
          ref={!title ? viewRef : undefined}
          accessible={true}
          accessibilityLabel={textA11yLabel || text}>
          <TextView variant="MobileBody">{text}</TextView>
        </View>
      )}
      {children}
      {shouldFocus && vibrate()}
    </Box>
  )
}
