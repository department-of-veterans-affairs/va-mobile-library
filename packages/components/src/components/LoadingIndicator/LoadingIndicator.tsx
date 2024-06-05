import {
  Animated,
  Easing,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import React, { useEffect } from 'react'

import { Colors } from '@department-of-veterans-affairs/mobile-tokens'
import { Icon, IconProps } from '../Icon/Icon'
import { Spacer } from '../Spacer/Spacer'
import { useColorScheme } from '../../utils'

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
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
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

  const indicatorStyle: ViewStyle = {
    width: 50,
    height: 50,
    transform: [{ rotate }],
    justifyContent: 'center',
    alignItems: 'center',
  }

  const iconProps: IconProps = {
    name: 'LoadingIndicator',
    width: 50,
    height: 50,
    fill: isDarkMode ? Colors.uswdsBlueVivid30 : Colors.primary,
  }

  const textStyle: TextStyle = {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center',
    color: isDarkMode ? Colors.grayLightest : Colors.base,
  }

  return (
    <View style={containerStyle}>
      <Animated.View style={indicatorStyle}>
        <Icon {...iconProps} />
      </Animated.View>
      {text && (
        <>
          <Spacer />
          <Text style={textStyle} accessibilityLabel={a11yLabel}>
            {text}
          </Text>
        </>
      )}
      {children && (
        <>
          <Spacer />
          {children}
        </>
      )}
    </View>
  )
}
