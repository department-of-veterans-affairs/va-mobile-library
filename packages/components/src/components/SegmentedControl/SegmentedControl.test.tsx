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
    const activeSegmentStyle = screen.getAllByRole('tab')[0].props.style[0]
    const activeSegmentTextStyle = screen.getByText(labels[0]).props.style
    const inactiveSegmentStyle = screen.getAllByRole('tab')[1].props.style[0]
    const inactiveSegmentTextStyle = screen.getByText(labels[1]).props.style

    expect(activeSegmentStyle.elevation).toEqual(4)
    expect(activeSegmentStyle.backgroundColor).toEqual(Colors.white)
    expect(activeSegmentTextStyle.color).toEqual(Colors.grayDark)

    expect(inactiveSegmentStyle.backgroundColor).toEqual(Colors.grayLighter)
    expect(inactiveSegmentStyle.elevation).toEqual(0)
    expect(inactiveSegmentTextStyle.color).toEqual(Colors.grayDark)
  })

  it('should render correct styles in dark mode', () => {
    mockedColorScheme.mockImplementationOnce(() => 'dark')
    initializeTestInstance()
    const activeSegmentStyle = screen.getAllByRole('tab')[0].props.style[0]
    const activeSegmentTextStyle = screen.getByText(labels[0]).props.style
    const inactiveSegmentStyle = screen.getAllByRole('tab')[1].props.style[0]
    const inactiveSegmentTextStyle = screen.getByText(labels[1]).props.style

    expect(activeSegmentStyle.elevation).toEqual(4)
    expect(activeSegmentStyle.backgroundColor).toEqual(Colors.grayMedium)
    expect(activeSegmentTextStyle.color).toEqual(Colors.grayLightest)

    expect(inactiveSegmentStyle.backgroundColor).toEqual(Colors.grayDark)
    expect(inactiveSegmentStyle.elevation).toEqual(0)
    expect(inactiveSegmentTextStyle.color).toEqual(Colors.grayLightest)
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
