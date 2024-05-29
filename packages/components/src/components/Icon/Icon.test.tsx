import { Icon } from './Icon'
import { render, screen } from '@testing-library/react-native'
import React from 'react'

import CustomSVG from '../../assets/svgs/custom.svg'

describe('Icon', () => {
  const getIcon = () => screen.getByTestId('myId')

  it('renders correctly at default size', async () => {
    render(
      <Icon
        name="HomeOutline"
        testID="myId"
        fill="#565c65"
        preventScaling={true}
      />,
    )

    const icon = getIcon()
    expect(icon).toBeOnTheScreen()
    const { width, height, fill } = icon.props

    expect(width).toBe(24)
    expect(height).toBe(24)
    expect(fill).toBe('#565c65')
  })

  it('renders correctly at set size despite fontScale 2', async () => {
    render(
      <Icon
        name="HomeOutline"
        testID="myId"
        height={50}
        width={50}
        preventScaling={true}
      />,
    )

    const icon = getIcon()
    expect(icon).toBeOnTheScreen()
    const { width, height } = icon.props

    expect(width).toBe(50)
    expect(height).toBe(50)
  })

  it('renders correctly with maxWidth overriding fontScale 2', async () => {
    render(
      <Icon
        name="HomeOutline"
        testID="myId"
        height={50}
        width={50}
        maxWidth={75}
      />,
    )

    const icon = getIcon()
    expect(icon).toBeOnTheScreen()
    const { width, height } = icon.props

    expect(width).toBe(75)
    expect(height).toBe(75)
  })

  it('renders correctly with fontScale 2', async () => {
    render(<Icon name="HomeOutline" testID="myId" height={50} width={50} />)

    const icon = getIcon()
    expect(icon).toBeOnTheScreen()
    const { width, height } = icon.props

    expect(width).toBe(100)
    expect(height).toBe(100)
  })

  it('renders custom SVG correctly', async () => {
    render(
      <Icon
        svg={CustomSVG}
        testID="myId"
        height={100}
        width={100}
        fill="#565c65"
        maxWidth={100}
        preventScaling={true}
      />,
    )

    const icon = getIcon()
    expect(icon).toBeOnTheScreen()
    const { width, height, fill } = icon.props

    expect(width).toBe(100)
    expect(height).toBe(100)
    expect(fill).toBe('#565c65')
  })
})
