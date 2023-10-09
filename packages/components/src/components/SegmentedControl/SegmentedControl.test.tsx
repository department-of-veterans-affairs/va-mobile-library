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
import { ReactTestInstance } from 'react-test-renderer'

import { SegmentedControl } from './SegmentedControl'

describe('SegmentedControl', () => {
  let component: RenderAPI
  let testInstance: ReactTestInstance
  let rerender: () => void

  const labels = ['segment 0', 'segment 1']
  const onChangeSpy = jest.fn((selectTab) => {
    selectedTab = selectTab
  })
  let selectedTab = 0

  const initializeTestInstance = (): void => {
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
      const selectedSegment = testInstance.props.selected
      expect(selectedSegment).toEqual(0)
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
})
