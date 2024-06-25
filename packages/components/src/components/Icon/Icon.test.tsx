import { Icon, IconProps } from './Icon'
import { render, screen } from '@testing-library/react-native'
import React from 'react'

import CustomSVG from '../../assets/svgs/custom.svg'

const mockedColorScheme = jest.fn()

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => {
  return {
    default: mockedColorScheme,
  }
})

describe('Icon', () => {
  const commonProps: IconProps = {
    name: 'HomeOutlined',
    testID: 'myId',
  }

  const getIcon = () => screen.getByTestId('myId')

  afterEach(() => {
    mockedColorScheme.mockReset()
  })

  describe('Basic tests and scaling', () => {
    it('renders correctly at default size', async () => {
      render(<Icon {...commonProps} preventScaling={true} />)

      const icon = getIcon()
      const { width, height, fill } = icon.props

      expect(icon).toBeOnTheScreen()
      expect(width).toBe(24)
      expect(height).toBe(24)
      expect(fill).toBe('#005ea2')
    })

    it('renders correctly at set size despite fontScale 2', async () => {
      render(
        <Icon {...commonProps} height={50} width={50} preventScaling={true} />,
      )

      const icon = getIcon()
      const { width, height } = icon.props

      expect(icon).toBeOnTheScreen()
      expect(width).toBe(50)
      expect(height).toBe(50)
    })

    it('renders correctly with maxWidth overriding fontScale 2', async () => {
      render(<Icon {...commonProps} height={50} width={50} maxWidth={75} />)

      const icon = getIcon()
      const { width, height } = icon.props

      expect(icon).toBeOnTheScreen()
      expect(width).toBe(75)
      expect(height).toBe(75)
    })

    it('renders correctly with fontScale 2', async () => {
      render(<Icon name="HomeOutlined" testID="myId" height={50} width={50} />)

      const icon = getIcon()
      const { width, height } = icon.props

      expect(icon).toBeOnTheScreen()
      expect(width).toBe(100)
      expect(height).toBe(100)
    })
  })

  describe('Color tests', () => {
    describe('Single string color', () => {
      it('renders correctly in light mode', async () => {
        render(<Icon {...commonProps} fill="#565c65" />)

        const icon = getIcon()

        expect(icon.props.fill).toBe('#565c65')
      })

      it('renders correctly in dark mode', async () => {
        mockedColorScheme.mockImplementation(() => 'dark')

        render(<Icon {...commonProps} fill="#565c65" />)

        const icon = getIcon()

        expect(icon.props.fill).toBe('#565c65')
      })
    })

    describe('"default" colors', () => {
      it('renders correctly in light mode', async () => {
        render(<Icon {...commonProps} />)

        const icon = getIcon()

        expect(icon.props.fill).toBe('#005ea2')
      })

      it('renders correctly in dark mode', async () => {
        mockedColorScheme.mockImplementation(() => 'dark')

        render(<Icon {...commonProps} />)

        const icon = getIcon()

        expect(icon.props.fill).toBe('#58b4ff')
      })
    })

    describe('"base" colors', () => {
      it('renders correctly in light mode', async () => {
        render(<Icon {...commonProps} fill="base" />)

        const icon = getIcon()

        expect(icon.props.fill).toBe('#1b1b1b')
      })

      it('renders correctly in dark mode', async () => {
        mockedColorScheme.mockImplementation(() => 'dark')

        render(<Icon {...commonProps} fill="base" />)

        const icon = getIcon()

        expect(icon.props.fill).toBe('#f0f0f0')
      })
    })

    describe('Custom light/dark mode colors', () => {
      const lightDarkModeFill: IconProps['fill'] = {
        light: '#f0f',
        dark: '#0f0'
      }

      it('renders correctly in light mode', async () => {
        render(<Icon {...commonProps} fill={lightDarkModeFill} />)

        const icon = getIcon()

        expect(icon.props.fill).toBe('#f0f')
      })

      it('renders correctly in dark mode', async () => {
        mockedColorScheme.mockImplementation(() => 'dark')

        render(<Icon {...commonProps} fill={lightDarkModeFill} />)

        const icon = getIcon()

        expect(icon.props.fill).toBe('#0f0')
      })
    })
  })

  it('renders custom SVG correctly', async () => {
    render(
      <Icon
        svg={CustomSVG}
        testID="myId"
        height={100}
        width={100}
        maxWidth={100}
      />,
    )

    const icon = getIcon()
    const { name, width, height, fill } = icon.props

    expect(icon).toBeOnTheScreen()
    expect(name).not.toBeDefined()
    expect(width).toBe(100)
    expect(height).toBe(100)
    expect(fill).toBe('#005ea2')
  })
})
