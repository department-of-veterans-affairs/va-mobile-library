import { Icon } from './Icon'
import { RenderAPI, render } from '@testing-library/react-native'
import React from 'react'

import { Colors } from '@department-of-veterans-affairs/mobile-tokens'
import CustomSVG from '../../assets/svgs/custom.svg'

describe('Icon', () => {
  let component: RenderAPI

  it('renders correctly', async () => {
    component = render(
      <Icon
        name="HomeSelected"
        testID="myId"
        height={100}
        width={100}
        fill={Colors.gray}
        fill2={Colors.secondaryLightest}
        stroke={Colors.primaryAltLightest}
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
    expect(fill).toBe(Colors.gray)
    expect(color).toBe(Colors.secondaryLightest)
    expect(stroke).toBe(Colors.primaryAltLightest)
  })

  it('maxWidth is set properly when scaled', async () => {
    component = render(
      <Icon
        name="HomeSelected"
        testID="myId"
        height={50}
        width={50}
        fill={Colors.gray}
        fill2={Colors.secondaryLightest}
        stroke={Colors.primaryAltLightest}
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

  it('renders custom SVG correctly', async () => {
    component = render(
      <Icon
        svg={CustomSVG}
        testID="myId"
        height={100}
        width={100}
        fill={Colors.gray}
        fill2={Colors.secondaryLightest}
        stroke={Colors.primaryAltLightest}
        maxWidth={100}
        preventScaling={true}
      />,
    )

    expect(component).toBeTruthy()
    const icon = component.getByTestId('myId')
    const { name, width, height, preventScaling, fill, color, stroke } =
      icon.props

    expect(name).toBeUndefined()
    expect(width).toBe(100)
    expect(height).toBe(100)
    expect(preventScaling).toBe(true)
    expect(fill).toBe(Colors.gray)
    expect(color).toBe(Colors.secondaryLightest)
    expect(stroke).toBe(Colors.primaryAltLightest)
  })
})
