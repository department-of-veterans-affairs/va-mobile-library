import { Animated, Easing, View, ViewStyle } from 'react-native'
import { FC, ReactNode, useEffect, useRef } from 'react'

import { Icon, IconProps } from '../Icon/Icon'
import { Spacer } from '../Spacer/Spacer'
import { Text } from '../Text/Text'
import { isAndroid, isIOS } from '../../utils/OSfunctions'
import { useTheme } from '../../utils'

export type LoadingIndicatorProps = {
  /** AccessibilityLabel for the text */
  a11yLabel?: string
} & (
  | {
      /** Text appearing below indicator. Required if no children included */
      text: string
      /** Optional custom content to display below indicator */
      children?: ReactNode
    }
  | {
      /** Text appearing below indicator. Optional if children included */
      text?: string
      /** Optional custom content to display below indicator */
      children: ReactNode
    }
)

/**
 * #### [<u>View guidance for the Loading indicator component on the VA Design System</u>](https://design.va.gov/components/loading-indicator)
 */
export const LoadingIndicator: FC<LoadingIndicatorProps> = ({
  text,
  a11yLabel,
  children,
}) => {
  const theme = useTheme()
  const rotation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: isAndroid() || isIOS(),
      }),
    )
    animation.start() // Loop the animation
    return () => animation.stop() // Cleanup animation when component unmounts
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
