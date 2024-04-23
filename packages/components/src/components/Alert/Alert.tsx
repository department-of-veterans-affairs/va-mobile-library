import { Colors } from '@department-of-veterans-affairs/mobile-tokens'
import {
  Insets,
  Pressable,
  Text,
  TextStyle,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native'
import React, { FC, useState } from 'react'

import { BaseColor, Spacer, useColorScheme } from '../../utils'
import { Button, ButtonProps, ButtonVariants } from '../Button/Button'
import { Icon, IconProps } from '../Icon/Icon'

/** Convenience function to set children content color correctly with light/dark mode */
export const AlertContentColor = BaseColor

export type AlertAnalytics = {
  onExpand?: () => void
  onCollapse?: () => void
}

export type AlertProps = {
  /** Alert variant */
  variant: 'info' | 'success' | 'warning' | 'error'
  /** Optional a11y override for header */
  headerA11yLabel?: string
  /** Optional description text */
  description?: string
  /** Optional a11y override for description */
  descriptionA11yLabel?: string
  /** Optional custom content to nest inside Alert
   * Use AlertContentColor or appropriate component props to set light/dark mode 'base' gray colors */
  children?: React.ReactNode
  /** Optional primary action button */
  primaryButton?: ButtonProps
  /** Optional secondary action button */
  secondaryButton?: ButtonProps
  /** Optional analytics event logging */
  analytics?: AlertAnalytics
  /** Optional testID */
  testId?: string
} & (
  | {
      /** True to make the Alert expandable */
      expandable: true
      /** Header text. Required when Alert is expandable */
      header: string
      /** True if Alert should start expanded. Defaults to false */
      initializeExpanded?: boolean
      /** Optional passthrough function for expand event */
      onExpand?: () => void
      /** Optional passthrough function for collapse event */
      onCollapse?: () => void
    }
  | {
      /** True to make the Alert expandable */
      expandable?: false
      /** Header text. Optional when Alert is not expandable */
      header?: string
      initializeExpanded?: never
      onExpand?: never
      onCollapse?: never
    }
)

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
  expandable,
  initializeExpanded,
  analytics,
  primaryButton,
  secondaryButton,
  testId,
}) => {
  const colorScheme = useColorScheme()
  const fontScale = useWindowDimensions().fontScale
  const isDarkMode = colorScheme === 'dark'
  const [expanded, setExpanded] = useState(
    expandable ? initializeExpanded : true,
  )

  const toggleExpand = () => {
    if (expanded && analytics?.onCollapse) analytics.onCollapse()
    if (!expanded && analytics?.onExpand) analytics.onExpand()
    setExpanded(!expanded)
  }

  // TODO: Replace with sizing/dimension tokens
  const Sizing = {
    _8: 8,
    _10: 10,
    _12: 12,
    _16: 16,
    _20: 20,
    _24: 24,
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
    minHeight: Sizing._30 * fontScale,
    alignItems: 'center',
    justifyContent: 'center',
  }

  const iconDisplay = (
    <View style={iconViewStyle}>
      <Icon fill={contentColor} {...iconProps} preventScaling />
      <Spacer horizontal />
    </View>
  )

  const expandIconProps: IconProps = {
    fill: contentColor,
    width: Sizing._16,
    height: Sizing._16,
    maxWidth: Sizing._24,
    name: expanded ? 'ChevronUp' : 'ChevronDown',
  }

  const expandableIcon = (
    <View style={iconViewStyle}>
      <Spacer horizontal />
      <Icon {...expandIconProps} />
    </View>
  )

  /**
   * When an alert is expandable, the content should have additional padding on
   * the right to appear within the expandable icon. Since the expandable icon
   * has a maxWidth, this hidden icon matches the spacing of the icon insteading
   * instead of adding a <Spacer /> with a calculated value.
   */
  const spacerIcon = (
    <View style={iconViewStyle} aria-hidden>
      <Spacer horizontal />
      <Icon {...expandIconProps} fill="none" />
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

  const _header = () => {
    if (!header) return null

    const headerText = <Text style={headerFont}>{header}</Text>
    const a11yLabel = headerA11yLabel || header
    const hitSlop: Insets = {
      // left border + left padding + spacer + icon width
      left: Sizing._8 + Sizing._12 + Sizing._10 + Sizing._24,
      top: Sizing._20,
      // bottom spacing changes depending on expanded state
      bottom: expanded ? Sizing._10 : Sizing._20,
      right: Sizing._20,
    }

    /**
     * Wrap header text and expand icon in Pressable if the Alert is expandable
     * Otherwise wrap in View with accessibility props
     */
    if (expandable) {
      return (
        <Pressable
          onPress={toggleExpand}
          role="tab"
          aria-expanded={expanded}
          aria-label={a11yLabel}
          hitSlop={hitSlop}
          style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>{headerText}</View>
          {expandableIcon}
        </Pressable>
      )
    }

    return (
      <View accessible={true} aria-label={a11yLabel} role="heading">
        {headerText}
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
    <View
      style={contentBox}
      testID={testId}
      role={expandable ? 'tablist' : 'none'}>
      <View style={{ flexDirection: 'row' }}>
        {iconDisplay}
        <View style={{ flex: 1 }}>
          {_header()}
          {expanded && (
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                {header && (description || children) ? <Spacer /> : null}
                {description ? (
                  <View
                    accessible={true}
                    aria-label={descriptionA11yLabel || description}>
                    <Text style={descriptionFont}>{description}</Text>
                  </View>
                ) : null}
                {description && children ? <Spacer /> : null}
                {children}
              </View>
              {expandable && spacerIcon}
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
