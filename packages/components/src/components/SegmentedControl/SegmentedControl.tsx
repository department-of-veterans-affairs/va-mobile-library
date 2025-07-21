import { FC, useEffect } from 'react'
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { font, spacing } from '@department-of-veterans-affairs/mobile-tokens'
import { useTranslation } from 'react-i18next'

import { ComponentWrapper } from '../../wrapper'
import { PressableOpacityStyle, isIOS, useTheme } from '../../utils'

// Regular Pressable component instead of styled-component to avoid web compatibility issues
const Segment: FC<
  {
    backgroundColor: string
    isSelected: boolean
    widthPct: string
    children: React.ReactNode
    onPress: () => void
  } & Omit<PressableProps, 'onPress' | 'children'>
> = ({
  backgroundColor,
  isSelected,
  widthPct,
  children,
  onPress,
  style,
  ...props
}) => {
  const segmentStyle = StyleSheet.create({
    segment: {
      borderRadius: 8,
      paddingHorizontal: spacing.vadsSpace2xs,
      paddingVertical: spacing.vadsSpaceXs,
      width: widthPct as '100%', // Type assertion for percentage strings
      elevation: isSelected ? spacing.vadsSpace2xs : spacing.vadsSpaceNone,
      backgroundColor: backgroundColor,
    },
  })

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        segmentStyle.segment,
        typeof style === 'function' ? style({ pressed }) : style,
      ]}
      {...props}>
      {children}
    </Pressable>
  )
}

/**
 * Props for {@link SegmentedControl}
 */
export type SegmentedControlProps = {
  /** Array of segment labels */
  labels: string[]
  /** Handler function for changing segment selection */
  onChange: (selection: number) => void
  /** Index of the currently selected segment */
  selected: number
  /** Optional array of segment accessibility override labels */
  a11yLabels?: string[]
  /** Optional array of segment accessibility hints */
  a11yHints?: string[]
  /** Optional array of test IDs for test suites */
  testIDs?: string[]
}

/**
 * #### [<u>View guidance for the Segmented control component on the VA Design System</u>](https://design.va.gov/components/button/button-segmented)
 */
export const SegmentedControl: FC<SegmentedControlProps> = ({
  labels,
  onChange,
  selected,
  a11yLabels,
  a11yHints,
  testIDs,
}) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { typography } = font

  useEffect(() => {
    onChange(selected)
  }, [selected, onChange])

  const activeBgColor = theme.vadsSegmentedControlColorSurfaceSelected
  const inactiveBgColor = theme.vadsColorSurfaceSecondary

  const viewStyle: ViewStyle = {
    alignSelf: 'stretch',
    backgroundColor: inactiveBgColor,
    borderRadius: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 2,
  }

  /**
   * Function to build individual segment within controller
   * @param label - Segment label
   * @param index - Segment index position in array
   */
  const buildSegment = (label: string, index: number) => {
    const isSelected = selected === index

    const accessibilityLabel = a11yLabels
      ? a11yLabels[index] || labels[index]
      : labels[index]

    const a11yListPosition = t('listPosition', {
      position: index + 1,
      total: labels.length,
    })

    const accessibilityValueText = isIOS()
      ? t('tab') +
        ', ' +
        (isSelected ? t('selected') + ', ' : '') +
        a11yListPosition
      : a11yListPosition

    const textStyle: TextStyle = {
      ...typography.vadsFontBodyLarge,
      fontFamily: isSelected ? 'SourceSansPro-Bold' : 'SourceSansPro-Regular',
      marginBottom: spacing.vadsSpaceNone,
      color: theme.vadsColorForegroundDefault,
      textAlign: 'center',
    }

    return (
      <Segment
        onPress={(): void => onChange(index)}
        backgroundColor={isSelected ? activeBgColor : inactiveBgColor}
        isSelected={isSelected}
        key={index}
        widthPct={`${100 / labels.length}%`}
        aria-label={accessibilityLabel}
        aria-valuetext={accessibilityValueText}
        accessibilityHint={a11yHints ? a11yHints[index] : ''}
        role={'tab'}
        accessibilityState={{ selected: isSelected }}
        style={PressableOpacityStyle()}
        testID={testIDs?.[index]}>
        <Text allowFontScaling={false} style={textStyle}>
          {label}
        </Text>
      </Segment>
    )
  }

  return (
    <ComponentWrapper>
      <View style={viewStyle} role="tablist">
        {labels.map((label, index) => buildSegment(label, index))}
      </View>
    </ComponentWrapper>
  )
}
