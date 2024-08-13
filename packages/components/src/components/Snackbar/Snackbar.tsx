import {
  AccessibilityInfo,
  Pressable,
  PressableStateCallbackType,
  Text,
  TextProps,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
  useWindowDimensions,
} from 'react-native'
import { ToastProps } from 'react-native-toast-notifications/lib/typescript/toast'
import { useTranslation } from 'react-i18next'
import React, { FC, useEffect } from 'react'

import { Icon, IconProps } from '../Icon/Icon'
import { Spacer } from '../Spacer/Spacer'
import { hasHomeButton, isIOS } from '../../utils/OSfunctions'
import { useTheme } from '../../utils'

// TODO: Replace with global setting and spacing tokens
export const SNACKBAR_DEFAULT_OFFSET: number = isIOS()
  ? hasHomeButton()
    ? 60
    : 94
  : 66

type snackbarData = {
  data?: {
    /** true if snackbar represents an error state */
    isError?: boolean
    /** message text A11y label override */
    messageA11y?: string
    /** offset from bottom of screen. defaults to 50 in SnackbarProvider */
    offset?: number
    /** action button onPress logic for "Try again" (isError=true) or "Undo" button */
    onActionPressed?: () => void
  }
}

/**
 * Structured to allow modification of `react-native-toast-notifications` ToastOptions
 * type, but Snackbar component locks down all non-data options presently
 *
 * In the future, this may change (e.g. allowing non-indefinite `duration`)
 */
export type modifyToastOptions = snackbarData

type SnackbarButtonProps = {
  text: string
  onPress: () => void
}

const SnackbarButton: FC<SnackbarButtonProps> = ({ text, onPress }) => {
  const theme = useTheme()

  const helperTextBold: TextStyle = {
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 16,
    lineHeight: 22,
  }

  const getTextStyle = (pressed: boolean): TextStyle => {
    return {
      color: pressed
        ? theme.vadsColorActionForegroundInverseActive
        : theme.vadsColorActionForegroundInverse,
      ...helperTextBold,
    }
  }

  return (
    <Pressable hitSlop={11} onPress={onPress} role="button">
      {({ pressed }: PressableStateCallbackType) => (
        <Text style={getTextStyle(pressed)}>{text}</Text>
      )}
    </Pressable>
  )
}

export type SnackbarProps = Omit<ToastProps, 'data' | 'message'> &
  snackbarData & {
    message: string
  }

/**
 * To use SnackbarProvider, import SnackbarProvider in App.tsx (or similar foundational file) and
 * surround any components or screens that need to trigger a snackbar:
 *
 * ```jsx
 * return (
 *   <SnackbarProvider>
 *     <App />
 *   </SnackbarProvider>
 * )
 * ```
 *
 * **Note:** If you are using safe area helpers such as [SafeAreaView](https://reactnative.dev/docs/safeareaview)
 * from React Native or SafeAreaProvider
 * from [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context)
 * we recommend you place the SnackbarProvider within these safe area views, otherwise default
 * offset from the bottom of the screen may not display as expected.
 *
 * Then within any component, import the `useSnackbar` hook and use the .show() or .hide()
 * methods to display a Snackbar:
 *
 * ```jsx
 * import { useSnackbar } from '@department-of-veterans-affairs/mobile-component-library'
 *
 * const snackbar = useSnackbar()
 *
 * <Button onPress={() => snackbar.show('Hello world')} />
 *```
 *
 * The Snackbar remains open indefinitely. App configuration should ensure it is dismissed on navigation.
 *
 * ### Offset
 * The default offset assumes there is a nav bar and the snackbar should display above it.
 * You can adjust offset by passing `offset` with an integer along with the options in the
 * `.show()` method.
 *
 */
export const Snackbar: FC<SnackbarProps> = (toast) => {
  const fontScale = useWindowDimensions().fontScale
  const theme = useTheme()
  const { t } = useTranslation()

  /**
   * useEffect to handle announcing the Snackbar appearing to the screen reader
   */
  useEffect(() => {
    // Delay to prevent iOS from instantly refocusing the action prompting the Snackbar if synchronous
    setTimeout(
      () =>
        AccessibilityInfo.announceForAccessibility(
          messageA11y || toast.message,
        ),
      50,
    )
    // Empty dependency array so useEffect only runs on initial render
  }, [])

  const helperText: TextStyle = {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 16,
    lineHeight: 22,
  }

  const sizing = {
    _4: 4,
    _8: 8,
    _12: 12,
    _16: 16,
    _20: 20,
    _24: 24,
  }

  const { isError, messageA11y, onActionPressed } = toast.data || {}

  const contentColor = theme.vadsColorForegroundInverse

  const containerProps: ViewProps = {
    accessibilityViewIsModal: true, // iOS only
    tabIndex: 0, // Android only
    // Above props prevent screen reader from tap focusing elements behind the Snackbar
    style: {
      alignItems: 'center',
      backgroundColor: theme.vadsColorSurfaceInverse,
      borderRadius: sizing._4,
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 5,
      minHeight: 44,
      padding: sizing._12,
      marginHorizontal: sizing._20,
    },
  }

  const iconAndMessageContainer: ViewProps = {
    accessible: true,
    role: 'alert',
    style: {
      flexDirection: 'row',
      flexGrow: 1,
    },
  }

  const iconViewStyle: ViewStyle = {
    // Below keeps icon aligned with first row of text, centered, and scalable
    alignSelf: 'flex-start',
    minHeight: 22 * fontScale,
    alignItems: 'center',
    justifyContent: 'center',
  }

  const iconProps: IconProps = {
    name: isError ? 'Warning' : 'CheckCircle',
    fill: contentColor,
    height: sizing._16,
    width: sizing._16,
    preventScaling: true,
  }

  const messageProps: TextProps = {
    'aria-label': messageA11y,
    style: {
      color: contentColor,
      flexShrink: 1,
      ...helperText,
    },
  }

  const buttonContainer: ViewProps = {
    style: {
      flexGrow: 0,
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginLeft: 'auto', // Maintains alignment to right side
      paddingLeft: sizing._16, // Minimum spacing to message text
    },
  }

  const actionButton = () => {
    if (!onActionPressed) return null

    const onPress = () => {
      onActionPressed()
      toast.onHide()
    }
    const actionText = isError ? t('tryAgain') : t('undo')

    return (
      <>
        <SnackbarButton text={actionText} onPress={onPress} />
        <Spacer size={sizing._24} horizontal />
      </>
    )
  }

  return (
    <View {...containerProps}>
      <View {...iconAndMessageContainer}>
        <View style={iconViewStyle}>
          <Icon {...iconProps} />
        </View>
        <Spacer size={sizing._8} horizontal />
        <Text {...messageProps}>{toast.message}</Text>
      </View>
      <View {...buttonContainer}>
        {actionButton()}
        <SnackbarButton text={t('dismiss')} onPress={toast.onHide} />
      </View>
    </View>
  )
}
