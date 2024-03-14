import { Colors } from '@department-of-veterans-affairs/mobile-tokens'
// import { HapticFeedbackTypes } from 'react-native-haptic-feedback'
import { ScrollView, Text, TextStyle, View, ViewStyle } from 'react-native'
import React, { FC, RefObject, useEffect, useState } from 'react'

// import { triggerHaptic } from 'utils/haptics'
// import { useAutoScrollToElement } from 'utils/hooks'

import { Button, ButtonProps, ButtonVariants } from '../Button/Button'
import { Icon, IconProps } from '../Icon/Icon'
import { Spacer, useColorScheme } from '../../utils'

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

  // TODO: Replace with sizing/dimension tokens
  const Sizing = {
    _8: 8,
    _12: 12,
    _20: 20,
  }
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
      backgroundColor = Colors.greenLightest
      borderColor = Colors.green
      iconProps = { name: 'Check', fill: 'base' }

      if (isDarkMode) {
        backgroundColor = Colors.uswdsGreenCoolVivid80
        borderColor = Colors.greenLight
      }
      break
    case 'warning':
      backgroundColor = Colors.warningMessage
      borderColor = Colors.gold
      iconProps = { name: 'ExclamationTriangle', fill: 'base' }

      if (isDarkMode) {
        backgroundColor = Colors.uswdsYellowVivid70
        borderColor = Colors.goldLight
      }
      break
    case 'error':
      backgroundColor = Colors.secondaryLightest
      borderColor = Colors.secondaryDark
      iconProps = { name: 'ExclamationCircle', fill: 'base' }

      if (isDarkMode) {
        backgroundColor = Colors.uswdsRedVivid80
        borderColor = Colors.secondary
      }
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
    borderLeftColor: borderColor,
    borderLeftWidth: Sizing._8,
    padding: Sizing._20,
    paddingLeft: Sizing._12, // Adds with borderLeftWidth for 20
  }

  const iconViewStyle: ViewStyle = {
    flexDirection: 'row',
    // Below keeps icon aligned with first row of text, centered, and scalable
    alignSelf: 'flex-start',
    minHeight: 30,
    alignItems: 'center',
    justifyContent: 'center',
  }

  const iconDisplay = (
    <View style={iconViewStyle}>
      <Icon fill={contentColor} {...iconProps} />
      <Spacer horizontal />
    </View>
  )

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
  }

  // TODO: Replace with typography tokens
  const descriptionFont: TextStyle = {
    color: contentColor,
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 20,
    lineHeight: 30,
  }

  const _primaryButton = () => {
    if (!primaryButton) return null

    primaryButton.buttonType = isDarkMode
      ? ButtonVariants.Base
      : ButtonVariants.Primary

    return (
      <>
        <Spacer size={Sizing._20} />
        <Button {...primaryButton} />
      </>
    )
  }

  const _secondaryButton = () => {
    if (!secondaryButton) return null

    secondaryButton.buttonType = isDarkMode
      ? ButtonVariants.BaseSecondary
      : ButtonVariants.Secondary

    return (
      <>
        <Spacer size={Sizing._20} />
        <Button {...secondaryButton} />
      </>
    )
  }

  return (
    <View style={contentBox} testID={testId}>
      <View style={{ flexDirection: 'row' }}>
        {iconDisplay}
        <View style={{ flex: 1 }}>
          {header ? (
            <View
              // ref={viewRef}
              accessible={true}
              aria-label={headerA11yLabel || header}
              role="heading">
              <Text style={headerFont}>{header}</Text>
            </View>
          ) : null}
          {header && (description || children) ? <Spacer /> : null}
          {description ? (
            <View
              // ref={!header ? viewRef : undefined}
              accessible={true}
              aria-label={descriptionA11yLabel || description}>
              <Text style={descriptionFont}>{description}</Text>
            </View>
          ) : null}
          {description && children ? <Spacer /> : null}
          {children}
          {/* {shouldFocus && vibrate()} */}
        </View>
      </View>
      {_primaryButton()}
      {_secondaryButton()}
    </View>
  )
}
