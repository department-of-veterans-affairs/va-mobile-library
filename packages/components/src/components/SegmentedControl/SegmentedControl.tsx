import {
  Pressable,
  Text as RNText,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { font, spacing } from '@department-of-veterans-affairs/mobile-tokens'
import { useTranslation } from 'react-i18next'
import React, { FC, useEffect } from 'react'
import styled from 'styled-components/native'

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

type SegmentProps = {
  /** Sets the background color */
  backgroundColor: string
  /** True if segment is selected, else false */
  isSelected: boolean
  /** Percent of width the segment is allocated */
  widthPct: string
}

const Segment = styled(Pressable)<SegmentProps>`
  border-radius: 8px;
  padding-horizontal: ${spacing.vadsSpace2xs}px;
  padding-vertical: ${spacing.vadsSpaceXs}px;
  width: ${(props) => props.widthPct};
  elevation: ${(props) =>
    props.isSelected ? spacing.vadsSpace2xs : spacing.vadsSpaceNone};
  background-color: ${(props) => props.backgroundColor};
`
/** A segmented control is used to switch between related views of information within the same context. */
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
        aria-valuetext={a11yListPosition}
        accessibilityHint={a11yHints ? a11yHints[index] : ''}
        role={'tab'}
        accessibilityState={{ selected: isSelected }}
        style={PressableOpacityStyle()}
        testID={testIDs?.[index]}>
        <RNText allowFontScaling={false} style={textStyle}>
          {label}
        </RNText>
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
