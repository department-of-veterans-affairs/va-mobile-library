import { FC, useEffect } from 'react'
import {
  Pressable,
  Text as RNText,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { font, spacing } from '@department-of-veterans-affairs/mobile-tokens'
import { useTranslation } from 'react-i18next'

import { ComponentWrapper } from '../../wrapper'
import { PressableOpacityStyle, useTheme } from '../../utils'

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
    borderRadius: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 2,
  }

  /**
   * Props for Segment component
   */
  type SegmentProps = {
    /** Label for the segment */
    label: string
    /** Index of the segment */
    index: number
  }

  /**
   * Individual segment component within the segmented control
   */
  const Segment: FC<SegmentProps> = ({ label, index }) => {
    const isSelected = selected === index

    const segmentStyle: ViewStyle = {
      backgroundColor: isSelected ? activeBgColor : inactiveBgColor,
      borderRadius: 6,
      paddingHorizontal: spacing.vadsSpace2xs,
      paddingVertical: spacing.vadsSpaceXs,
      width: `${100 / labels.length}%`,
    }

    const accessibilityLabel = a11yLabels
      ? a11yLabels[index] || labels[index]
      : labels[index]

    const a11yListPosition = t('listPosition', {
      position: index + 1,
      total: labels.length,
    })

    const textStyle: TextStyle = {
      ...typography.vadsFontBodyLarge,
      fontFamily: isSelected ? 'SourceSansPro-Bold' : 'SourceSansPro-Regular',
      marginBottom: spacing.vadsSpaceNone,
      color: theme.vadsColorForegroundDefault,
      textAlign: 'center',
    }

    return (
      <Pressable
        aria-label={accessibilityLabel}
        aria-selected={isSelected}
        aria-valuetext={a11yListPosition}
        accessibilityHint={a11yHints?.[index] || ''}
        onPress={() => onChange(index)}
        role={'tab'}
        style={PressableOpacityStyle(segmentStyle)}
        testID={testIDs?.[index]}>
        <RNText allowFontScaling={false} style={textStyle}>
          {label}
        </RNText>
      </Pressable>
    )
  }

  return (
    <ComponentWrapper>
      <View style={viewStyle} role="tablist">
        {labels.map((label, index) => (
          <Segment key={index} label={label} index={index} />
        ))}
      </View>
    </ComponentWrapper>
  )
}
