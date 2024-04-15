import { Colors } from '@department-of-veterans-affairs/mobile-tokens'
import { Pressable, Text, TextStyle, View, ViewStyle } from 'react-native'
import React, { FC, useState } from 'react'

import { BaseColor, Spacer, useColorScheme } from '../../utils'
import { Button, ButtonProps, ButtonVariants } from '../Button/Button'
import { Icon, IconProps } from '../Icon/Icon'

/** Convenience function to set children content color correctly with light/dark mode */
export const AlertContentColor = BaseColor

export type AlertProps = {
  /** Alert variant */
  variant: 'info' | 'success' | 'warning' | 'error'
  /** Optional header text */
  header?: string
  /** Optional a11y override for header */
  headerA11yLabel?: string
  /** Optional description text */
  description?: string
  /** Optional a11y override for description */
  descriptionA11yLabel?: string
  /** Optional custom content to nest inside Alert
   * Use AlertContentColor or appropriate component props to set light/dark mode 'base' gray colors */
  children?: React.ReactNode
  /** Optional boolean to determine whether the alert should be collapsible */
  collapsible?: boolean
  /** Optional primary action button */
  primaryButton?: ButtonProps
  /** Optional secondary action button */
  secondaryButton?: ButtonProps
  /** Optional testID */
  testId?: string
}

/**
 * Work in progress:
 * Displays content in a box styled as an alert
 */
export const Alert: FC<AlertProps> = ({
  variant,
  header,
  headerA11yLabel,
  description,
  descriptionA11yLabel,
  children,
  collapsible,
  primaryButton,
  secondaryButton,
  testId,
}) => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const [expanded, setExpanded] = useState(true)

  // TODO: Replace with sizing/dimension tokens
  const Sizing = {
    _8: 8,
    _12: 12,
    _20: 20,
    _30: 30,
  }
  const contentColor = AlertContentColor()
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
    width: '100%', // Ensure Alert fills horizontal space, regardless of flexing content
  }

  const iconViewStyle: ViewStyle = {
    flexDirection: 'row',
    // Below keeps icon aligned with first row of text, centered, and scalable
    alignSelf: 'flex-start',
    minHeight: Sizing._30,
    alignItems: 'center',
    justifyContent: 'center',
  }

  const iconDisplay = (
    <View style={iconViewStyle}>
      <Icon fill={contentColor} {...iconProps} />
      <Spacer horizontal />
    </View>
  )

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

  const collapseIconDisplay = (
    <View style={iconViewStyle}>
      <Spacer horizontal />
      <Icon
        fill={contentColor}
        width={16}
        height={16}
        name={expanded ? 'ChevronUp' : 'ChevronDown'}
      />
    </View>
  )

  const _headerText = () => {
    if (header) {
      return <Text style={headerFont}>{header}</Text>
    }

    if (description) {
      return <Text style={descriptionFont}>{description}</Text>
    }

    return null
  }

  const _header = () => {
    const a11yLabel = header
      ? headerA11yLabel || header
      : description
        ? descriptionA11yLabel || description
        : ''

    if (collapsible) {
      return (
        <Pressable
          onPress={() => setExpanded(!expanded)}
          accessibilityRole="tab"
          accessibilityState={{ expanded }}
          aria-label={a11yLabel}
          style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>{_headerText()}</View>
          {collapseIconDisplay}
        </Pressable>
      )
    }

    return (
      <View style={{ flexDirection: 'row' }}>
        <View
          accessible={true}
          aria-label={a11yLabel}
          role="heading"
          style={{ flex: 1 }}>
          {_headerText()}
        </View>
      </View>
    )
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
          {_header()}
          {expanded && (
            <View>
              {header && (description || children) ? <Spacer /> : null}
              {header && description ? (
                <View
                  accessible={true}
                  aria-label={descriptionA11yLabel || description}>
                  <Text style={descriptionFont}>{description}</Text>
                </View>
              ) : null}
              {description && children ? <Spacer /> : null}
              {children}
            </View>
          )}
        </View>
      </View>
      {expanded && (
        <>
          {_primaryButton()}
          {_secondaryButton()}
        </>
      )}
    </View>
  )
}
