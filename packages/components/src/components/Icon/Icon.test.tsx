import { Icon } from './Icon'
import { RenderAPI, render } from '@testing-library/react-native'
import React from 'react'

import { Colors } from '@department-of-veterans-affairs/mobile-tokens'
import CustomSVG from '../../assets/svgs/custom.svg'

describe('Icon', () => {
  let component: RenderAPI

  it('renders correctly at default size', async () => {
    component = render(
      <Icon
        name="HomeOutline"
        testID="myId"
        fill={Colors.gray}
        fill2={Colors.secondaryLightest}
        stroke={Colors.primaryAltLightest}
        preventScaling={true}
      />,
    )

    expect(component).toBeTruthy()
    const icon = component.getByTestId('myId')
    const { width, height, fill, color, stroke } = icon.props

    expect(width).toBe(24)
    expect(height).toBe(24)
    expect(fill).toBe(Colors.gray)
    expect(color).toBe(Colors.secondaryLightest)
    expect(stroke).toBe(Colors.primaryAltLightest)
  })

  it('renders correctly at set size despite fontScale 2', async () => {
    component = render(
      <Icon
        name="HomeOutline"
        testID="myId"
        height={50}
        width={50}
        preventScaling={true}
      />,
    )

    expect(component).toBeTruthy()
    const icon = component.getByTestId('myId')
    const { width, height } = icon.props

    expect(width).toBe(50)
    expect(height).toBe(50)
  })

  it('renders correctly with maxWidth overriding fontScale 2', async () => {
    component = render(
      <Icon
        name="HomeOutline"
        testID="myId"
        height={50}
        width={50}
        maxWidth={75}
      />,
    )

    expect(component).toBeTruthy()
    const icon = component.getByTestId('myId')
    const { width, height } = icon.props

    expect(width).toBe(75)
    expect(height).toBe(75)
  })

  it('renders correctly with fontScale 2', async () => {
    component = render(
      <Icon name="HomeOutline" testID="myId" height={50} width={50} />,
    )

    expect(component).toBeTruthy()
    const icon = component.getByTestId('myId')
    const { width, height } = icon.props

    expect(width).toBe(100)
    expect(height).toBe(100)
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
    const { width, height, fill, color, stroke } = icon.props

    expect(width).toBe(100)
    expect(height).toBe(100)
    expect(fill).toBe(Colors.gray)
    expect(color).toBe(Colors.secondaryLightest)
    expect(stroke).toBe(Colors.primaryAltLightest)
  })
})
