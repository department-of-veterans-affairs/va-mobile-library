import {
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
import React, { FC } from 'react'
import Toast, { ToastType } from 'react-native-toast-notifications'
import ToastContainer from 'react-native-toast-notifications'

import { Icon, IconProps } from '../Icon/Icon'
import { Spacer } from '../Spacer/Spacer'
import { useTheme } from '../../utils'

// let snackbarOffset: number = 10

type snackbarData = {
  data?: {
    /** true if snackbar represents an error state */
    isError?: boolean
    /** message text A11y label override */
    messageA11y?: string
    /** action button onPress logic for "Try again" (isError=true) or "Undo" button */
    onActionPressed?: () => void
    /** optional custom logic for "Dismiss" button, else just closes snackbar  */
    onDismissPressed?: () => void
  }
}

/** 
 * Structured to allow modification of `react-native-toast-notifications` ToastOptions
 * type, but Snackbar component locks down all non-data options presently
 * 
 * In the future, this may change (e.g. allowing non-indefinite `duration`)
 */
type modifyToastOptions = snackbarData

export type SnackbarType = Omit<ToastType, 'show'> & {
  /** Shows a new toast. Returns id */
  show: (
    message: string | JSX.Element,
    snackbarOptions?: modifyToastOptions | undefined,
  ) => string
}

//
// TODO: May need to move the following doc to the custom render to show in Storybook
//

/**
 * To use SnackbarProvider, your app must have a global.d.ts which you can copy the following into:
 * ```
 * type SnackbarType = import('@department-of-veterans-affairs/mobile-component-library').SnackbarType
 * // eslint-disable-next-line no-var
 * declare var snackbar: SnackbarType
 * ```
 * then add SnackbarProvider in App.tsx (or similar foundational file) level with your app rendering:
 * ```
 * <>
 *   <App />
 *   <SnackbarProvider />
 * </>
 * ```
 *
 * This config will allow it to be called anywhere including outside React components.
 *
 * The Snackbar remains open indefinitely. App configuration should ensure it is dismissed on navigation.
 */
export const SnackbarProvider: React.FC = () => {
  // const forceUpdate = useReducer(x => x + 1, 0)[1]
  // const [offset, setOffset] = useState(10)
  // useEffect(
  //   () => {
  //     if (offset != globalThis.snackbarOffset) {
  //       globalThis.updateSnackbarOffset(globalThis.snackbarOffset)
  //       forceUpdate()
  //       return
  //     }
  //   }, [offset]
  // )

  // useEffect(() =>
  //   AccessibilityInfo.announceForAccessibility('Test announce provider'),
  // )

  return (
    <Toast
      animationDuration={100}
      duration={1000000000000} // Essentially indefinite until dismissed
      offset={50}
      placement="bottom"
      ref={(ref) => ((globalThis.snackbar as ToastContainer | null) = ref)}
      renderToast={(toast) => <Snackbar {...toast} />}
      swipeEnabled={false}
    />
  )
}

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
  const typography = { helperTextBold }

  const getTextStyle = (pressed: boolean): TextStyle => {
    return {
      color: pressed
        ? theme.vadsColorActionForegroundInverseActive
        : theme.vadsColorActionForegroundInverse,
      ...typography.helperTextBold,
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

export type SnackbarProps = Omit<ToastProps, 'data'> & snackbarData

export const Snackbar: FC<SnackbarProps> = (toast) => {
  const fontScale = useWindowDimensions().fontScale
  const theme = useTheme()
  const { t } = useTranslation()
  // const a11yAnnounce =
  //   AccessibilityInfo.announceForAccessibility('Test announce two')

  // useEffect(() => a11yAnnounce, [a11yAnnounce])

  const helperText: TextStyle = {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 16,
    lineHeight: 22,
  }
  const typography = { helperText }

  const sizing = {
    _4: 4,
    _8: 8,
    _12: 12,
    _16: 16,
    _20: 20,
    _24: 24,
  }
  // console.log('offset var: ' + globalThis.snackbarOffset)

  const { isError, messageA11y, onActionPressed, onDismissPressed } =
    toast.data || {}
  const contentColor = theme.vadsColorForegroundInverse

  // if (offset) {
  //   globalThis.snackbarOffset = offset
  // } else {
  //   globalThis.snackbarOffset = 10
  // }

  const containerProps: ViewProps = {
    style: {
      alignItems: 'center',
      backgroundColor: theme.vadsColorSurfaceInverse,
      borderRadius: sizing._4,
      // bottom: 40,
      // flexGrow: 1,
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
      ...typography.helperText,
    },
  }

  const buttonContainer: ViewProps = {
    style: {
      // alignContent: 'flex-end',
      flex: 0,
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginLeft: 'auto', // Maintains alignment to right side
      paddingLeft: sizing._16, // Minimum spacing to message text
      // alignSelf: 'flex-end',
      // justifyContent: 'flex-end'
    },
  }

  const actionButton = () => {
    if (!onActionPressed) return null

    const action =
      onActionPressed ||
      (() => {
        null
      })
    const actionText = isError ? t('tryAgain') : t('undo')

    return (
      <>
        <SnackbarButton text={actionText} onPress={action} />
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
        <SnackbarButton
          text={t('dismiss')}
          onPress={onDismissPressed || toast.onHide}
        />
      </View>
    </View>
  )
}

/**
 * Convenience handling function to show snackbar
 * @param message - message text to display on snackbar
 * @param snackbarData - data to customize snackbar behavior for more than standard dismissible success
 */
export const ShowSnackbar = (message: string, snackbarData?: snackbarData['data']) => {
  snackbar.hideAll() // Remove any existing snackbars
  snackbar.show(message, { data: snackbarData })
}

/**
 * Convenience handling function to close snackbar(s)
 */
export const CloseSnackbar = () => {
  snackbar.hideAll() // Remove any existing snackbars
}

/**
 * Convenience handling function to close snackbar(s) on navigation
 */
export const CloseSnackbarOnNavigation = () => {
  CloseSnackbar()
}
