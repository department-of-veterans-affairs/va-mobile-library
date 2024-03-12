import { Colors } from '@department-of-veterans-affairs/mobile-tokens'
// import { HapticFeedbackTypes } from 'react-native-haptic-feedback'
import { ScrollView, Text, TextStyle, View, ViewStyle } from 'react-native'
import React, { FC, RefObject, useEffect, useState } from 'react'

// import { triggerHaptic } from 'utils/haptics'
// import { useAutoScrollToElement } from 'utils/hooks'

import { ButtonProps, ButtonVariants } from '../Button/Button'
import { IconProps } from '../Icon/Icon'
import { useColorScheme } from '../../utils'

export type AlertProps = {
  /** Alert variant */
  variant: 'info' | 'success' | 'warning' | 'error'
  /**  */
  header?: string
  /**  */
  headerA11yLabel?: string
  /**  */
  description?: string
  /**  */
  descriptionA11yLabel?: string
  /**  */
  children?: React.ReactNode
  /**  */
  primaryButton?: ButtonProps
  /**  */
  secondaryButton?: ButtonProps
  /** Optional boolean for determining when to focus on error alert boxes (e.g. onSaveClicked). */
  focusOnError?: boolean
  /** Optional ref for the parent scroll view. Used for scrolling to error alert boxes. */
  scrollViewRef?: RefObject<ScrollView>
  /** optional testID */
  testId?: string
}

/**
 * Displays content in a box styled as an alert
 */
export const Alert: FC<AlertProps> = ({
  variant,
  header,
  headerA11yLabel,
  description,
  descriptionA11yLabel,
  children,
  primaryButton,
  secondaryButton,
  focusOnError = true,
  scrollViewRef,
  testId,
}) => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  // const [scrollRef, viewRef, scrollToAlert] = useAutoScrollToElement()
  // const [shouldFocus, setShouldFocus] = useState(true)

  const boxPadding = 20

  // useEffect(() => {
  //   if (
  //     variant === 'error' &&
  //     scrollViewRef?.current &&
  //     (header || description)
  //   ) {
  //     scrollRef.current = scrollViewRef.current
  //     scrollToAlert(-boxPadding)
  //   }
  //   setShouldFocus(focusOnError)
  // }, [
  //   variant,
  //   header,
  //   description,
  //   focusOnError,
  //   scrollRef,
  //   scrollToAlert,
  //   scrollViewRef,
  // ])

  const contentColor = isDarkMode ? Colors.grayLightest : Colors.grayDark
  let backgroundColor, borderColor, iconProps: IconProps

  switch (variant) {
    case 'info':
      backgroundColor = Colors.primaryAltLightest
      borderColor = Colors.primaryAltDark
      iconProps = { name: 'Info', fill: 'base' }

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

  if (primaryButton && isDarkMode) {
    primaryButton.buttonType = ButtonVariants.Base
  }
  if (secondaryButton) {
    secondaryButton.buttonType = isDarkMode
      ? ButtonVariants.BaseSecondary
      : ButtonVariants.Secondary
  }

  const contentBox: ViewStyle = {
    backgroundColor: backgroundColor,
    borderLeftWidth: 8, // TODO: Replace with sizing token
    borderLeftColor: borderColor,
    padding: boxPadding,
    // testID: testId,
  }

  // const vibrate = (): void => {
  //   if (variant === 'error') {
  //     triggerHaptic(HapticFeedbackTypes.notificationError)
  //   } else if (variant === 'warning') {
  //     triggerHaptic(HapticFeedbackTypes.notificationWarning)
  //   }
  // }

  // TODO: Replace with typography tokens
  const headerFont: TextStyle = {
    color: contentColor,
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 20,
    lineHeight: 30,
    marginBottom: description ? 20 : 0,
  }

  // TODO: Replace with typography tokens
  const descriptionFont: TextStyle = {
    color: contentColor,
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 20,
    lineHeight: 30,
  }

  return (
    <View style={contentBox} testID={testId}>
      <View>
      {header ? (
        <View
          // ref={viewRef}
          accessible={true}
          accessibilityLabel={headerA11yLabel || header}
          role="heading">
          <Text style={headerFont}>{header}</Text>
        </View>
      ) : null}
      {description ? (
        <View
          // ref={!header ? viewRef : undefined}
          accessible={true}
          accessibilityLabel={descriptionA11yLabel || description}>
          <Text style={descriptionFont}>{description}</Text>
        </View>
      ) : null}
      {children}
      {/* {shouldFocus && vibrate()} */}
      </View>
    </View>
  )
}
