import { useTranslation } from 'react-i18next'
import React, { FC, useEffect } from 'react'
import styled from 'styled-components'
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native'

import { themeFn } from '../utils/theme'

/**
 * Signifies the props to send into the {@link SegmentedControl}
 */
export type ToggleButtonProps = {
  /** function to call when the selected value has changed */
  onChange: (selection: string) => void
  /** The values to signify selection options */
  values: string[]
  /** REMOVE REMOVE REMOVE the text to display in the selection option UI */
  titles: string[]
  /** the index of the currently selected item. used to set initial state  */
  selected: number
  /** optional list of accessibility hints, ordering dependent on values/titles ordering */
  accessibilityHints?: string[]
}

type ButtonContainerProps = {
  /** lets the component know if it is selected */
  isSelected: boolean
  /** width percent of parent for the component */
  widthPct: string
}

const ButtonContainer = styled(TouchableOpacity)<ButtonContainerProps>`
  border-radius: 8px;
  padding-vertical: 7px;
  width: ${themeFn<ButtonContainerProps>((theme, props) => props.widthPct)};
  elevation: ${themeFn<ButtonContainerProps>((theme, props) =>
    props.isSelected ? 4 : 0,
  )};
  background-color: ${themeFn<ButtonContainerProps>((theme, props) =>
    props.isSelected
      ? theme.colors.segmentedControl.buttonActive
      : theme.colors.segmentedControl.buttonInactive,
  )};
`
/**A common component for filtering UI views by segments or lanes. Used for things like toggling between Active/Completed claims and Future/Past Appointments */
const SegmentedControl: FC<ToggleButtonProps> = ({
  values,
  titles,
  onChange,
  selected,
  accessibilityHints,
}) => {
  const { t } = useTranslation()

  useEffect(() => {
    onChange(values[selected])
  }, [selected, onChange, values])

  return (
    <View style={styles.viewStyle} accessibilityRole="tablist">
      {values.map((value, index) => {
        const isSelected = selected === index

        const font: TextStyle = {
          fontFamily: isSelected ? 'SourceSansPro-Bold' : 'SourceSansPro-Regular',
          fontSize: 20,
          lineHeight: 30
        }

        const textStyle: TextStyle = {
          ...font,
          color: isSelected
            ? 'segmentControllerActive'
            : 'segmentControllerInactive',
          textAlign: 'center',
        }

        return (
          <ButtonContainer
            onPress={(): void => onChange(values[index])}
            isSelected={isSelected}
            key={index}
            widthPct={`${100 / values.length}%`}
            accessibilityHint={
              accessibilityHints ? accessibilityHints[index] : ''
            }
            accessibilityValue={{
              text: t('listPosition', {
                position: index + 1,
                total: values.length,
              }),
            }}
            accessibilityRole={'tab'}
            accessibilityState={{ selected: isSelected }}>
            <Text
              allowFontScaling={false}
              style={textStyle}>
              {titles[index]}
            </Text>
          </ButtonContainer>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  viewStyle: {
    alignSelf: 'baseline',
    backgroundColor: 'segmentedController',
    borderRadius: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 2,
  },
})

export default SegmentedControl
