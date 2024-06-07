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

describe('Alert', () => {
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

  const getIconName = async () => {
    const icon = await screen.root.findByType(Icon)
    return icon.props.name
  }

  describe('Basic tests', () => {
    render(<Alert {...commonProps} variant="info" />)

    it('initializes correctly', () => {
      expect(screen.getByTestId('testAlert')).toBeTruthy()
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
      expect(screen.getByTestId('primaryButton')).toBeOnTheScreen()
      expect(screen.getByTestId('secondaryButton')).toBeOnTheScreen()
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

  describe('Info variant', () => {
    describe('Light mode', () => {
      it('should render correct colors and icon', async () => {
        render(<Alert variant="info" {...commonProps} />)

        expect(screen.root).toHaveStyle({
          backgroundColor: '#e7f6f8',
          borderLeftColor: '#00bde3',
        })

        expect(screen.getByText(commonProps.header)).toHaveStyle({
          color: '#1b1b1b',
        })
        expect(await getIconName()).toBe('Info')
      })
    })

    describe('Dark mode', () => {
      it('should render correct colors and icon', async () => {
        mockedColorScheme.mockImplementation(() => 'dark')

        render(<Alert variant="info" {...commonProps} />)

        expect(screen.root).toHaveStyle({
          backgroundColor: '#112f4e',
          borderLeftColor: '#97d4ea',
        })

        expect(screen.getByText(commonProps.header)).toHaveStyle({
          color: '#f0f0f0',
        })

        expect(await getIconName()).toBe('Info')
      })
    })
  })

  describe('Success variant', () => {
    describe('Light mode', () => {
      it('should render correct colors and icon', async () => {
        mockedColorScheme.mockImplementation(() => 'light')

        render(<Alert variant="success" {...commonProps} />)

        expect(screen.root).toHaveStyle({
          backgroundColor: '#ecf3ec',
          borderLeftColor: '#00a91c',
        })

        expect(screen.getByText(commonProps.header)).toHaveStyle({
          color: '#1b1b1b',
        })

        expect(await getIconName()).toBe('CheckCircle')
      })
    })

    describe('Dark mode', () => {
      it('should render correct colors and icon', async () => {
        mockedColorScheme.mockImplementation(() => 'dark')

        render(<Alert variant="success" {...commonProps} />)

        expect(screen.root).toHaveStyle({
          backgroundColor: '#19311e',
          borderLeftColor: '#5e9f69',
        })

        expect(screen.getByText(commonProps.header)).toHaveStyle({
          color: '#f0f0f0',
        })

        expect(await getIconName()).toBe('CheckCircle')
      })
    })
  })

  describe('Warning variant', () => {
    describe('Light mode', () => {
      it('should render correct colors and icon', async () => {
        mockedColorScheme.mockImplementation(() => 'light')

        render(<Alert variant="warning" {...commonProps} />)

        expect(screen.root).toHaveStyle({
          backgroundColor: '#faf3d1',
          borderLeftColor: '#ffbe2e',
        })

        expect(screen.getByText(commonProps.header)).toHaveStyle({
          color: '#1b1b1b',
        })

        expect(await getIconName()).toBe('Warning')
      })
    })

    describe('Dark mode', () => {
      it('should render correct colors and icon', async () => {
        mockedColorScheme.mockImplementation(() => 'dark')

        render(<Alert variant="warning" {...commonProps} />)

        expect(screen.root).toHaveStyle({
          backgroundColor: '#422d19',
          borderLeftColor: '#face00',
        })

        expect(screen.getByText(commonProps.header)).toHaveStyle({
          color: '#f0f0f0',
        })

        expect(await getIconName()).toBe('Warning')
      })
    })
  })

  describe('Error variant', () => {
    describe('Light mode', () => {
      it('should render correct colors and icon', async () => {
        mockedColorScheme.mockImplementation(() => 'light')

        render(<Alert variant="error" {...commonProps} />)

        expect(screen.root).toHaveStyle({
          backgroundColor: '#f4e3db',
          borderLeftColor: '#d54309',
        })

        expect(screen.getByText(commonProps.header)).toHaveStyle({
          color: '#1b1b1b',
        })

        expect(await getIconName()).toBe('Error')
      })
    })

    describe('Dark mode', () => {
      it('should render correct colors and icon', async () => {
        mockedColorScheme.mockImplementation(() => 'dark')

        render(<Alert variant="error" {...commonProps} />)

        expect(screen.root).toHaveStyle({
          backgroundColor: '#5c1111',
          borderLeftColor: '#d83933',
        })

        expect(screen.getByText(commonProps.header)).toHaveStyle({
          color: '#f0f0f0',
        })

        expect(await getIconName()).toBe('Error')
      })
    })
  })

  describe('Expandable variant', () => {
    describe('Initialize collapsed', () => {
      it('should initially render header only', async () => {
        render(<Alert variant="error" expandable {...commonProps} />)

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

      it('should render everything after press', () => {
        render(<Alert variant="error" expandable {...commonProps} />)

        fireEvent.press(screen.getByRole('tab'))
        expect(screen.getByText('Header text')).toBeOnTheScreen()
        expect(screen.getByText('Description text')).toBeOnTheScreen()
        expect(screen.getByText('Sample children content')).toBeOnTheScreen()
        expect(screen.getByText('Primary test button')).toBeOnTheScreen()
        expect(screen.getByText('Secondary test button')).toBeOnTheScreen()
      })
    })

    describe('Initialize expanded', () => {
      it('should render everything when initializeExpanded is set to true', () => {
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
      })

      it('should render only the header after being collapsed', () => {
        render(
          <Alert
            variant="error"
            expandable
            initializeExpanded={true}
            {...commonProps}
          />,
        )

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
