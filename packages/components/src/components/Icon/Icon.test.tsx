import { Icon } from './Icon'
import { RenderAPI, render } from '@testing-library/react-native'
import React from 'react'

describe('Icon', () => {
  let component: RenderAPI

  beforeEach(() => {
    component = render(
      <Icon name="HomeSelected" testID="myId" height={100} width={100} />,
    )
  })

  it('initializes correctly', async () => {
    expect(component).toBeTruthy()
  })
})
