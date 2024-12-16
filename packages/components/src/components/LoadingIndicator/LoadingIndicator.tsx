import { Animated, Easing, View, ViewStyle } from 'react-native'
import React, { useEffect } from 'react'

import { Icon, IconProps } from '../Icon/Icon'
import { Spacer } from '../Spacer/Spacer'
import { Text } from '../Text/Text'
import { useTheme } from '../../utils'

export type LoadingIndicatorProps = {
  /** AccessibilityLabel for the text */
  a11yLabel?: string
} & (
  | {
      /** Text appearing below indicator. Required if no children included */
      text: string
      /** Optional custom content to display below indicator */
      children?: React.ReactNode
    }
  | {
      /** Text appearing below indicator. Optional if children included */
      text?: string
      /** Optional custom content to display below indicator */
      children: React.ReactNode
    }
)

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  text,
  a11yLabel,
  children,
}) => {
  const theme = useTheme()
  const rotation = new Animated.Value(0)

  useEffect(() => {
    const animate = () => {
      rotation.setValue(0) // Reset the rotation value to 0
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => animate()) // Loop the animation
    }
    animate()
  }, [rotation])

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  const containerStyle: ViewStyle = {
    width: '100%',
    alignItems: 'center',
  }

  const iconProps: IconProps = {
    name: 'LoadingIndicator',
    width: 50,
    height: 50,
    fill: theme.vadsColorActionForegroundDefault,
  }

  return (
    <View style={containerStyle}>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <Icon {...iconProps} />
      </Animated.View>
      <Spacer size="xs" />
      {text && (
        <Text
          variant="body"
          size="lg"
          a11yLabel={a11yLabel}
          bottomSpacing="none"
          center>
          {text}
        </Text>
      )}
      {text && children ? <Spacer size="xs" /> : null}
      {children}
    </View>
  )
}
