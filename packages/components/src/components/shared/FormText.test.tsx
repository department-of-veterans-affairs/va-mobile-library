import 'react-native'
import { render, screen } from '@testing-library/react-native'
import React from 'react'

import { ComponentWrapper } from '../../wrapper'
import { Description, Error, Header, Hint, Label } from './FormText'

const mockedColorScheme = jest.fn()

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => {
  return {
    default: mockedColorScheme,
  }
})

describe('Form Text', () => {
  const headerString = 'Header string'
  const headerObject = { text: 'Header text object', a11yLabel: 'Header a11y' }

  const hintString = 'Hint string'
  const hintObject = { text: 'Hint text object', a11yLabel: 'Hint a11y' }

  const descriptionString = 'Description string'
  const descriptionObject = {
    text: 'Description text object',
    a11yLabel: 'Description a11y',
  }

  const errorString = 'Error string'
  const errorObject = { text: 'Error text object', a11yLabel: 'Error a11y' }

  const labelString = 'Label string'
  const labelObject = { text: 'Label text object', a11yLabel: 'Label a11y' }

  describe('Header', () => {
    it('should render text object and a11y label', () => {
      render(<Header text={headerObject} />)
      expect(screen.root).toHaveTextContent('Header text object')
      expect(screen.getByLabelText('Header a11y')).toBeOnTheScreen()
    })

    it('should render simple string', () => {
      render(<Header text={headerString} />)
      expect(screen.root).toHaveTextContent('Header string')
    })

    it('should render text object without a11y label', () => {
      render(<Header text={{ text: 'Header text object' }} />)
      expect(screen.root).toHaveTextContent('Header text object')
      expect(screen.getByLabelText('Header text object')).toBeOnTheScreen()
    })

    it('should render required text', () => {
      render(<Header text={headerString} required />)
      expect(screen.root).toHaveTextContent('Header string (*Required)')
    })

    it('should render light mode color', () => {
      render(<Header text={headerObject} required />)
      expect(screen.root).toHaveStyle({
        color: '#1b1b1b',
      })
      expect(screen.getByText('(*Required)')).toHaveStyle({
        color: '#b50909',
      })
    })

    it('should render dark mode color', () => {
      mockedColorScheme.mockImplementation(() => 'dark')

      render(<Header text={headerObject} required />)
      expect(screen.root).toHaveStyle({
        color: '#f0f0f0',
      })
      expect(screen.getByText('(*Required)')).toHaveStyle({
        color: '#fb5a47',
      })
    })
  })

  describe('Hint', () => {
    it('should render text and a11y label', () => {
      render(<Hint text={hintObject} />)
      expect(screen.root).toHaveTextContent('Hint text object')
      expect(screen.getByLabelText('Hint a11y')).toBeOnTheScreen()
    })

    it('should render simple string', () => {
      render(<Hint text={hintString} />)
      expect(screen.root).toHaveTextContent('Hint string')
    })

    it('should render text object without a11y label', () => {
      render(<Hint text={{ text: 'Hint text object' }} />)
      expect(screen.root).toHaveTextContent('Hint text object')
      expect(screen.getByLabelText('Hint text object')).toBeOnTheScreen()
    })

    it('should render light mode color', () => {
      mockedColorScheme.mockImplementation(() => 'light')
      render(<Hint text={hintObject} />)
      expect(screen.root).toHaveStyle({
        color: '#565c65',
      })
    })

    it('should render dark mode color', () => {
      mockedColorScheme.mockImplementation(() => 'dark')

      render(<Hint text={hintObject} />)
      expect(screen.root).toHaveStyle({
        color: '#a9aeb1',
      })
    })
  })

  describe('Error', () => {
    it('should render text and a11y label', () => {
      render(<Error text={errorObject} />)
      expect(screen.root).toHaveTextContent('Error text object')
      expect(screen.getByLabelText('Error: Error a11y')).toBeOnTheScreen()
    })

    it('should render simple string', () => {
      render(<Error text={errorString} />)
      expect(screen.root).toHaveTextContent('Error string')
    })

    it('should render text object without a11y label', () => {
      render(<Error text={{ text: 'Error text object' }} />)
      expect(screen.root).toHaveTextContent('Error text object')
      expect(
        screen.getByLabelText('Error: Error text object'),
      ).toBeOnTheScreen()
    })

    it('should render light mode color', () => {
      mockedColorScheme.mockImplementation(() => 'light')
      render(<Error text={errorObject} />)
      expect(screen.root).toHaveStyle({
        color: '#b50909',
      })
    })

    it('should render dark mode color', () => {
      mockedColorScheme.mockImplementation(() => 'dark')

      render(<Error text={errorObject} />, { wrapper: ComponentWrapper })
      expect(screen.root).toHaveStyle({
        color: '#fb5a47',
      })
    })
  })

  describe('Label', () => {
    it('should render text and a11y label', () => {
      render(<Label text={labelObject} />)
      expect(screen.root).toHaveTextContent('Label text object')
      expect(screen.getByLabelText('Label a11y')).toBeOnTheScreen()
      expect(screen.root).toHaveStyle({
        fontFamily: 'SourceSansPro-Regular',
      })
    })

    it('should render simple string', () => {
      render(<Label text={labelString} />)
      expect(screen.root).toHaveTextContent('Label string')
    })

    it('should render text object without a11y label', () => {
      render(<Label text={{ text: 'Label text object' }} />)
      expect(screen.root).toHaveTextContent('Label text object')
      expect(screen.getByLabelText('Label text object')).toBeOnTheScreen()
    })

    it('should render required text', () => {
      render(<Label text={labelString} required />)
      expect(screen.root).toHaveTextContent('Label string (*Required)')
    })

    it('should have bold font when in error state', () => {
      render(<Label text={labelObject} error={errorObject} />)
      expect(screen.root).toHaveStyle({
        fontFamily: 'SourceSansPro-Bold',
      })
    })

    it('should render light mode color', () => {
      mockedColorScheme.mockImplementation(() => 'light')
      render(<Label text={labelObject} required />)
      expect(screen.root).toHaveStyle({
        color: '#1b1b1b',
      })
      expect(screen.getByText('(*Required)')).toHaveStyle({
        color: '#b50909',
      })
    })

    it('should render dark mode color', () => {
      mockedColorScheme.mockImplementation(() => 'dark')

      render(<Label text={labelObject} required />)
      expect(screen.root).toHaveStyle({
        color: '#f0f0f0',
      })
      expect(screen.getByText('(*Required)')).toHaveStyle({
        color: '#fb5a47',
      })
    })
  })

  describe('Description', () => {
    it('should render text and a11y label', () => {
      render(<Description text={descriptionObject} />)
      expect(screen.root).toHaveTextContent('Description text object')
      expect(screen.getByLabelText(', Description a11y')).toBeOnTheScreen()
    })

    it('should render simple string', () => {
      render(<Description text={descriptionString} />)
      expect(screen.root).toHaveTextContent('Description string')
    })

    it('should render text object without a11y label', () => {
      render(<Description text={{ text: 'Description text object' }} />)
      expect(screen.root).toHaveTextContent('Description text object')
      expect(
        screen.getByLabelText(', Description text object'),
      ).toBeOnTheScreen()
    })

    it('should render light mode color', () => {
      mockedColorScheme.mockImplementation(() => 'light')
      render(<Description text={descriptionObject} />)
      expect(screen.root).toHaveStyle({
        color: '#1b1b1b',
      })
    })

    it('should render dark mode color', () => {
      mockedColorScheme.mockImplementation(() => 'dark')

      render(<Description text={descriptionObject} />)
      expect(screen.root).toHaveStyle({
        color: '#f0f0f0',
      })
    })
  })
})
