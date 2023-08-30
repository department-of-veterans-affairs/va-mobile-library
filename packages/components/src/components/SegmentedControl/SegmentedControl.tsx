import { FC, useEffect } from 'react'
import {
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  useColorScheme,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { ComponentWrapper } from '../../wrapper'

/**
 * Props for {@link SegmentedControl}
 */
export type SegmentedControlProps = {
  /** Array of segment labels */
  labels: string[]
  /** Handler function for changing segment selection */
  onChange: (selection: string) => void
  /** Index of the currently selected segment */
  selected: number
  /** Optional list of accessibility hints for labels */
  labelsA11yHints?: string[]
}

type SegmentProps = {
  /** Sets the background color */
  backgroundColor: string
  /** True if segment is selected, else false */
  isSelected: boolean
  /** Percent of width the segment is allocated */
  widthPct: string
}

const Segment = styled(TouchableOpacity)<SegmentProps>`
  border-radius: 8px;
  padding-vertical: 7px;
  width: ${(props) => props.widthPct};
  elevation: ${(props) => (props.isSelected ? 4 : 0)};
  background-color: ${(props) => props.backgroundColor};
`
/** A component used to switch between related views of information within the same context */
export const SegmentedControl: FC<SegmentedControlProps> = ({
  labels,
  onChange,
  selected,
  labelsA11yHints: accessibilityHints,
}) => {
  const { t } = useTranslation()
  const colorScheme = useColorScheme()

  useEffect(() => {
    onChange(labels[selected])
  }, [selected, onChange, labels])

  // Copied from DSVA color tokens in css-library
  const colorTokens = {
    white: '#FFFFFF',
    gray: {
      dark: '#323A45',
      lighter: '#D6D7D9',
      lightest: '#F1F1F1',
      medium: '#757575',
    },
  }

  let textColor: string, activeBgColor: string, inactiveBgColor: string

  if (colorScheme === 'light') {
    textColor = colorTokens.gray.dark
    activeBgColor = colorTokens.white
    inactiveBgColor = colorTokens.gray.lighter
  } else {
    textColor = colorTokens.gray.lightest
    activeBgColor = colorTokens.gray.medium
    inactiveBgColor = colorTokens.gray.dark
  }

  const viewStyle: ViewStyle = {
    alignSelf: 'baseline',
    backgroundColor: inactiveBgColor,
    borderRadius: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 2,
  }

  return (
    <ComponentWrapper>
      <View style={viewStyle} accessibilityRole="tablist">
        {labels.map((label, index) => {
          const isSelected = selected === index

          const font: TextStyle = {
            fontFamily: isSelected
              ? 'SourceSansPro-Bold'
              : 'SourceSansPro-Regular',
            fontSize: 20,
            lineHeight: 30,
          }

          const textStyle: TextStyle = {
            ...font,
            color: textColor,
            textAlign: 'center',
          }

          return (
            <Segment
              onPress={(): void => onChange(labels[index])}
              backgroundColor={isSelected ? activeBgColor : inactiveBgColor}
              isSelected={isSelected}
              key={index}
              widthPct={`${100 / labels.length}%`}
              accessibilityHint={
                accessibilityHints ? accessibilityHints[index] : ''
              }
              accessibilityValue={{
                text: t('listPosition', {
                  position: index + 1,
                  total: labels.length,
                }),
              }}
              accessibilityRole={'tab'}
              accessibilityState={{ selected: isSelected }}>
              <Text allowFontScaling={false} style={textStyle}>
                {label}
              </Text>
            </Segment>
          )
        })}
      </View>
    </ComponentWrapper>
  )
}
