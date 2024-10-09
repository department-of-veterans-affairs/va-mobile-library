import 'react-native'
import { fireEvent, render, screen } from '@testing-library/react-native'
import React from 'react'

import { CheckboxGroup } from './CheckboxGroup'

const mockedColorScheme = jest.fn()

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => {
  return {
    default: mockedColorScheme,
  }
})

describe('CheckboxGroup', () => {
  const onSelectionChangeSpy = jest.fn()

  const items = [
    { text: 'Option 1', description: 'Description for option 1' },
    {
      text: 'Option 2',
      a11yLabel: 'Accessibility override for option 2',
      value: '2',
      description: {
        text: 'Description for option 2',
        a11yLabel: 'Accessibility override for description',
      },
      testID: 'testCheckbox',
    },
    { text: 'Option 3' },
    { text: 'Option 4' },
    { text: 'Option 5' },
    { text: 'Option 6' },
  ]

  const commonProps = {
    header: 'Header text',
    hint: 'Hint text',
    items,
    selectedItems: ['2', 'Option 4'],
    testID: 'testCheckboxGroup',
    onSelectionChange: onSelectionChangeSpy,
  }

  const errorMsg = 'Error text'

  describe('Basic tests', () => {
    it('initializes correctly', () => {
      render(<CheckboxGroup {...commonProps} />)
      expect(screen.getByTestId('testCheckboxGroup')).toBeTruthy()
    })

    it('renders header, hint, and checkboxes', () => {
      render(<CheckboxGroup {...commonProps} />)
      expect(screen.getByTestId('testCheckboxGroup')).toBeTruthy()
      expect(screen.getByText('Header text')).toBeOnTheScreen()
      expect(screen.getByText('Hint text')).toBeOnTheScreen()
      expect(screen.queryByText('(*Required)')).not.toBeOnTheScreen()

      const checkboxes = screen.queryAllByRole('checkbox')
      expect(checkboxes.length).toBe(6)
    })

    it('renders required indicator', async () => {
      render(<CheckboxGroup {...commonProps} required />)
      expect(screen.getByText('(*Required)')).toBeOnTheScreen()
    })

    it('should mark selectedItems as checked', () => {
      render(<CheckboxGroup {...commonProps} />)
      const checkboxes = screen.queryAllByRole('checkbox')
      expect(checkboxes[1].props.accessibilityState.checked).toBe(true)
      expect(checkboxes[3].props.accessibilityState.checked).toBe(true)
    })
  })

  describe('onPress behavior', () => {
    it('should pass updated selectedItems on check', () => {
      render(<CheckboxGroup {...commonProps} />)
      const checkboxes = screen.queryAllByRole('checkbox')

      // simulate check 'Option 1'
      fireEvent.press(checkboxes[0])
      expect(onSelectionChangeSpy).toHaveBeenCalledWith([
        '2',
        'Option 4',
        'Option 1',
      ])
    })

    it('should pass updated selectedItems on uncheck', () => {
      render(<CheckboxGroup {...commonProps} />)
      const checkboxes = screen.queryAllByRole('checkbox')

      // simulate uncheck '2'
      fireEvent.press(checkboxes[1])
      expect(onSelectionChangeSpy).toHaveBeenLastCalledWith(['Option 4'])
    })
  })

  describe('Error state', () => {
    it('light mode styling', () => {
      render(<CheckboxGroup {...commonProps} error={errorMsg} />)

      expect(screen.root).toHaveStyle({
        paddingLeft: 16,
        borderColor: '#b50909',
        borderLeftWidth: 4,
      })
    })

    it('dark mode styling', () => {
      mockedColorScheme.mockImplementation(() => 'dark')
      render(<CheckboxGroup {...commonProps} error={errorMsg} />)

      expect(screen.root).toHaveStyle({
        paddingLeft: 16,
        borderColor: '#fb5a47',
        borderLeftWidth: 4,
      })
    })
  })
})
