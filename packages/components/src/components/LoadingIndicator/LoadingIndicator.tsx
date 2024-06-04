import {
  Animated,
  Easing,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import React, { useEffect } from 'react'

import Loading from './loading.svg'

export type LoadingIndicatorProps = {
  /** Optional text appearing below indicator */
  text?: string
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ text }) => {
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

  const textStyle: TextStyle = {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 20,
    lineHeight: 30,
    marginTop: 10,
  }

  return (
    <View style={containerStyle}>
      <Animated.View style={indicatorStyle}>
        <Loading width="50" height="50" />
      </Animated.View>
      {text && <Text style={textStyle}>{text}</Text>}
    </View>
  )
}
