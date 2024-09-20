import {
  Insets,
  Pressable,
  Text,
  TextStyle,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native'
import { spacing } from '@department-of-veterans-affairs/mobile-tokens'
import React, { FC, useState } from 'react'

import { BaseColor, useColorScheme, useTheme } from '../../utils'
import { Button, ButtonProps, ButtonVariants } from '../Button/Button'
import { Icon, IconProps } from '../Icon/Icon'
import { Spacer } from '../Spacer/Spacer'

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
  testID?: string
} & (
  | {
      /** True to make the Alert expandable */
      expandable: true
      /** Header text. Required when Alert is expandable */
      header: string
      /** True if Alert should start expanded. Defaults to false */
      initializeExpanded?: boolean
    }
  | {
      /** True to make the Alert expandable */
      expandable?: false
      /** Header text. Optional when Alert is not expandable */
      header?: string
      initializeExpanded?: never
    }
)

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
  testID,
}) => {
  const colorScheme = useColorScheme()
  const theme = useTheme()
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

  const contentColor = AlertContentColor()
  let backgroundColor, borderColor, iconName: IconProps['name']

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

  switch (variant) {
    case 'info':
      backgroundColor = theme.vadsColorFeedbackSurfaceInfo
      borderColor = theme.vadsColorFeedbackBorderInfo
      iconName = 'Info'
      break
    case 'success':
      backgroundColor = theme.vadsColorFeedbackSurfaceSuccess
      borderColor = theme.vadsColorFeedbackBorderSuccess
      iconName = 'CheckCircle'
      break
    case 'warning':
      backgroundColor = theme.vadsColorFeedbackSurfaceWarning
      borderColor = theme.vadsColorFeedbackBorderWarning
      iconName = 'Warning'
      break
    case 'error':
      backgroundColor = theme.vadsColorFeedbackSurfaceError
      borderColor = theme.vadsColorFeedbackBorderError
      iconName = 'Error'
      break
  }

  const contentBox: ViewStyle = {
    backgroundColor: backgroundColor,
    borderLeftColor: borderColor,
    borderLeftWidth: spacing.vadsSpaceXs,
    padding: spacing.vadsSpaceLg,
    paddingLeft: spacing.vadsSpaceSm, // Adds with borderLeftWidth to be `Lg` (20)
    width: '100%', // Ensure Alert fills horizontal space, regardless of flexing content
  }

  const iconViewStyle: ViewStyle = {
    flexDirection: 'row',
    // Below keeps icon aligned with first row of text, centered, and scalable
    alignSelf: 'flex-start',
    minHeight: headerFont.lineHeight! * fontScale,
    alignItems: 'center',
    justifyContent: 'center',
  }

  const iconDisplay = (
    <View style={iconViewStyle}>
      <Icon fill={contentColor} name={iconName} preventScaling />
      <Spacer size="xs" horizontal />
    </View>
  )

  const expandableIcon = (
    <View style={iconViewStyle}>
      <Spacer horizontal />
      <Icon
        fill={contentColor}
        name={expanded ? 'ExpandLess' : 'ExpandMore'}
        preventScaling
      />
    </View>
  )

  const _header = () => {
    if (!header) return null

    const headerText = <Text style={headerFont}>{header}</Text>
    const a11yLabel = headerA11yLabel || header
    const hitSlop: Insets = {
      // left border/padding + spacer + icon width
      left: spacing.vadsSpaceLg + spacing.vadsSpaceXs + spacing.vadsSpaceXl,
      top: spacing.vadsSpaceLg,
      // bottom spacing changes depending on expanded state
      bottom: expanded ? spacing.vadsSpaceSm : spacing.vadsSpaceLg,
      right: spacing.vadsSpaceLg,
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
        <Spacer size="lg" />
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
        <Spacer size="lg" />
        <Button {...secondaryButton} />
      </>
    )
  }

  return (
    <View
      style={contentBox}
      testID={testID}
      role={expandable ? 'tablist' : 'none'}>
      <View style={{ flexDirection: 'row' }}>
        {iconDisplay}
        <View style={{ flex: 1 }}>
          {_header()}
          {expanded && (
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                {header && (description || children) ? (
                  <Spacer size="lg" />
                ) : null}
                {description ? (
                  <Text
                    style={descriptionFont}
                    aria-label={descriptionA11yLabel || description}>
                    {description}
                  </Text>
                ) : null}
                {description && children ? <Spacer size="lg" /> : null}
                {children}
              </View>
              {/* When expandable, prevent body content extending below the expand icon and padding for it */}
              {expandable ? <Spacer size="4xl" horizontal /> : null}
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
