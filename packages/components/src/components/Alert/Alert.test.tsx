import 'react-native'
import { RenderAPI, fireEvent, render } from '@testing-library/react-native'
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

describe('Button', () => {
  let component: RenderAPI

  const headerText = 'Header text'
  const descriptionText = 'Description text'
  const testID = 'testAlert'
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

  const getContentStyle = (element: RenderAPI) =>
    element.getByTestId(testID).props.style
  const getTextColor = (element: RenderAPI) =>
    element.getByText(headerText).props.style.color
  const getIconName = (element: RenderAPI) =>
    element.root.findByType(Icon).props.name

  describe('Basic tests', () => {
    beforeEach(() => {
      component = render(
        <Alert
          variant="info"
          header={headerText}
          description={descriptionText}
          testID={testID}
          primaryButton={primaryButtonProps}
          secondaryButton={secondaryButtonProps}>
          {children}
        </Alert>,
      )
    })

    it('initializes correctly', () => {
      expect(component).toBeTruthy()
    })

    it('should render header and description text', () => {
      expect(component.queryByText('Header text')).toBeTruthy()
      expect(component.queryByText('Description text')).toBeTruthy()
    })

    it('should render children nested within', () => {
      expect(component.queryByText('Sample children content')).toBeTruthy()
    })

    it('should render primary and secondary buttons passed', async () => {
      const primaryButton = await component.findByTestId('primaryButton')
      expect(primaryButton).toBeTruthy()
      const secondaryButton = await component.findByTestId('secondaryButton')
      expect(secondaryButton).toBeTruthy()
    })
  })

  describe('Info variant and basic tests', () => {
    describe('Light mode', () => {
      it('should render correct colors and icon', () => {
        component = render(
          <Alert variant="info" header={headerText} testID={testID} />,
        )

        const { backgroundColor, borderLeftColor } = getContentStyle(component)
        expect(backgroundColor).toBe('#e1f3f8')
        expect(borderLeftColor).toBe('#28a0cb')
        expect(getTextColor(component)).toBe('#3d4551')
        expect(getIconName(component)).toBe('Info')
      })
    })

    describe('Dark mode', () => {
      it('should render correct colors and icon', () => {
        mockedColorScheme.mockImplementation(() => 'dark')

        component = render(
          <Alert variant="info" header={headerText} testID={testID} />,
        )
        const { backgroundColor, borderLeftColor } = getContentStyle(component)
        expect(backgroundColor).toBe('#112f4e')
        expect(borderLeftColor).toBe('#97d4ea')
        expect(getIconName(component)).toBe('Info')
        expect(getTextColor(component)).toBe('#f0f0f0')
      })
    })
  })

  describe('Success variant', () => {
    describe('Light mode', () => {
      it('should render correct colors and icon', () => {
        mockedColorScheme.mockImplementation(() => 'light')

        component = render(
          <Alert variant="success" header={headerText} testID={testID} />,
        )

        const { backgroundColor, borderLeftColor } = getContentStyle(component)
        expect(backgroundColor).toBe('#ecf3ec')
        expect(borderLeftColor).toBe('#008817')
        expect(getTextColor(component)).toBe('#3d4551')
        expect(getIconName(component)).toBe('Check')
      })
    })

    describe('Dark mode', () => {
      it('should render correct colors and icon', () => {
        mockedColorScheme.mockImplementation(() => 'dark')
        component = render(
          <Alert variant="success" header={headerText} testID={testID} />,
        )
        const { backgroundColor, borderLeftColor } = getContentStyle(component)
        expect(backgroundColor).toBe('#19311e')
        expect(borderLeftColor).toBe('#5e9f69')
        expect(getIconName(component)).toBe('Check')
        expect(getTextColor(component)).toBe('#f0f0f0')
      })
    })
  })

  describe('Warning variant', () => {
    describe('Light mode', () => {
      it('should render correct colors and icon', () => {
        mockedColorScheme.mockImplementation(() => 'light')

        component = render(
          <Alert variant="warning" header={headerText} testID={testID} />,
        )

        const { backgroundColor, borderLeftColor } = getContentStyle(component)
        expect(backgroundColor).toBe('#faf3d1')
        expect(borderLeftColor).toBe('#ffbe2e')
        expect(getTextColor(component)).toBe('#3d4551')
        expect(getIconName(component)).toBe('ExclamationTriangle')
      })
    })

    describe('Dark mode', () => {
      it('should render correct colors and icon', () => {
        mockedColorScheme.mockImplementation(() => 'dark')
        component = render(
          <Alert variant="warning" header={headerText} testID={testID} />,
        )
        const { backgroundColor, borderLeftColor } = getContentStyle(component)
        expect(backgroundColor).toBe('#5c4809')
        expect(borderLeftColor).toBe('#face00')
        expect(getIconName(component)).toBe('ExclamationTriangle')
        expect(getTextColor(component)).toBe('#f0f0f0')
      })
    })
  })

  describe('Error variant', () => {
    describe('Light mode', () => {
      it('should render correct colors and icon', () => {
        mockedColorScheme.mockImplementation(() => 'light')

        component = render(
          <Alert variant="error" header={headerText} testID={testID} />,
        )

        const { backgroundColor, borderLeftColor } = getContentStyle(component)
        expect(backgroundColor).toBe('#f8dfe2')
        expect(borderLeftColor).toBe('#b50909')
        expect(getTextColor(component)).toBe('#3d4551')
        expect(getIconName(component)).toBe('ExclamationCircle')
      })
    })

    describe('Dark mode', () => {
      it('should render correct colors and icon', () => {
        mockedColorScheme.mockImplementation(() => 'dark')
        component = render(
          <Alert variant="error" header={headerText} testID={testID} />,
        )
        const { backgroundColor, borderLeftColor } = getContentStyle(component)
        expect(backgroundColor).toBe('#5c1111')
        expect(borderLeftColor).toBe('#d83933')
        expect(getIconName(component)).toBe('ExclamationCircle')
        expect(getTextColor(component)).toBe('#f0f0f0')
      })
    })
  })

  describe('Expandable variant', () => {
    describe('Initialize collapsed', () => {
      beforeEach(() => {
        component = render(
          <Alert
            variant="error"
            header={headerText}
            description={descriptionText}
            expandable
            primaryButton={primaryButtonProps}
            secondaryButton={secondaryButtonProps}>
            {children}
          </Alert>,
        )
      })

      it('should initially render header only', async () => {
        // Only header should be visible before press
        expect(component.queryByText('Header text')).toBeTruthy()
        expect(component.queryByText('Description text')).toBeNull()
        expect(component.queryByText('Sample children content')).toBeNull()
        expect(component.queryByText('Primary test button')).toBeNull()
        expect(component.queryByText('Secondary test button')).toBeNull()

        fireEvent.press(component.getByRole('tab'))
        expect(component.queryByText('Header text')).toBeTruthy()
        expect(component.queryByText('Description text')).toBeTruthy()
        expect(component.queryByText('Sample children content')).toBeTruthy()
        expect(component.queryByText('Primary test button')).toBeTruthy()
        expect(component.queryByText('Secondary test button')).toBeTruthy()
      })
    })

    describe('Initialize expanded', () => {
      it('should render expanded', () => {
        component = render(
          <Alert
            variant="error"
            header={headerText}
            description={descriptionText}
            expandable
            initializeExpanded={true}
            primaryButton={primaryButtonProps}
            secondaryButton={secondaryButtonProps}>
            {children}
          </Alert>,
        )

        expect(component.queryByText('Header text')).toBeTruthy()
        expect(component.queryByText('Description text')).toBeTruthy()
        expect(component.queryByText('Sample children content')).toBeTruthy()
        expect(component.queryByText('Primary test button')).toBeTruthy()
        expect(component.queryByText('Secondary test button')).toBeTruthy()

        // Only header should be visible after press
        fireEvent.press(component.getByRole('tab'))
        expect(component.queryByText('Header text')).toBeTruthy()
        expect(component.queryByText('Description text')).toBeNull()
        expect(component.queryByText('Sample children content')).toBeNull()
        expect(component.queryByText('Primary test button')).toBeNull()
        expect(component.queryByText('Secondary test button')).toBeNull()
      })
    })

    describe('Analytics', () => {
      it('should fire analytics events', async () => {
        component = render(
          <Alert
            variant="error"
            header={headerText}
            expandable
            analytics={{
              onExpand: onExpandSpy,
              onCollapse: onCollapseSpy,
            }}
          />,
        )

        fireEvent.press(component.getByRole('tab'))
        expect(onExpandSpy).toHaveBeenCalled()
        fireEvent.press(component.getByRole('tab'))
        expect(onCollapseSpy).toHaveBeenCalled()
      })
    })
  })
})
