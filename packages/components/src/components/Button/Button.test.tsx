import 'react-native'
import { RenderAPI, fireEvent, render } from '@testing-library/react-native'
import React from 'react'
// Note: test renderer must be required after react-native.
import 'jest-styled-components'

import * as DesignTokens from '@department-of-veterans-affairs/mobile-tokens'

import { Button, ButtonVariants } from './Button'

describe('Button', () => {
  let component: RenderAPI
  const label = 'Button text'
  const onPressSpy = jest.fn()

  it('initializes correctly', async () => {
    component = render(<Button label={label} onPress={onPressSpy} />)
    expect(component).toBeTruthy()
  })

  it('should call onChange', async () => {
    component = render(<Button label={label} onPress={onPressSpy} />)
    fireEvent.press(component.getByRole('button'))
    expect(onPressSpy).toBeCalled()
  })

  it('should render label', async () => {
    component = render(<Button label={label} onPress={onPressSpy} />)
    expect(component.findByText('Button text')).toBeTruthy()
  })

  it('should render Primary variant by default', async () => {
    component = render(<Button label={label} onPress={onPressSpy} />)

    const button = component.getByRole('button')
    const text = component.getByText(label)
    const { backgroundColor, borderWidth } = button.props.style
    const { color } = text.props.style

    expect(backgroundColor).toEqual(
      DesignTokens.colorUswdsSystemColorBlueVivid60,
    )
    expect(borderWidth).toEqual(0)
    expect(color).toEqual(DesignTokens.colorGrayLightest)
  })

  it('should render Primary pressed variant', async () => {
    component = render(
      <Button label={label} onPress={onPressSpy} testOnlyPressed={true} />,
    )

    const button = component.getByRole('button')
    const text = component.getByText(label)
    const { backgroundColor, borderWidth } = button.props.style
    const { color } = text.props.style

    expect(backgroundColor).toEqual(
      DesignTokens.colorUswdsSystemColorBlueWarmVivid80,
    )
    expect(borderWidth).toEqual(0)
    expect(color).toEqual(DesignTokens.colorGrayLightest)
  })

  it('should render Base variant', async () => {
    component = render(
      <Button
        label={label}
        onPress={onPressSpy}
        buttonType={ButtonVariants.Base}
      />,
    )

    const button = component.getByRole('button')
    const text = component.getByText(label)

    const { backgroundColor, borderWidth } = button.props.style
    const { color } = text.props.style
    expect(backgroundColor).toEqual(DesignTokens.colorGrayMedium)
    expect(borderWidth).toEqual(0)
    expect(color).toEqual(DesignTokens.colorGrayLightest)
  })

  it('should render Base pressed variant', async () => {
    component = render(
      <Button
        label={label}
        onPress={onPressSpy}
        buttonType={ButtonVariants.Base}
        testOnlyPressed={true}
      />,
    )

    const button = component.getByRole('button')
    const text = component.getByText(label)
    const { backgroundColor, borderWidth } = button.props.style
    const { color } = text.props.style

    expect(backgroundColor).toEqual(DesignTokens.colorUswdsSystemColorGray80)
    expect(borderWidth).toEqual(0)
    expect(color).toEqual(DesignTokens.colorGrayLightest)
  })

  it('should render Destructive variant', async () => {
    component = render(
      <Button
        label={label}
        onPress={onPressSpy}
        buttonType={ButtonVariants.Destructive}
      />,
    )

    const button = component.getByRole('button')
    const text = component.getByText(label)

    const { backgroundColor, borderWidth, borderColor } = button.props.style
    const { color } = text.props.style

    expect(backgroundColor).toEqual(
      DesignTokens.colorUswdsSystemColorRedVivid60,
    )
    expect(borderColor).toEqual('none')
    expect(borderWidth).toEqual(0)
    expect(color).toEqual(DesignTokens.colorGrayLightest)
  })

  it('should render Destructive pressed variant', async () => {
    component = render(
      <Button
        label={label}
        onPress={onPressSpy}
        buttonType={ButtonVariants.Destructive}
        testOnlyPressed={true}
      />,
    )

    const button = component.getByRole('button')
    const text = component.getByText(label)
    const { backgroundColor, borderWidth } = button.props.style
    const { color } = text.props.style

    expect(backgroundColor).toEqual(
      DesignTokens.colorUswdsSystemColorRedVivid80,
    )
    expect(borderWidth).toEqual(0)
    expect(color).toEqual(DesignTokens.colorGrayLightest)
  })

  it('should render White variant', async () => {
    component = render(
      <Button
        label={label}
        onPress={onPressSpy}
        buttonType={ButtonVariants.White}
      />,
    )

    const button = component.getByRole('button')
    const text = component.getByText(label)
    const { backgroundColor, borderWidth, borderColor } = button.props.style
    const { color } = text.props.style

    expect(backgroundColor).toEqual(DesignTokens.colorGrayLightest)
    expect(borderColor).toEqual('none')
    expect(borderWidth).toEqual(0)
    expect(color).toEqual(DesignTokens.colorBlack)
  })

  it('should render White pressed variant', async () => {
    component = render(
      <Button
        label={label}
        onPress={onPressSpy}
        buttonType={ButtonVariants.White}
        testOnlyPressed={true}
      />,
    )

    const button = component.getByRole('button')
    const text = component.getByText(label)
    const { backgroundColor, borderWidth } = button.props.style
    const { color } = text.props.style

    expect(backgroundColor).toEqual(DesignTokens.colorUswdsSystemColorGray30)
    expect(borderWidth).toEqual(0)
    expect(color).toEqual(DesignTokens.colorBlack)
  })

  it('should render Secondary variant', async () => {
    component = render(
      <Button
        label={label}
        onPress={onPressSpy}
        buttonType={ButtonVariants.Secondary}
      />,
    )

    const button = component.getByRole('button')
    const text = component.getByText(label)
    const { backgroundColor, borderWidth, borderColor } = button.props.style
    const { color } = text.props.style

    expect(backgroundColor).toEqual(DesignTokens.colorWhite)
    expect(borderColor).toEqual(DesignTokens.colorUswdsSystemColorBlueVivid60)
    expect(borderWidth).toEqual(2)
    expect(color).toEqual(DesignTokens.colorUswdsSystemColorBlueVivid60)
  })

  it('should render Secondary pressed variant', async () => {
    component = render(
      <Button
        label={label}
        onPress={onPressSpy}
        buttonType={ButtonVariants.Secondary}
        testOnlyPressed={true}
      />,
    )

    const button = component.getByRole('button')
    const text = component.getByText(label)
    const { backgroundColor, borderColor, borderWidth } = button.props.style
    const { color } = text.props.style

    expect(backgroundColor).toEqual(DesignTokens.colorWhite)
    expect(borderColor).toEqual(
      DesignTokens.colorUswdsSystemColorBlueWarmVivid80,
    )
    expect(borderWidth).toEqual(2)
    expect(color).toEqual(DesignTokens.colorUswdsSystemColorBlueWarmVivid80)
  })

  it('should render BaseSecondary variant', async () => {
    component = render(
      <Button
        label={label}
        onPress={onPressSpy}
        buttonType={ButtonVariants.BaseSecondary}
      />,
    )

    const button = component.getByRole('button')
    const text = component.getByText(label)
    const { backgroundColor, borderWidth, borderColor } = button.props.style
    const { color } = text.props.style

    expect(backgroundColor).toEqual(DesignTokens.colorWhite)
    expect(borderColor).toEqual(DesignTokens.colorGrayMedium)
    expect(borderWidth).toEqual(2)
    expect(color).toEqual(DesignTokens.colorGrayMedium)
  })

  it('should render BaseSecondary pressed variant', async () => {
    component = render(
      <Button
        label={label}
        onPress={onPressSpy}
        buttonType={ButtonVariants.BaseSecondary}
        testOnlyPressed={true}
      />,
    )

    const button = component.getByRole('button')
    const text = component.getByText(label)
    const { backgroundColor, borderColor, borderWidth } = button.props.style
    const { color } = text.props.style

    expect(backgroundColor).toEqual(DesignTokens.colorWhite)
    expect(borderColor).toEqual(DesignTokens.colorUswdsSystemColorGray80)
    expect(borderWidth).toEqual(2)
    expect(color).toEqual(DesignTokens.colorUswdsSystemColorGray80)
  })
})
