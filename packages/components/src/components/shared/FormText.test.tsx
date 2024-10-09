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
  const header = { text: 'Header text', a11yLabel: 'Header a11y' }
  const hint = { text: 'Hint text', a11yLabel: 'Hint a11y' }
  const description = {
    text: 'Description text',
    a11yLabel: 'Description a11y',
  }
  const error = { text: 'Error text', a11yLabel: 'Error a11y' }
  const label = { text: 'Label text', a11yLabel: 'Label a11y' }

  describe('Header', () => {
    it('should render text and a11y label', () => {
      render(<Header text={header} />)
      expect(screen.root).toHaveTextContent('Header text')
      expect(screen.getByLabelText('Header a11y')).toBeOnTheScreen()
    })

    it('should render light mode color', () => {
      render(<Header text={header} />)
      expect(screen.root).toHaveStyle({
        color: '#1b1b1b',
      })
    })

    it('should render dark mode color', () => {
      mockedColorScheme.mockImplementation(() => 'dark')

      render(<Header text={header} />)
      expect(screen.root).toHaveStyle({
        color: '#f0f0f0',
      })
    })
  })

  describe('Hint', () => {
    it('should render text and a11y label', () => {
      render(<Hint text={hint} />)
      expect(screen.root).toHaveTextContent('Hint text')
      expect(screen.getByLabelText('Hint a11y')).toBeOnTheScreen()
    })

    it('should render light mode color', () => {
      mockedColorScheme.mockImplementation(() => 'light')
      render(<Hint text={hint} />)
      expect(screen.root).toHaveStyle({
        color: '#565c65',
      })
    })

    it('should render dark mode color', () => {
      mockedColorScheme.mockImplementation(() => 'dark')

      render(<Hint text={hint} />)
      expect(screen.root).toHaveStyle({
        color: '#a9aeb1',
      })
    })
  })

  describe('Error', () => {
    it('should render text and a11y label', () => {
      render(<Error text={error} />)
      expect(screen.root).toHaveTextContent('Error text')
      expect(screen.getByLabelText('Error: Error a11y')).toBeOnTheScreen()
    })

    it('should render light mode color', () => {
      mockedColorScheme.mockImplementation(() => 'light')
      render(<Error text={error} />)
      expect(screen.root).toHaveStyle({
        color: '#b50909',
      })
    })

    it('should render dark mode color', () => {
      mockedColorScheme.mockImplementation(() => 'dark')

      render(<Error text={error} />, { wrapper: ComponentWrapper })
      expect(screen.root).toHaveStyle({
        color: '#fb5a47',
      })
    })
  })

  describe('Label', () => {
    it('should render text and a11y label', () => {
      render(<Label text={label} />)
      expect(screen.root).toHaveTextContent('Label text')
      expect(screen.getByLabelText('Label a11y')).toBeOnTheScreen()
    })

    it('should have bold font when in error state', () => {
      render(<Label text={label} error={error} />)
      expect(screen.root).toHaveStyle({
        fontFamily: 'SourceSansPro-Bold',
      })
    })

    it('should render light mode color', () => {
      mockedColorScheme.mockImplementation(() => 'light')
      render(<Label text={label} />)
      expect(screen.root).toHaveStyle({
        fontFamily: 'SourceSansPro-Regular',
        color: '#1b1b1b',
      })
    })

    it('should render dark mode color', () => {
      mockedColorScheme.mockImplementation(() => 'dark')

      render(<Label text={label} />)
      expect(screen.root).toHaveStyle({
        color: '#f0f0f0',
      })
    })
  })

  describe('Description', () => {
    it('should render text and a11y label', () => {
      render(<Description text={description} />)
      expect(screen.root).toHaveTextContent('Description text')
      expect(screen.getByLabelText(', Description a11y')).toBeOnTheScreen()
    })

    it('should render light mode color', () => {
      mockedColorScheme.mockImplementation(() => 'light')
      render(<Description text={description} />)
      expect(screen.root).toHaveStyle({
        color: '#1b1b1b',
      })
    })

    it('should render dark mode color', () => {
      mockedColorScheme.mockImplementation(() => 'dark')

      render(<Description text={description} />)
      expect(screen.root).toHaveStyle({
        color: '#f0f0f0',
      })
    })
  })
})
