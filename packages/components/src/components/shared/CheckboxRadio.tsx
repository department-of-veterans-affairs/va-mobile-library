import { Pressable, StyleProp, View, ViewStyle } from 'react-native'
import { font, spacing } from '@department-of-veterans-affairs/mobile-tokens'
import { useTranslation } from 'react-i18next'
import React, { FC } from 'react'

import { CheckboxRadioProps } from '../../types/forms'
import { Description, Error, Header, Hint, Label } from '../shared/FormText'
import { Icon, IconProps } from '../Icon/Icon'
import { Spacer } from '../Spacer/Spacer'
import { getA11yLabel, useTheme } from '../../utils'

/**
 * Internal component for rendering a checkbox or radio button identically besides the icon
 * Note: Should not be used directly. Use the `Checkbox` or `RadioButton` components instead as this does not include
 * ComponentWrapper
 */
export const CheckboxRadio: FC<CheckboxRadioProps> = ({
  a11yListPosition,
  checked,
  label,
  description,
  error,
  header,
  hint,
  indeterminate,
  onPress,
  radio,
  required,
  testID,
  tile,
}) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { typography } = font

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
      paddingLeft: spacing.vadsSpaceMd,
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
  let iconName: IconProps['name']

  if (radio) {
    iconName = checked ? 'RadioButtonChecked' : 'RadioButtonUnchecked'
  } else {
    iconName = indeterminate
      ? 'IndeterminateCheckBox'
      : checked
        ? 'CheckBox'
        : 'CheckBoxOutlineBlank'
  }

  const iconProps: IconProps = {
    name: iconName,
    fill:
      checked || indeterminate
        ? theme.vadsColorFormsForegroundActive
        : theme.vadsColorFormsBorderDefault,
    alignWithTextLineHeight: typography.vadsFontBodyLarge.lineHeight,
  }

  /**
   * Combined a11yLabel on Pressable required for Android Talkback
   */
  const a11yLabel =
    getA11yLabel(label) +
    (required ? ', ' + t('required') : '') +
    (description ? `, ${getA11yLabel(description)}` : '')

  return (
    <View style={containerStyle} testID={testID}>
      <Header text={header} />
      <Hint text={hint} />
      <Error text={error} />
      <Pressable
        onPress={onPress}
        style={tile ? tileStyle : pressableBaseStyle}
        aria-checked={indeterminate ? 'mixed' : checked}
        aria-valuetext={a11yListPosition}
        aria-label={a11yLabel}
        role={radio ? 'radio' : 'checkbox'}>
        <Icon {...iconProps} />
        <Spacer size="xs" horizontal />
        <View style={{ flexShrink: 1 }}>
          <Label text={label} error={error} required={required} />
          <Description text={description} />
        </View>
      </Pressable>
    </View>
  )
}
