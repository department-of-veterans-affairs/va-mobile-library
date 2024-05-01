import 'react-native'
import { fireEvent, render, screen } from '@testing-library/react-native'
import React from 'react'
// Note: test renderer must be required after react-native.
import 'jest-styled-components'
import { Colors } from '@department-of-veterans-affairs/mobile-tokens'
import { ReactTestInstance } from 'react-test-renderer'

import { SegmentedControl } from './SegmentedControl'

describe('SegmentedControl', () => {
  let testInstance: ReactTestInstance
  let rerender: () => void

  const mockedColorScheme = jest.fn()

  jest.mock('react-native/Libraries/Utilities/useColorScheme', () => {
    return {
      default: mockedColorScheme,
    }
  })

  const labels = ['segment 0', 'segment 1']
  const a11yLabels = ['segment 0 a11y label', 'segment 1 a11y label']
  const a11yHints = ['segment 0 a11y hint', 'segment 1 a11y hint']

  const onChangeSpy = jest.fn((selectTab) => {
    selectedTab = selectTab
  })
  let selectedTab = 0

  const initializeTestInstance = (): void => {
    mockedColorScheme.mockImplementationOnce(() => 'light')
    render(
      <SegmentedControl
        labels={labels}
        onChange={onChangeSpy}
        selected={selectedTab}
        a11yLabels={a11yLabels}
        a11yHints={a11yHints}
      />,
    )

    testInstance = screen.UNSAFE_root
    // Function to redraw the component for update since test is not stateful
    rerender = () => {
      screen.rerender(
        <SegmentedControl
          labels={labels}
          onChange={onChangeSpy}
          selected={selectedTab}
        />,
      )
    }
  }

  it('initializes correctly', async () => {
    initializeTestInstance()
    expect(screen).toBeTruthy()
  })

  it('should initialize with the 0th index label selected', async () => {
    initializeTestInstance()
    expect(testInstance.props.selected).toEqual(0)
  })

  it('should change segments when pressing another segment', async () => {
    initializeTestInstance()
    fireEvent.press(screen.getByText(labels[1]))
    rerender()
    expect(testInstance.props.selected).toEqual(1)
  })

  it('should not change segments when pressing the same segment', async () => {
    initializeTestInstance()
    fireEvent.press(screen.getByText(labels[0]))
    rerender()
    expect(testInstance.props.selected).toEqual(0)
  })

  it('should render correct styles in light mode', () => {
    initializeTestInstance()
    const activeSegment = screen.getAllByRole('tab')[0]
    const activeSegmentText = screen.getByText(labels[1])
    const inactiveSegment = screen.getAllByRole('tab')[1]
    const inactiveSegmentText = screen.getByText(labels[1])

    expect(activeSegment).toHaveStyle({
      elevation: 4,
      backgroundColor: '#ffffff',
    })

    expect(activeSegmentText).toHaveStyle({
      color: '#3d4551',
    })

    expect(inactiveSegment).toHaveStyle({
      elevation: 0,
      backgroundColor: '#dfe1e2',
    })

    expect(inactiveSegmentText).toHaveStyle({
      color: '#3d4551',
    })
  })

  it('should render correct styles in dark mode', () => {
    mockedColorScheme.mockImplementationOnce(() => 'dark')
    initializeTestInstance()
    const activeSegment = screen.getAllByRole('tab')[0]
    const activeSegmentText = screen.getByText(labels[1])
    const inactiveSegment = screen.getAllByRole('tab')[1]
    const inactiveSegmentText = screen.getByText(labels[1])

    expect(activeSegment).toHaveStyle({
      elevation: 4,
      backgroundColor: '#757575',
    })

    expect(activeSegmentText).toHaveStyle({
      color: '#f0f0f0',
    })

    expect(inactiveSegment).toHaveStyle({
      elevation: 0,
      backgroundColor: '#3d4551',
    })

    expect(inactiveSegmentText).toHaveStyle({
      color: '#f0f0f0',
    })
  })

  describe('Accessibility', () => {
    it('should include a11y labels when provided', () => {
      initializeTestInstance()
      expect(screen.getByLabelText('segment 0 a11y label')).toBeOnTheScreen()
      expect(screen.getByLabelText('segment 1 a11y label')).toBeOnTheScreen()
    })

    it('should include a11y hints when provided', () => {
      initializeTestInstance()
      expect(screen.getByHintText('segment 0 a11y hint')).toBeOnTheScreen()
      expect(screen.getByHintText('segment 1 a11y hint')).toBeOnTheScreen()
    })
  })
})
