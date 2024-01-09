import { Icon } from './Icon'
import { RenderAPI, render } from '@testing-library/react-native'
import React from 'react'

import * as DesignTokens from '@department-of-veterans-affairs/mobile-tokens'

describe('Icon', () => {
  let component: RenderAPI

  it('renders correctly', async () => {
    component = render(
      <Icon
        name="HomeSelected"
        testID="myId"
        height={100}
        width={100}
        fill={DesignTokens.colorGray}
        fill2={DesignTokens.colorSecondaryLightest}
        stroke={DesignTokens.colorPrimaryAltLightest}
        maxWidth={100}
        preventScaling={true}
      />,
    )

    expect(component).toBeTruthy()
    const icon = component.getByTestId('myId')
    const { name, width, height, preventScaling, fill, color, stroke } =
      icon.props

    expect(name).toBe('HomeSelected')
    expect(width).toBe(100)
    expect(height).toBe(100)
    expect(preventScaling).toBe(true)
    expect(fill).toBe(DesignTokens.colorGray)
    expect(color).toBe(DesignTokens.colorSecondaryLightest)
    expect(stroke).toBe(DesignTokens.colorPrimaryAltLightest)
  })

  it('maxWidth is set properly when scaled', async () => {
    component = render(
      <Icon
        name="HomeSelected"
        testID="myId"
        height={50}
        width={50}
        fill={DesignTokens.colorGray}
        fill2={DesignTokens.colorSecondaryLightest}
        stroke={DesignTokens.colorPrimaryAltLightest}
        maxWidth={100}
        preventScaling={false}
      />,
    )

    expect(component).toBeTruthy()
    const icon = component.getByTestId('myId')
    const { width, height, preventScaling } = icon.props

    expect(width).toBe(100)
    expect(height).toBe(100)
    expect(preventScaling).toBe(false)
  })
})
