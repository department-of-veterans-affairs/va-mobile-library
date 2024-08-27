import {
  fireEvent,
  render,
  renderHook,
  screen,
  userEvent,
} from '@testing-library/react-native'
import React from 'react'
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { Snackbar, SnackbarProps } from './Snackbar'
import { SnackbarProvider } from './SnackbarProvider'
import { ToastProvider } from 'react-native-toast-notifications'
import { useSnackbar } from './useSnackbar'

// Set so setTimeout for `announceForAccessibility` doesn't persist rendering after the jest test
jest.useFakeTimers()

/** Tests
 * - Snackbar UI
 *    - Standard happy path CHECK
 *    - Light/dark CHECK
 *    - Action button w/ and w/o error CHECK
 *    - Accessibility labels/roles CHECK
 * - SnackbarProvider
 *    - Appears at all CHECK
 *    - default offset CHECK
 *    - custom offset CHECK
 *    - Mocked insets CHECK
 *    - Screen reader auto-dismiss
 *    - errors CHECK
 *        - Trying to use w/o library IMPOSSIBLE
 *        - Trying to use w/o insets CHECK
 *        - Trying to use `useSnackbar` hook without provider CHECK
 */

const onPressHideSpy = jest.fn()
const onPressActionSpy = jest.fn()
const mockedColorScheme = jest.fn()
const mockedUseSafeAreaInsets = jest.fn(mockSafeAreaContext.useSafeAreaInsets)

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => {
  return {
    default: mockedColorScheme,
  }
})

jest.mock('react-native-safe-area-context', () => {
  return {
    ...mockSafeAreaContext,
    useSafeAreaInsets: () => mockedUseSafeAreaInsets(),
  }
})

const commonProps: SnackbarProps = {
  message: 'Test Snackbar Text',
  data: {
    isError: false,
    messageA11y: 'message a11y',
    onActionPressed: onPressActionSpy,
  },
  onHide: onPressHideSpy,
}

const errorProps: SnackbarProps = {
  ...commonProps,
  data: {
    ...commonProps.data,
    isError: true,
  },
}

const getMessageText = () => screen.getByText(commonProps.message)
const queryMessageText = () => screen.queryByText(commonProps.message)
const getDismissText = () => screen.getByText('Dismiss')
const getIcon = async () => await screen.root.findByType(Icon)

// jest.spyOn('react-native-safe-area-context', 'useSafeAreaInsets()', 'get')

// jest.mock('react-native-safe-area-context', () =>
//   jest.fn(() => {
//     return {
//       ...mockSafeAreaContext,
//       useSafeAreaInsets: mockedUseSafeAreaInsets,
//     }
//   }),
// )

// Mock the internal function call within the useExternalSnackbar hook
// const useExternalSnackbarHookMock = jest.fn(
//   (url: string, analytics?: SnackbarAnalytics, text?: utils.leaveAppPromptText) => {
//     url
//     analytics
//     text
//   },
// )
// Mock the useExternalSnackbar hook to leverage mock implementation
// jest.spyOn(utils, 'useExternalSnackbar').mockImplementation(() => {
//   return useExternalSnackbarHookMock
// })

describe('Snackbar', () => {
  afterEach(() => {
    onPressHideSpy.mockReset()
    onPressActionSpy.mockReset()
    // useExternalSnackbarHookMock.mockReset()
  })

  describe('Basic UI tests', () => {
    it('initializes correctly with `message` text', () => {
      render(<Snackbar {...commonProps} />)

      expect(getMessageText()).toBeOnTheScreen()
    })

    it('renders the `Dismiss` button text', () => {
      render(<Snackbar {...commonProps} />)

      expect(getDismissText()).toBeOnTheScreen()
    })

    it('calls onHide when `Dismiss` tapped', () => {
      render(<Snackbar {...commonProps} />)
      fireEvent.press(getDismissText())

      expect(onPressHideSpy).toHaveBeenCalled()
      expect(onPressActionSpy).not.toHaveBeenCalled()
    })

    it('renders default `CheckCircle` icon', async () => {
      render(<Snackbar {...commonProps} />)
      const icon = await getIcon()

      expect(icon).toBeDefined()
      expect(icon.props.name).toBe('CheckCircle')
    })
  })

  describe('Light mode', () => {
    it('renders background color', () => {
      render(<Snackbar {...commonProps} />)

      expect(screen.root).toHaveStyle({ backgroundColor: '#1b1b1b' })
    })

    it('renders `message` text and icon color', () => {
      render(<Snackbar {...commonProps} />)

      expect(getMessageText()).toHaveStyle({ color: '#f0f0f0' })
    })

    it('renders button text color', () => {
      render(<Snackbar {...commonProps} />)

      expect(getDismissText()).toHaveStyle({ color: '#ffffff' })
    })

    it('renders alternate button text color when pressed', () => {
      render(<Snackbar {...commonProps} />)
      const longPress = getDismissText()
      fireEvent(longPress, 'onResponderGrant', {
        persist: jest.fn(),
        nativeEvent: {
          timestamp: Date.now(),
        },
      })

      expect(longPress).toHaveStyle({ color: '#a9aeb1' })
    })
  })

  describe('Dark mode', () => {
    beforeAll(() => mockedColorScheme.mockImplementation(() => 'dark'))

    afterAll(() => mockedColorScheme.mockReset())

    it('renders background color', () => {
      render(<Snackbar {...commonProps} />)

      expect(screen.root).toHaveStyle({ backgroundColor: '#f0f0f0' })
    })

    it('renders `message` text and icon color', () => {
      render(<Snackbar {...commonProps} />)

      expect(getMessageText()).toHaveStyle({ color: '#1b1b1b' })
    })

    it('renders button text color', () => {
      render(<Snackbar {...commonProps} />)

      expect(getDismissText()).toHaveStyle({ color: '#000000' })
    })

    it('renders alternate button text color when pressed', () => {
      render(<Snackbar {...commonProps} />)
      const longPress = getDismissText()
      fireEvent(longPress, 'onResponderGrant', {
        persist: jest.fn(),
        nativeEvent: {
          timestamp: Date.now(),
        },
      })

      expect(longPress).toHaveStyle({ color: '#565c65' })
    })
  })

  describe('Action button', () => {
    it('renders `Undo` button by default', () => {
      render(<Snackbar {...commonProps} />)

      expect(screen.getByText('Undo')).toBeOnTheScreen()
      expect(screen.queryByText('Try again')).not.toBeOnTheScreen()
    })

    it('renders `CheckCircle` icon by default', async () => {
      render(<Snackbar {...commonProps} />)
      const icon = await getIcon()

      expect(icon).toBeDefined()
      expect(icon.props.name).toBe('CheckCircle')
    })

    it('error renders `Try again` button', () => {
      render(<Snackbar {...errorProps} />)

      expect(screen.getByText('Try again')).toBeOnTheScreen()
      expect(screen.queryByText('Undo')).not.toBeOnTheScreen()
    })

    it('error renders `Warning` icon', async () => {
      render(<Snackbar {...errorProps} />)
      const icon = await getIcon()

      expect(icon).toBeDefined()
      expect(icon.props.name).toBe('Warning')
    })

    it('calls action button and onHide logic when pressed', () => {
      render(<Snackbar {...commonProps} />)
      fireEvent.press(getDismissText())

      expect(onPressHideSpy).toHaveBeenCalledTimes(1)
      expect(onPressActionSpy).toHaveBeenCalledTimes(0)

      fireEvent.press(screen.getByText('Undo'))

      expect(onPressHideSpy).toHaveBeenCalledTimes(2)
      expect(onPressActionSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('message has aria-label override when present', () => {
      render(<Snackbar {...commonProps} />)

      expect(getMessageText()).toHaveAccessibleName('message a11y')
    })

    it('message defers to text displayed when no aria-label', () => {
      render(<Snackbar {...commonProps} data={{}} />)

      expect(getMessageText()).not.toHaveAccessibleName('message a11y')
      expect(getMessageText()).toHaveAccessibleName('Test Snackbar Text')
    })

    it('Snackbar has `alert` accessibility role', () => {
      render(<Snackbar {...commonProps} />)

      expect(screen.getByRole('alert')).toBeOnTheScreen()
    })

    it('buttons have `button` accessibility role', () => {
      render(<Snackbar {...commonProps} />)

      expect(screen.getAllByRole('button').length).toEqual(2)
    })
  })
})

describe('Snackbar Provider', () => {
  const openSnackbarButtonLabel = 'Press for Snackbar'
  const CustomRender: React.FC = () => {
    const { show } = useSnackbar()

    return (
      <Button
        label={openSnackbarButtonLabel}
        onPress={() => show(commonProps.message, commonProps.data)}
      />
    )
  }

  const getOpenSnackbarText = () => screen.getByText(openSnackbarButtonLabel)

  describe('Errors', () => {
    // @ts-ignore - Intentionally setting invalid value to validate no insets defined
    mockedUseSafeAreaInsets.mockImplementationOnce(() => undefined)
    it('should error to try useSnackbar w/o SafeAreaProvider', () => {
      try {
        renderHook(() => useSnackbar())
      } catch (e) {
        const error = e as Error
        expect(error.message).toEqual(
          'useSnackbarDefaultOffset must be used within a SafeAreaProvider. Use SnackbarProviderWithSafeArea or add a SafeAreaProvider with react-native-safe-area-context.',
        )
      }
    })

    it('should error to try useSnackbar w/o SnackbarProvider', () => {
      try {
        renderHook(() => useSnackbar())
      } catch (e) {
        const error = e as Error
        expect(error.message).toEqual(
          'useSnackbar must be used within a SnackbarProvider',
        )
      }
    })
  })

  describe('Basic Provider tests', () => {
    it('should open the Snackbar on press', async () => {
      render(<CustomRender />, { wrapper: SnackbarProvider })

      expect(getOpenSnackbarText()).toBeOnTheScreen()
      expect(queryMessageText()).not.toBeOnTheScreen()

      await userEvent.press(getOpenSnackbarText())

      expect(getMessageText()).toBeOnTheScreen()
    })

    it('`Dismiss` press should dismiss the Snackbar', async () => {
      render(<CustomRender />, { wrapper: SnackbarProvider })

      expect(getOpenSnackbarText()).toBeOnTheScreen()
      expect(queryMessageText()).not.toBeOnTheScreen()

      await userEvent.press(getOpenSnackbarText())

      expect(getMessageText()).toBeOnTheScreen()

      await userEvent.press(screen.getByText('Dismiss'))

      expect(queryMessageText()).not.toBeOnTheScreen()
    })

    it('`Undo` press should dismiss the Snackbar and call action button logic', async () => {
      render(<CustomRender />, { wrapper: SnackbarProvider })

      expect(getOpenSnackbarText()).toBeOnTheScreen()
      expect(queryMessageText()).not.toBeOnTheScreen()

      await userEvent.press(getOpenSnackbarText())

      expect(getMessageText()).toBeOnTheScreen()
      expect(onPressActionSpy).not.toHaveBeenCalled()

      await userEvent.press(screen.getByText('Undo'))

      expect(queryMessageText()).not.toBeOnTheScreen()
      expect(onPressActionSpy).toHaveBeenCalled()
    })
  })

  const getToastProvider = async () =>
    await screen.UNSAFE_root.findByType(ToastProvider)

  describe('Offset', () => {
    it('should have a default offset of 60', async () => {
      const mockInsets = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }
      mockedUseSafeAreaInsets.mockImplementation(() => mockInsets)
      render(<CustomRender />, { wrapper: SnackbarProvider })
      // const view = render(<CustomRender />, { wrapper: SnackbarProvider })

      expect(getOpenSnackbarText()).toBeOnTheScreen()
      expect(queryMessageText()).not.toBeOnTheScreen()

      await userEvent.press(getOpenSnackbarText())

      expect((await getToastProvider()).props.offset).toEqual(60)

      // expect(screen.UNSAFE_getByProps({ offset: 60 })) // IMPROVED PROTOTYPE WINNER

      // const hello = within(screen.UNSAFE_root).UNSAFE_queryAllByProps({
      //   bottom: 0,
      // })

      // view.debug()
      // screen.debug()
      // expect(screen.UNSAFE_root.props).toEqual('test') // yields customRender as children
      // @ts-ignore
      // expect(screen.UNSAFE_root._fiber.child.pendingProps.children.props.offset).toEqual(60) PROTOTYPE WINNER
      // prettier-ignore
      // expect(screen.root.parent?.parent?.parent?.parent?.parent?.parent?.parent?.memoizedState).toEqual(
      //   'test',
      // )
      // expect(screen.getByTestId('TestingComponent')).toEqual('test')

      // const fOffPrettier =
      //   getMessageText().parent?.parent?.parent?.parent?.parent?.parent
      // expect(
      //   fOffPrettier?.parent?.parent?.parent?.parent?.parent?.props,
      // ).toEqual('test')
      // expect(screen.UNSAFE_queryByProps({ offset: 60 })).toBeTruthy()
      // expect((await getSnackbarProvider()).props).toEqual('test')

      // Cleanup mock
      mockedUseSafeAreaInsets.mockReset()
    })

    it('should have a default offset of 60', async () => {
      const mockInsets = {
        top: 0,
        right: 0,
        bottom: 34,
        left: 0,
      }
      mockedUseSafeAreaInsets.mockImplementation(() => mockInsets)
      render(<CustomRender />, { wrapper: SnackbarProvider })

      expect(getOpenSnackbarText()).toBeOnTheScreen()
      expect(queryMessageText()).not.toBeOnTheScreen()

      await userEvent.press(getOpenSnackbarText())

      expect((await getToastProvider()).props.offset).toEqual(94)

      // Cleanup mock
      mockedUseSafeAreaInsets.mockReset()
    })
  })
})
