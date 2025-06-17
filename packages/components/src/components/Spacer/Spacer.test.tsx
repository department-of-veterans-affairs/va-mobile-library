import { Spacer } from './Spacer'
import { render, screen } from '@testing-library/react-native'

describe('Spacer', () => {
  it('renders correctly at default size  vadsSpaceSm (12)', () => {
    render(<Spacer />)

    const spacer = screen.root

    expect(spacer.props.style.height).toBe(12)
    expect(spacer.props.style.width).toBe('auto')
  })

  it('renders correctly at overridden size vadsSpaceLg (20)', () => {
    render(<Spacer size="lg" />)

    const spacer = screen.root

    expect(spacer.props.style.height).toBe(20)
    expect(spacer.props.style.width).toBe('auto')
  })

  it('renders horizontally at default size  vadsSpaceSm (12)', () => {
    render(<Spacer horizontal />)

    const spacer = screen.root

    expect(spacer.props.style.height).toBe('auto')
    expect(spacer.props.style.width).toBe(12)
  })

  it('renders horizontally at overridden size vadsSpaceLg (20)', () => {
    render(<Spacer size="lg" horizontal />)

    const spacer = screen.root

    expect(spacer.props.style.height).toBe('auto')
    expect(spacer.props.style.width).toBe(20)
  })
})
