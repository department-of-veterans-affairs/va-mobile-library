import { Pressable, Text, TextStyle, View, ViewStyle } from 'react-native'
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
  padding-vertical: 7px;
  width: ${(props) => props.widthPct};
  elevation: ${(props) => (props.isSelected ? 4 : 0)};
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
  const { t } = useTranslation()
  const theme = useTheme()

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
    const accessibilityValue = {
      text: t('listPosition', {
        position: index + 1,
        total: labels.length,
      }),
    }

    // TODO: Replace with typography tokens
    const font: TextStyle = {
      fontFamily: isSelected ? 'SourceSansPro-Bold' : 'SourceSansPro-Regular',
      fontSize: 20,
      lineHeight: 30,
    }

    const textStyle: TextStyle = {
      ...font,
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
        accessibilityHint={a11yHints ? a11yHints[index] : ''}
        accessibilityValue={accessibilityValue}
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
