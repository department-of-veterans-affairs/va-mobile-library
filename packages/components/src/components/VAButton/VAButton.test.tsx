import 'react-native'
import { RenderAPI, fireEvent, render } from '@testing-library/react-native'
import React from 'react'
// Note: test renderer must be required after react-native.
import 'jest-styled-components'
import { ReactTestInstance } from 'react-test-renderer'

import { VAButton } from './VAButton'

describe('VAButton', () => {
  let component: RenderAPI
  let testInstance: ReactTestInstance

  const onPressSpy = jest.fn()

  const initializeTestInstance = (): void => {
    component = render(<VAButton label="Button text" onPress={onPressSpy} />)

    testInstance = component.UNSAFE_root
  }

  beforeEach(() => {
    initializeTestInstance()
  })

  it('initializes correctly', async () => {
    expect(component).toBeTruthy()
  })

  it('should call onChange', async () => {
    fireEvent.press(testInstance)
    expect(onPressSpy).toBeCalled()
  })

  it('should render label', async () => {
    expect(component.findByText('Button text')).toBeTruthy()
  })
})
