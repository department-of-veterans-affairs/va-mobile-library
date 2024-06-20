import 'react-native'
import { render, screen } from '@testing-library/react-native'
import React from 'react'
// Note: test renderer must be required after react-native.
import 'jest-styled-components'

import { Icon } from '../Icon/Icon'
import { LoadingIndicator, LoadingIndicatorProps } from './LoadingIndicator'
import { Spacer } from '../Spacer/Spacer'
import { Text, View } from 'react-native'

// Set so Animated.timing() doesn't persist rendering after the jest test
jest.useFakeTimers()

const mockedColorScheme = jest.fn()

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => {
  return {
    default: mockedColorScheme,
  }
})

describe('Loading indicator', () => {
  const commonProps: LoadingIndicatorProps = {
    text: 'Loading indicator text',
    a11yLabel: 'a11y label',
  }
  const children = (
    <View>
      <Text>Children content</Text>
    </View>
  )

  const getIcon = async () => {
    return screen.root.findByType(Icon)
  }

  const getSpacers = async () => {
    return screen.root.findAllByType(Spacer)
  }

  describe('Basic tests', () => {
    it('initializes correctly', () => {
      render(<LoadingIndicator {...commonProps} />)

      expect(screen.getByText('Loading indicator text')).toBeTruthy()
    })

    it('should render text', () => {
      render(<LoadingIndicator {...commonProps} />)

      expect(screen.getByText('Loading indicator text')).toBeOnTheScreen()
    })

    it('should render LoadingIndicator icon with 50x50 width/height', async () => {
      render(<LoadingIndicator {...commonProps} />)

      const icon = await getIcon()

      expect(icon.props.name).toBe('LoadingIndicator')
      expect(icon.props.height).toBe(50)
      expect(icon.props.width).toBe(50)
    })
  })

  describe('Accessibility', () => {
    it('should have text a11yLabel', () => {
      render(<LoadingIndicator {...commonProps} />)

      expect(screen.getByLabelText('a11y label')).toBeOnTheScreen()
    })
  })

  describe('Light mode', () => {
    it('should render correct colors', async () => {
      render(<LoadingIndicator {...commonProps} />)

      const icon = await getIcon()

      expect(screen.getByText(commonProps.text)).toHaveStyle({
        color: '#1b1b1b',
      })
      expect(icon.props.fill).toBe('#005ea2')
    })
  })

  describe('Dark mode', () => {
    it('should render correct colors', async () => {
      mockedColorScheme.mockImplementation(() => 'dark')

      render(<LoadingIndicator {...commonProps} />)

      const icon = await getIcon()

      expect(screen.getByText(commonProps.text)).toHaveStyle({
        color: '#f0f0f0',
      })
      expect(icon.props.fill).toBe('#58b4ff')
    })
  })

  describe('Children tests', () => {
    it('should render with just children', async () => {
      render(<LoadingIndicator children={children} />)

      const spacers = await getSpacers()

      expect(screen.getByText('Children content')).toBeOnTheScreen()
      expect(screen.queryByText('Loading indicator text')).not.toBeOnTheScreen()
      expect(spacers.length).toBe(1) // Just Spacer between icon and children
    })

    it('should render with both text and children', async () => {
      render(<LoadingIndicator {...commonProps} children={children} />)

      const spacers = await getSpacers()

      expect(screen.getByText('Children content')).toBeOnTheScreen()
      expect(screen.getByText('Loading indicator text')).toBeOnTheScreen()
      expect(spacers.length).toBe(2) // Spacers between icon/text + text/children
    })

    it('should render without children', async () => {
      render(<LoadingIndicator {...commonProps} />)

      const spacers = await getSpacers()

      expect(screen.queryByText('Children content')).not.toBeOnTheScreen()
      expect(screen.getByText('Loading indicator text')).toBeOnTheScreen()
      expect(spacers.length).toBe(1) // Just Spacer between icon and text
    })
  })
})
