import { fireEvent, render, screen } from '@testing-library/react-native'
import React from 'react'

import { Icon } from '../Icon/Icon'
import { Snackbar, SnackbarProps } from './Snackbar'

// Set so setTimeout for `announceForAccessibility` doesn't persist rendering after the jest test
jest.useFakeTimers()

const onPressHideSpy = jest.fn()
const onPressActionSpy = jest.fn()
const mockedColorScheme = jest.fn()

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => {
  return {
    default: mockedColorScheme,
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
const getDismissText = () => screen.getByText('Dismiss')
const getIcon = async () => screen.root.findByType(Icon)

describe('Snackbar', () => {
  afterEach(() => {
    onPressHideSpy.mockReset()
    onPressActionSpy.mockReset()
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
