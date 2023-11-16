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

  describe('Primary variant', () => {
    beforeEach(() => {
      component = render(<Button label={label} onPress={onPressSpy} />)
    })

    it('initializes correctly', async () => {
      expect(component).toBeTruthy()
    })

    it('should call onChange', async () => {
      fireEvent.press(component.getByRole('button'))
      expect(onPressSpy).toBeCalled()
    })

    it('should render label', async () => {
      expect(component.findByText('Button text')).toBeTruthy()
    })

    it('should render Primary variant by default', async () => {
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

    it('should render Primary variant in pressed state', async () => {
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
  })

  describe('Base Variant', () => {
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

    it('should render Base variant in pressed state', async () => {
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
  })

  describe('Secondary Variant', () => {
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

    it('should render Secondary variant in pressed state', async () => {
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
  })

  describe('Destructive Variant', () => {
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

    it('should render Destructive variant in pressed state', async () => {
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
  })

  describe('White Variant', () => {
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

    it('should render White variant in pressed state', async () => {
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
  })

  describe('BaseSecondary Variant', () => {
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

    it('should render BaseSecondary variant in pressed state', async () => {
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
})
