import 'react-native'
import { fireEvent, render, screen } from '@testing-library/react-native'
import React from 'react'
// Note: test renderer must be required after react-native.
import 'jest-styled-components'

import { Alert } from './Alert'
import { Icon } from '../Icon/Icon'
import { Text, View } from 'react-native'

const onExpandSpy = jest.fn()
const onCollapseSpy = jest.fn()
const mockedColorScheme = jest.fn()

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => {
  return {
    default: mockedColorScheme,
  }
})

const children = (
  <View>
    <Text>Sample children content</Text>
  </View>
)

const primaryButtonProps = {
  label: 'Primary test button',
  onPress: () => console.log('primary press'),
  testID: 'primaryButton',
}

const secondaryButtonProps = {
  label: 'Secondary test button',
  onPress: () => console.log('secondary press'),
  testID: 'secondaryButton',
}

const commonProps = {
  header: 'Header text',
  description: 'Description text',
  testID: 'testAlert',
  primaryButton: primaryButtonProps,
  secondaryButton: secondaryButtonProps,
  children,
}

// Helper utils
const getContentStyle = () => screen.getByTestId(commonProps.testID).props.style

const getTextColor = () =>
  screen.getByText(commonProps.header).props.style.color

const getIconName = async () => {
  const icon = await screen.root.findByType(Icon)
  return icon.props.name
}

describe('Button', () => {
  describe('Basic tests', () => {
    render(<Alert {...commonProps} variant="info" />)

    it('initializes correctly', () => {
      expect(screen).toBeTruthy()
    })

    it('should render header and description text', () => {
      render(<Alert {...commonProps} variant="info" />)
      expect(screen.getByText('Header text')).toBeOnTheScreen()
      expect(screen.getByText('Description text')).toBeOnTheScreen()
    })

    it('should render children nested within', () => {
      render(<Alert {...commonProps} variant="info" />)
      expect(screen.getByText('Sample children content')).toBeOnTheScreen()
    })

    it('should render primary and secondary buttons passed', () => {
      render(<Alert {...commonProps} variant="info" />)
      const primaryButton = screen.getByTestId('primaryButton')
      expect(primaryButton).toBeOnTheScreen()
      const secondaryButton = screen.getByTestId('secondaryButton')
      expect(secondaryButton).toBeOnTheScreen()
    })
  })

  describe('Accessibility tests', () => {
    const a11yProps = {
      headerA11yLabel: 'header test a11y label',
      descriptionA11yLabel: 'description test a11y label',
    }

    it('should have headerA11yLabel', () => {
      render(<Alert variant="info" {...a11yProps} {...commonProps} />)
      expect(screen.getByLabelText('header test a11y label')).toBeOnTheScreen()
    })

    it('should have descriptionA11yLabel', () => {
      render(<Alert variant="info" {...a11yProps} {...commonProps} />)
      expect(
        screen.getByLabelText('description test a11y label'),
      ).toBeOnTheScreen()
    })
  })

  describe('Info variant and basic tests', () => {
    describe('Light mode', () => {
      it('should render correct colors and icon', async () => {
        render(<Alert variant="info" {...commonProps} />)

        const { backgroundColor, borderLeftColor } = getContentStyle()
        expect(backgroundColor).toBe('#e1f3f8')
        expect(borderLeftColor).toBe('#28a0cb')
        expect(getTextColor()).toBe('#3d4551')
        expect(await getIconName()).toBe('Info')
      })
    })

    describe('Dark mode', () => {
      it('should render correct colors and icon', async () => {
        mockedColorScheme.mockImplementation(() => 'dark')

        render(<Alert variant="info" {...commonProps} />)
        const { backgroundColor, borderLeftColor } = getContentStyle()
        expect(backgroundColor).toBe('#112f4e')
        expect(borderLeftColor).toBe('#97d4ea')
        expect(await getIconName()).toBe('Info')
        expect(getTextColor()).toBe('#f0f0f0')
      })
    })
  })

  describe('Success variant', () => {
    describe('Light mode', () => {
      it('should render correct colors and icon', async () => {
        mockedColorScheme.mockImplementation(() => 'light')

        render(<Alert variant="success" {...commonProps} />)

        const { backgroundColor, borderLeftColor } = getContentStyle()
        expect(backgroundColor).toBe('#ecf3ec')
        expect(borderLeftColor).toBe('#008817')
        expect(getTextColor()).toBe('#3d4551')
        expect(await getIconName()).toBe('Check')
      })
    })

    describe('Dark mode', () => {
      it('should render correct colors and icon', async () => {
        mockedColorScheme.mockImplementation(() => 'dark')
        render(<Alert variant="success" {...commonProps} />)
        const { backgroundColor, borderLeftColor } = getContentStyle()
        expect(backgroundColor).toBe('#19311e')
        expect(borderLeftColor).toBe('#5e9f69')
        expect(await getIconName()).toBe('Check')
        expect(getTextColor()).toBe('#f0f0f0')
      })
    })
  })

  describe('Warning variant', () => {
    describe('Light mode', () => {
      it('should render correct colors and icon', async () => {
        mockedColorScheme.mockImplementation(() => 'light')

        render(<Alert variant="warning" {...commonProps} />)

        const { backgroundColor, borderLeftColor } = getContentStyle()
        expect(backgroundColor).toBe('#faf3d1')
        expect(borderLeftColor).toBe('#ffbe2e')
        expect(getTextColor()).toBe('#3d4551')
        expect(await getIconName()).toBe('ExclamationTriangle')
      })
    })

    describe('Dark mode', () => {
      it('should render correct colors and icon', async () => {
        mockedColorScheme.mockImplementation(() => 'dark')
        render(<Alert variant="warning" {...commonProps} />)
        const { backgroundColor, borderLeftColor } = getContentStyle()
        expect(backgroundColor).toBe('#5c4809')
        expect(borderLeftColor).toBe('#face00')
        expect(await getIconName()).toBe('ExclamationTriangle')
        expect(getTextColor()).toBe('#f0f0f0')
      })
    })
  })

  describe('Error variant', () => {
    describe('Light mode', () => {
      it('should render correct colors and icon', async () => {
        mockedColorScheme.mockImplementation(() => 'light')

        render(<Alert variant="error" {...commonProps} />)

        const { backgroundColor, borderLeftColor } = getContentStyle()
        expect(backgroundColor).toBe('#f8dfe2')
        expect(borderLeftColor).toBe('#b50909')
        expect(getTextColor()).toBe('#3d4551')
        expect(await getIconName()).toBe('ExclamationCircle')
      })
    })

    describe('Dark mode', () => {
      it('should render correct colors and icon', async () => {
        mockedColorScheme.mockImplementation(() => 'dark')
        render(<Alert variant="error" {...commonProps} />)
        const { backgroundColor, borderLeftColor } = getContentStyle()
        expect(backgroundColor).toBe('#5c1111')
        expect(borderLeftColor).toBe('#d83933')
        expect(await getIconName()).toBe('ExclamationCircle')
        expect(getTextColor()).toBe('#f0f0f0')
      })
    })
  })

  describe('Expandable variant', () => {
    describe('Initialize collapsed', () => {
      it('should initially render header only', async () => {
        render(
          <Alert variant="error" expandable {...commonProps}>
            {children}
          </Alert>,
        )

        // Only header should be visible before press
        expect(screen.getByText('Header text')).toBeOnTheScreen()
        expect(screen.queryByText('Description text')).not.toBeOnTheScreen()
        expect(
          screen.queryByText('Sample children content'),
        ).not.toBeOnTheScreen()
        expect(screen.queryByText('Primary test button')).not.toBeOnTheScreen()
        expect(
          screen.queryByText('Secondary test button'),
        ).not.toBeOnTheScreen()

        fireEvent.press(screen.getByRole('tab'))
        expect(screen.getByText('Header text')).toBeOnTheScreen()
        expect(screen.getByText('Description text')).toBeOnTheScreen()
        expect(screen.getByText('Sample children content')).toBeOnTheScreen()
        expect(screen.getByText('Primary test button')).toBeOnTheScreen()
        expect(screen.getByText('Secondary test button')).toBeOnTheScreen()
      })
    })

    describe('Initialize expanded', () => {
      it('should render expanded', () => {
        render(
          <Alert
            variant="error"
            expandable
            initializeExpanded={true}
            {...commonProps}
          />,
        )

        expect(screen.getByText('Header text')).toBeOnTheScreen()
        expect(screen.getByText('Description text')).toBeOnTheScreen()
        expect(screen.getByText('Sample children content')).toBeOnTheScreen()
        expect(screen.getByText('Primary test button')).toBeOnTheScreen()
        expect(screen.getByText('Secondary test button')).toBeOnTheScreen()

        // Only header should be visible after press
        fireEvent.press(screen.getByRole('tab'))
        expect(screen.getByText('Header text')).toBeOnTheScreen()
        expect(screen.queryByText('Description text')).not.toBeOnTheScreen()
        expect(
          screen.queryByText('Sample children content'),
        ).not.toBeOnTheScreen()
        expect(screen.queryByText('Primary test button')).not.toBeOnTheScreen()
        expect(
          screen.queryByText('Secondary test button'),
        ).not.toBeOnTheScreen()
      })
    })

    describe('Analytics', () => {
      it('should fire analytics events', async () => {
        render(
          <Alert
            variant="error"
            expandable
            analytics={{
              onExpand: onExpandSpy,
              onCollapse: onCollapseSpy,
            }}
            {...commonProps}
          />,
        )

        fireEvent.press(screen.getByRole('tab'))
        expect(onExpandSpy).toHaveBeenCalled()
        fireEvent.press(screen.getByRole('tab'))
        expect(onCollapseSpy).toHaveBeenCalled()
      })
    })
  })
})
