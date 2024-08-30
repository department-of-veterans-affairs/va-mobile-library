import { ToastProvider } from 'react-native-toast-notifications'
import {
  act,
  render,
  renderHook,
  screen,
  userEvent,
} from '@testing-library/react-native'
import React from 'react'
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock'

import { AccessibilityInfo } from 'react-native'
import { Button } from '../Button/Button'
import { SnackbarProps } from './Snackbar'
import { SnackbarProvider } from './SnackbarProvider'
import { useSnackbar } from './useSnackbar'

// Set so setTimeout for `announceForAccessibility` doesn't persist rendering after the jest test
jest.useFakeTimers()

const onPressActionSpy = jest.fn()
const mockedUseSafeAreaInsets = jest.fn(mockSafeAreaContext.useSafeAreaInsets)
const mockedScreenReaderEnabled = jest.fn(() => false)

jest.mock('react-native-safe-area-context', () => {
  return {
    ...mockSafeAreaContext,
    useSafeAreaInsets: () => mockedUseSafeAreaInsets(),
  }
})

jest.mock('../../utils/index', () => {
  return {
    ...jest.requireActual('../../utils/index'), // Don't mock other utils
    useIsScreenReaderEnabled: () => mockedScreenReaderEnabled,
  }
})

const errorSpy = jest.spyOn(console, 'error')
const announceSpy = jest.spyOn(AccessibilityInfo, 'announceForAccessibility')

const commonProps: Omit<SnackbarProps, 'onHide'> = {
  message: 'Test Snackbar Text',
  data: {
    isError: false,
    messageA11y: 'message a11y',
    onActionPressed: onPressActionSpy,
  },
}

const openSnackbarButtonLabel = 'Press for Snackbar'
const getOpenSnackbarText = () => screen.getByText(openSnackbarButtonLabel)
const getMessageText = () => screen.getByText(commonProps.message)
const queryMessageText = () => screen.queryByText(commonProps.message)
const getToastProvider = async () =>
  screen.UNSAFE_root.findByType(ToastProvider)

const CustomRender: React.FC<{ noAction?: boolean }> = (props) => {
  const { show } = useSnackbar()
  const noAction = props.noAction

  if (noAction) {
    return (
      <Button
        label={openSnackbarButtonLabel}
        onPress={() => show(commonProps.message)}
      />
    )
  }

  return (
    <Button
      label={openSnackbarButtonLabel}
      onPress={() => show(commonProps.message, commonProps.data)}
    />
  )
}

describe('Snackbar Provider', () => {
  describe('Errors', () => {
    // Override to suppress React render error logging, intentionally erroneous component render
    beforeEach(() => errorSpy.mockImplementationOnce(jest.fn()))

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
      expect(onPressActionSpy).not.toHaveBeenCalled()

      await userEvent.press(screen.getByText('Dismiss'))

      expect(queryMessageText()).not.toBeOnTheScreen()
      expect(onPressActionSpy).not.toHaveBeenCalled()
    })

    it('`Undo` should call action button logic and dismiss the Snackbar', async () => {
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

  describe('Offset', () => {
    it('should have a default offset of 60', async () => {
      render(<CustomRender />, { wrapper: SnackbarProvider })

      expect((await getToastProvider()).props.offset).toEqual(60)
    })

    it('should have an inset-adjusted offset of 94', async () => {
      const mockInsets = {
        top: 0,
        right: 0,
        bottom: 34,
        left: 0,
      }
      mockedUseSafeAreaInsets.mockImplementation(() => mockInsets)

      render(<CustomRender />, { wrapper: SnackbarProvider })

      expect((await getToastProvider()).props.offset).toEqual(94)

      // Cleanup mock
      mockedUseSafeAreaInsets.mockClear()
    })

    it('should have a custom offset when set', async () => {
      const view = renderHook(() => useSnackbar(), {
        wrapper: SnackbarProvider,
      })

      act(() => view.result.current.show(commonProps.message, { offset: 30 }))

      expect((await getToastProvider()).props.offset).toEqual(30)
    })

    // Separate test to validate falsy number 0
    it('should have a custom offset of 0 when set to 0', async () => {
      const view = renderHook(() => useSnackbar(), {
        wrapper: SnackbarProvider,
      })

      act(() => view.result.current.show(commonProps.message, { offset: 0 }))

      expect((await getToastProvider()).props.offset).toEqual(0)
    })
  })

  describe('Screen reader', () => {
    // const indefinite = 1000000000000

    // const tick = () =>
    //   new Promise((resolve) =>
    //     jest.requireActual('timers').setImmediate(resolve),
    //   )
    // const indefinite = Number.POSITIVE_INFINITY

    // it('should render indefinitely when off', async () => {
    //   const view = renderHook(() => useSnackbar(), {
    //     wrapper: SnackbarProvider,
    //   })

    //   view.result.current.show(commonProps.message)

    //   expect((await getToastProvider()).props.duration).toEqual(indefinite)
    //   expect(queryMessageText()).toBeOnTheScreen()
    // })

    // jest.setTimeout(10000)
    // // jest.clearAllTimers()
    // jest.useFakeTimers({ advanceTimers: 20 })
    // it('should render indefinitely with an action', async () => {
    //   console.log(jest.now())
    //   // jest.clearAllTimers()
    //   // jest.useRealTimers()
    //   // jest.useFakeTimers({ doNotFake: ['setTimeout'] })
    //   // jest.useFakeTimers({ advanceTimers: true })
    //   // jest.setTimeout(10000)
    //   mockedScreenReaderEnabled.mockImplementation(() => true)
    //   // const view = renderHook(() => useSnackbar(), {
    //   //   wrapper: SnackbarProvider,
    //   // })

    //   // view.result.current.show(commonProps.message, commonProps.data)

    //   render(<CustomRender />, { wrapper: SnackbarProvider })

    //   expect(getOpenSnackbarText()).toBeOnTheScreen()
    //   expect(queryMessageText()).not.toBeOnTheScreen()

    //   await userEvent.press(getOpenSnackbarText())
    //   // @ts-ignore
    //   // const user = userEvent.setup({ delay: null })
    //   // const user = userEvent.setup({ delay: null, advanceTimers: () => null })
    //   // await act(async () => await userEvent.press(getOpenSnackbarText()))
    //   // await user.press(getOpenSnackbarText())
    //   // screen.debug()

    //   expect((await getToastProvider()).props.duration).toEqual(indefinite)
    //   expect(queryMessageText()).toBeOnTheScreen()

    //   screen.debug('2nd time')
    //   console.log(jest.getTimerCount())
    //   const first = jest.now()
    //   console.log(first)

    //   // await act(async () => await jest.advanceTimersByTimeAsync(1000))
    //   // await jest.advanceTimersByTimeAsync(1000)
    //   act(() => jest.advanceTimersByTime(4000))
    //   // await tick()
    //   // act(() => {
    //   //   jest.advanceTimersByTime(10000)
    //   // })
    //   // jest.runAllTimers()
    //   screen.debug('3rd time')
    //   console.log(jest.getTimerCount())
    //   console.log(jest.now())
    //   console.log(jest.now() - first)

    //   expect(queryMessageText()).toBeOnTheScreen()

    //   act(() => jest.advanceTimersByTime(4000))

    //   expect(queryMessageText()).toBeOnTheScreen()

    //   jest.useFakeTimers()
    // })

    it('should render for 5 seconds without an action', async () => {
      mockedScreenReaderEnabled.mockImplementation(() => true)
      render(<CustomRender noAction={true} />, { wrapper: SnackbarProvider })

      expect(getOpenSnackbarText()).toBeOnTheScreen()
      expect(queryMessageText()).not.toBeOnTheScreen()

      await userEvent.press(getOpenSnackbarText())

      expect(queryMessageText()).toBeOnTheScreen()

      act(() => jest.advanceTimersByTime(4000))

      expect(queryMessageText()).toBeOnTheScreen() // Still on screen after 4 seconds

      act(() => jest.advanceTimersByTime(2000))

      expect(queryMessageText()).not.toBeOnTheScreen() // No longer on screen after 6 seconds
    })
  })

  describe('Accessibility', () => {
    beforeEach(() => {
      announceSpy.mockClear()
    })

    it('should call announceForAccessibility 50ms after Snackbar appearance', async () => {
      render(<CustomRender />, { wrapper: SnackbarProvider })

      expect(getOpenSnackbarText()).toBeOnTheScreen()
      expect(queryMessageText()).not.toBeOnTheScreen()
      expect(announceSpy).not.toHaveBeenCalled()

      await userEvent.press(getOpenSnackbarText())

      expect(queryMessageText()).toBeOnTheScreen()
      expect(announceSpy).not.toHaveBeenCalled()

      act(() => jest.advanceTimersByTime(50)) // 50ms delay to announcement

      expect(queryMessageText()).toBeOnTheScreen()
      expect(announceSpy).toHaveBeenCalled()
      expect(announceSpy).toHaveBeenCalledWith('message a11y')
    })
  })
})
