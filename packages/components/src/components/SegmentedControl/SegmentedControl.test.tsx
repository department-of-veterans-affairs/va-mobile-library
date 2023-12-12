import 'react-native'
import {
  RenderAPI,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native'
import React from 'react'
// Note: test renderer must be required after react-native.
import 'jest-styled-components'
import * as DesignTokens from '@department-of-veterans-affairs/mobile-tokens'
import { ReactTestInstance } from 'react-test-renderer'

import { SegmentedControl } from './SegmentedControl'

describe('SegmentedControl', () => {
  let component: RenderAPI
  let testInstance: ReactTestInstance
  let rerender: () => void

  const mockedColorScheme = jest.fn()

  jest.mock('react-native/Libraries/Utilities/useColorScheme', () => {
    return {
      default: mockedColorScheme,
    }
  })

  const labels = ['segment 0', 'segment 1']

  const onChangeSpy = jest.fn((selectTab) => {
    selectedTab = selectTab
  })
  let selectedTab = 0

  const initializeTestInstance = (): void => {
    mockedColorScheme.mockImplementationOnce(() => 'light')
    component = render(
      <SegmentedControl
        labels={labels}
        onChange={onChangeSpy}
        selected={selectedTab}
      />,
    )

    testInstance = component.UNSAFE_root
    // Function to redraw the component for update since test is not stateful
    rerender = () => {
      component.rerender(
        <SegmentedControl
          labels={labels}
          onChange={onChangeSpy}
          selected={selectedTab}
        />,
      )
    }
  }

  beforeEach(() => {
    initializeTestInstance()
  })

  it('initializes correctly', async () => {
    expect(component).toBeTruthy()
  })

  it('should initialize with the 0th index label selected', async () => {
    await waitFor(() => {
      expect(testInstance.props.selected).toEqual(0)
    })
  })

  it('should change segments when pressing another segment', async () => {
    await waitFor(() => {
      fireEvent.press(component.getByText(labels[1]))
      rerender()
      expect(testInstance.props.selected).toEqual(1)
    })
  })

  it('should not change segments when pressing the same segment', async () => {
    await waitFor(() => {
      fireEvent.press(component.getByText(labels[0]))
      rerender()
      expect(testInstance.props.selected).toEqual(0)
    })
  })

  it('should render correct styles in light mode', () => {
    const activeSegment = component.getAllByRole('tab')[0]
    const activeSegmentText = component.getByText(labels[0])
    const activeBgColor = activeSegment.props.style[0].backgroundColor
    const activeTextColor = activeSegmentText.props.style.color
    const inactiveSegment = component.getAllByRole('tab')[1]
    const inactiveSegmentText = component.getByText(labels[1])
    const inactiveTextColor = inactiveSegmentText.props.style.color
    const inactiveBgColor = inactiveSegment.props.style[0].backgroundColor

    expect(activeBgColor).toEqual(DesignTokens.colorWhite)
    expect(activeTextColor).toEqual(DesignTokens.colorGrayDark)
    expect(inactiveTextColor).toEqual(DesignTokens.colorGrayDark)
    expect(inactiveBgColor).toEqual(DesignTokens.colorGrayLighter)
  })

  it('should render correct styles in dark mode', () => {
    mockedColorScheme.mockImplementationOnce(() => 'dark')
    rerender()
    const activeSegment = component.getAllByRole('tab')[0]
    const activeSegmentText = component.getByText(labels[0])
    const activeBgColor = activeSegment.props.style[0].backgroundColor
    const activeTextColor = activeSegmentText.props.style.color
    const inactiveSegment = component.getAllByRole('tab')[1]
    const inactiveSegmentText = component.getByText(labels[1])
    const inactiveTextColor = inactiveSegmentText.props.style.color
    const inactiveBgColor = inactiveSegment.props.style[0].backgroundColor

    expect(activeBgColor).toEqual(DesignTokens.colorGrayMedium)
    expect(activeTextColor).toEqual(DesignTokens.colorGrayLightest)
    expect(inactiveTextColor).toEqual(DesignTokens.colorGrayLightest)
    expect(inactiveBgColor).toEqual(DesignTokens.colorGrayDark)
  })
})
