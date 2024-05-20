import { Spacer } from './Spacer'
import { render, screen } from '@testing-library/react-native'
import React from 'react'

describe('Spacer', () => {
  it('renders correctly at default size (10)', () => {
    render(<Spacer />)

    const spacer = screen.root

    expect(spacer.props.style.height).toBe(10)
    expect(spacer.props.style.width).toBe('auto')
  })

  it('renders correctly at overridden size 20', () => {
    render(<Spacer size={20} />)

    const spacer = screen.root

    expect(spacer.props.style.height).toBe(20)
    expect(spacer.props.style.width).toBe('auto')
  })

  it('renders horizontally at default size (10)', () => {
    render(<Spacer horizontal />)

    const spacer = screen.root

    expect(spacer.props.style.height).toBe('auto')
    expect(spacer.props.style.width).toBe(10)
  })

  it('renders horizontally at overridden size 20', () => {
    render(<Spacer size={20} horizontal />)

    const spacer = screen.root

    expect(spacer.props.style.height).toBe('auto')
    expect(spacer.props.style.width).toBe(20)
  })
})
