import 'react-native'
import { RenderAPI, render, waitFor } from '@testing-library/react-native'
import React from 'react'
// Note: test renderer must be required after react-native.
import 'jest-styled-components'
import { ReactTestInstance } from 'react-test-renderer'
import Mock = jest.Mock

import { SegmentedControl, SegmentedControlProps } from './SegmentedControl'

describe('SegmentedControl', () => {
  let component: RenderAPI
  let testInstance: ReactTestInstance
  let onChangeSpy: Mock

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChangeSpy = jest.fn(() => {})

    component = render<SegmentedControlProps>(
      <SegmentedControl
        labels={['tab0', 'tab1']}
        onChange={onChangeSpy}
        selected={0}
      />,
    )

    testInstance = component.UNSAFE_root
  })

  it('initializes correctly', async () => {
    expect(component).toBeTruthy()
  })

  it('should call onChange', async () => {
    await waitFor(() => {
      testInstance.findByType(SegmentedControl).props.onChange()
      expect(onChangeSpy).toBeCalled()
    })
  })
})
