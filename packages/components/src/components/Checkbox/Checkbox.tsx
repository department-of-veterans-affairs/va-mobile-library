import {
  Pressable,
  StyleProp,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native'
import { spacing } from '@department-of-veterans-affairs/mobile-tokens'
import React, { FC } from 'react'

import { CheckboxRadioProps, FormElementProps } from '../../types/forms'
import { ComponentWrapper } from '../../wrapper'
import {
  Description,
  Error,
  Header,
  Hint,
  Label,
  fontLabel,
} from '../shared/FormText'
import { Icon, IconProps } from '../Icon/Icon'
import { Spacer } from '../Spacer/Spacer'
import { useTheme } from '../../utils'

export type CheckboxProps = FormElementProps &
  CheckboxRadioProps & {
    /** True to make checkbox appear as checked */
    checked?: boolean
    /** True to apply indeterminate icon to checkbox */
    indeterminate?: boolean
  }

export const Checkbox: FC<CheckboxProps> = ({
  checked,
  label,
  description,
  error,
  header,
  hint,
  indeterminate,
  onPress,
  required,
  tile,
}) => {
  const theme = useTheme()
  const fontScale = useWindowDimensions().fontScale

  /**
   * Container styling
   */
  let containerStyle: ViewStyle = {
    width: '100%',
  }

  if (error) {
    containerStyle = {
      ...containerStyle,
      borderLeftWidth: spacing.vadsSpace2xs,
      borderColor: theme.vadsColorFormsBorderError,
      paddingLeft: spacing.vadsSpaceLg,
    }
  }

  /**
   * Pressable styling
   */
  const pressableBaseStyle: StyleProp<ViewStyle> = {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  }

  const tileStyle: ViewStyle = {
    ...pressableBaseStyle,
    borderWidth: 2,
    borderRadius: 4,
    padding: spacing.vadsSpaceSm,
    paddingRight: spacing.vadsSpaceMd,
    borderColor: checked
      ? theme.vadsColorFormsBorderActive
      : theme.vadsColorFormsBorderSubtle,
    backgroundColor: checked
      ? theme.vadsColorFormsSurfaceActive
      : theme.vadsColorSurfaceDefault,
  }

  /**
   * Icon
   */
  const iconViewStyle: ViewStyle = {
    // Below keeps icon aligned with first row of text, centered, and scalable
    alignSelf: 'flex-start',
    // TODO: Replace lineHeight with typography token
    minHeight: fontLabel.lineHeight * fontScale,
    alignItems: 'center',
    justifyContent: 'center',
  }

  const iconProps: IconProps = {
    name: indeterminate
      ? 'IndeterminateCheckBox'
      : checked
        ? 'CheckBox'
        : 'CheckBoxOutlineBlank',
    fill:
      checked || indeterminate
        ? theme.vadsColorFormsForegroundActive
        : theme.vadsColorFormsBorderDefault,
  }

  const _icon = (
    <View style={iconViewStyle}>
      <Icon {...iconProps} />
    </View>
  )

  return (
    <ComponentWrapper>
      <View style={containerStyle}>
        <Header text={header} />
        {header && <Spacer size="xs" />}

        <Hint text={hint} />
        {hint && <Spacer size="xs" />}

        <Error text={error} />
        {error && <Spacer size="xs" />}

        <Pressable
          onPress={onPress}
          style={tile ? tileStyle : pressableBaseStyle}
          aria-checked={indeterminate ? 'mixed' : checked}
          role="checkbox">
          {_icon}
          <Spacer size="xs" horizontal />
          <View style={{ flexShrink: 1 }}>
            <Label text={label} error={error} required={required} />
            {description && <Spacer size="xs" />}
            <Description text={description} />
          </View>
        </Pressable>
      </View>
    </ComponentWrapper>
  )
}
