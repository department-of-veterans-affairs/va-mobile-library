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
import { Colors } from '@department-of-veterans-affairs/mobile-tokens'
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
    const activeSegmentStyle = component.getAllByRole('tab')[0].props.style[0]
    const activeSegmentTextStyle = component.getByText(labels[0]).props.style
    const inactiveSegmentStyle = component.getAllByRole('tab')[1].props.style[0]
    const inactiveSegmentTextStyle = component.getByText(labels[1]).props.style

    expect(activeSegmentStyle.elevation).toEqual(4)
    expect(activeSegmentStyle.backgroundColor).toEqual(Colors.white)
    expect(activeSegmentTextStyle.color).toEqual(Colors.grayDark)

    expect(inactiveSegmentStyle.backgroundColor).toEqual(Colors.grayLighter)
    expect(inactiveSegmentStyle.elevation).toEqual(0)
    expect(inactiveSegmentTextStyle.color).toEqual(Colors.grayDark)
  })

  it('should render correct styles in dark mode', () => {
    mockedColorScheme.mockImplementationOnce(() => 'dark')
    rerender()
    const activeSegmentStyle = component.getAllByRole('tab')[0].props.style[0]
    const activeSegmentTextStyle = component.getByText(labels[0]).props.style
    const inactiveSegmentStyle = component.getAllByRole('tab')[1].props.style[0]
    const inactiveSegmentTextStyle = component.getByText(labels[1]).props.style

    expect(activeSegmentStyle.elevation).toEqual(4)
    expect(activeSegmentStyle.backgroundColor).toEqual(Colors.grayMedium)
    expect(activeSegmentTextStyle.color).toEqual(Colors.grayLightest)

    expect(inactiveSegmentStyle.backgroundColor).toEqual(Colors.grayDark)
    expect(inactiveSegmentStyle.elevation).toEqual(0)
    expect(inactiveSegmentTextStyle.color).toEqual(Colors.grayLightest)
  })
})
