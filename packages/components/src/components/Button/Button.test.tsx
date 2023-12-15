import 'react-native'
import { RenderAPI, fireEvent, render } from '@testing-library/react-native'
import React from 'react'
// Note: test renderer must be required after react-native.
import 'jest-styled-components'

import * as DesignTokens from '@department-of-veterans-affairs/mobile-tokens'

import { Button, ButtonVariants } from './Button'

const onPressSpy = jest.fn()
const mockedColorScheme = jest.fn()

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => {
  return {
    default: mockedColorScheme,
  }
})

describe('Button', () => {
  let component: RenderAPI
  let backgroundColor: string,
    borderColor: string,
    borderWidth: number,
    textColor: string

  const label = 'Button text'

  const getButtonStyle = (element: RenderAPI) =>
    element.getByRole('button').props.style
  const getTextColor = (element: RenderAPI) =>
    element.getByText(label).props.style.color

  describe('Primary variant and basic tests', () => {
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
      backgroundColor = getButtonStyle(component).backgroundColor
      borderWidth = getButtonStyle(component).borderWidth
      textColor = getTextColor(component)

      expect(backgroundColor).toEqual(
        DesignTokens.colorUswdsSystemColorBlueVivid60,
      )
      expect(borderWidth).toEqual(0)
      expect(textColor).toEqual(DesignTokens.colorGrayLightest)
    })

    it('should render Primary variant pressed state', async () => {
      component = render(
        <Button label={label} onPress={onPressSpy} testOnlyPressed={true} />,
      )

      backgroundColor = getButtonStyle(component).backgroundColor
      borderWidth = getButtonStyle(component).borderWidth
      textColor = getTextColor(component)

      expect(backgroundColor).toEqual(
        DesignTokens.colorUswdsSystemColorBlueWarmVivid80,
      )
      expect(borderWidth).toEqual(0)
      expect(textColor).toEqual(DesignTokens.colorGrayLightest)
    })

    describe('Dark mode', () => {
      beforeEach(() => mockedColorScheme.mockImplementationOnce(() => 'dark'))

      it('should render Primary variant in dark mode', async () => {
        component = render(<Button label={label} onPress={onPressSpy} />)

        backgroundColor = getButtonStyle(component).backgroundColor
        borderWidth = getButtonStyle(component).borderWidth
        textColor = getTextColor(component)

        expect(backgroundColor).toEqual(
          DesignTokens.colorUswdsSystemColorBlueVivid30,
        )
        expect(borderWidth).toEqual(0)
        expect(textColor).toEqual(DesignTokens.colorBlack)
      })

      it('should render Primary variant pressed state in dark mode', async () => {
        component = render(
          <Button label={label} onPress={onPressSpy} testOnlyPressed={true} />,
        )

        backgroundColor = getButtonStyle(component).backgroundColor
        borderWidth = getButtonStyle(component).borderWidth
        textColor = getTextColor(component)

        expect(backgroundColor).toEqual(DesignTokens.colorPrimaryAltLightest)
        expect(borderWidth).toEqual(0)
        expect(textColor).toEqual(DesignTokens.colorBlack)
      })
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

      backgroundColor = getButtonStyle(component).backgroundColor
      borderWidth = getButtonStyle(component).borderWidth
      textColor = getTextColor(component)

      expect(backgroundColor).toEqual(DesignTokens.colorGrayMedium)
      expect(borderWidth).toEqual(0)
      expect(textColor).toEqual(DesignTokens.colorGrayLightest)
    })

    it('should render Base variant pressed state', async () => {
      component = render(
        <Button
          label={label}
          onPress={onPressSpy}
          buttonType={ButtonVariants.Base}
          testOnlyPressed={true}
        />,
      )

      backgroundColor = getButtonStyle(component).backgroundColor
      borderWidth = getButtonStyle(component).borderWidth
      textColor = getTextColor(component)

      expect(backgroundColor).toEqual(DesignTokens.colorUswdsSystemColorGray80)
      expect(borderWidth).toEqual(0)
      expect(textColor).toEqual(DesignTokens.colorGrayLightest)
    })

    describe('Dark mode', () => {
      beforeEach(() => mockedColorScheme.mockImplementationOnce(() => 'dark'))

      it('should render Base variant in dark mode', async () => {
        component = render(
          <Button
            label={label}
            onPress={onPressSpy}
            buttonType={ButtonVariants.Base}
          />,
        )

        backgroundColor = getButtonStyle(component).backgroundColor
        borderWidth = getButtonStyle(component).borderWidth
        textColor = getTextColor(component)

        expect(backgroundColor).toEqual(DesignTokens.colorGrayLightest)
        expect(borderWidth).toEqual(0)
        expect(textColor).toEqual(DesignTokens.colorBlack)
      })

      it('should render Base variant pressed state and dark mode', async () => {
        component = render(
          <Button
            label={label}
            onPress={onPressSpy}
            buttonType={ButtonVariants.Base}
            testOnlyPressed={true}
          />,
        )

        backgroundColor = getButtonStyle(component).backgroundColor
        borderWidth = getButtonStyle(component).borderWidth
        textColor = getTextColor(component)

        expect(backgroundColor).toEqual(
          DesignTokens.colorUswdsSystemColorGray30,
        )
        expect(borderWidth).toEqual(0)
        expect(textColor).toEqual(DesignTokens.colorBlack)
      })
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

      backgroundColor = getButtonStyle(component).backgroundColor
      borderColor = getButtonStyle(component).borderColor
      borderWidth = getButtonStyle(component).borderWidth
      textColor = getTextColor(component)

      expect(backgroundColor).toEqual('transparent')
      expect(borderColor).toEqual(DesignTokens.colorUswdsSystemColorBlueVivid60)
      expect(borderWidth).toEqual(2)
      expect(textColor).toEqual(DesignTokens.colorUswdsSystemColorBlueVivid60)
    })

    it('should render Secondary variant pressed state', async () => {
      component = render(
        <Button
          label={label}
          onPress={onPressSpy}
          buttonType={ButtonVariants.Secondary}
          testOnlyPressed={true}
        />,
      )

      backgroundColor = getButtonStyle(component).backgroundColor
      borderColor = getButtonStyle(component).borderColor
      borderWidth = getButtonStyle(component).borderWidth
      textColor = getTextColor(component)

      expect(backgroundColor).toEqual('transparent')
      expect(borderColor).toEqual(
        DesignTokens.colorUswdsSystemColorBlueWarmVivid80,
      )
      expect(borderWidth).toEqual(2)
      expect(textColor).toEqual(
        DesignTokens.colorUswdsSystemColorBlueWarmVivid80,
      )
    })

    describe('Dark mode', () => {
      beforeEach(() => mockedColorScheme.mockImplementationOnce(() => 'dark'))

      it('should render Secondary variant in dark mode', async () => {
        component = render(
          <Button
            label={label}
            onPress={onPressSpy}
            buttonType={ButtonVariants.Secondary}
          />,
        )

        backgroundColor = getButtonStyle(component).backgroundColor
        borderColor = getButtonStyle(component).borderColor
        borderWidth = getButtonStyle(component).borderWidth
        textColor = getTextColor(component)

        expect(backgroundColor).toEqual('transparent')
        expect(borderColor).toEqual(
          DesignTokens.colorUswdsSystemColorBlueVivid30,
        )
        expect(borderWidth).toEqual(2)
        expect(textColor).toEqual(DesignTokens.colorUswdsSystemColorBlueVivid30)
      })

      it('should render Secondary variant pressed state in dark mode', async () => {
        component = render(
          <Button
            label={label}
            onPress={onPressSpy}
            buttonType={ButtonVariants.Secondary}
            testOnlyPressed={true}
          />,
        )

        backgroundColor = getButtonStyle(component).backgroundColor
        borderColor = getButtonStyle(component).borderColor
        borderWidth = getButtonStyle(component).borderWidth
        textColor = getTextColor(component)

        expect(backgroundColor).toEqual('transparent')
        expect(borderColor).toEqual(DesignTokens.colorWhite)
        expect(borderWidth).toEqual(2)
        expect(textColor).toEqual(DesignTokens.colorWhite)
      })
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

      backgroundColor = getButtonStyle(component).backgroundColor
      borderColor = getButtonStyle(component).borderColor
      borderWidth = getButtonStyle(component).borderWidth
      textColor = getTextColor(component)

      expect(backgroundColor).toEqual(
        DesignTokens.colorUswdsSystemColorRedVivid60,
      )
      expect(borderColor).toEqual('none')
      expect(borderWidth).toEqual(0)
      expect(textColor).toEqual(DesignTokens.colorGrayLightest)
    })

    it('should render Destructive variant pressed state', async () => {
      component = render(
        <Button
          label={label}
          onPress={onPressSpy}
          buttonType={ButtonVariants.Destructive}
          testOnlyPressed={true}
        />,
      )

      backgroundColor = getButtonStyle(component).backgroundColor
      borderColor = getButtonStyle(component).borderColor
      borderWidth = getButtonStyle(component).borderWidth
      textColor = getTextColor(component)

      expect(backgroundColor).toEqual(
        DesignTokens.colorUswdsSystemColorRedVivid80,
      )
      expect(borderWidth).toEqual(0)
      expect(textColor).toEqual(DesignTokens.colorGrayLightest)
    })

    describe('Dark mode', () => {
      beforeEach(() => mockedColorScheme.mockImplementationOnce(() => 'dark'))

      it('should render Destructive variant in dark mode', async () => {
        component = render(
          <Button
            label={label}
            onPress={onPressSpy}
            buttonType={ButtonVariants.Destructive}
          />,
        )

        backgroundColor = getButtonStyle(component).backgroundColor
        borderColor = getButtonStyle(component).borderColor
        borderWidth = getButtonStyle(component).borderWidth
        textColor = getTextColor(component)

        expect(backgroundColor).toEqual(
          DesignTokens.colorUswdsSystemColorRedVivid40,
        )
        expect(borderColor).toEqual('none')
        expect(borderWidth).toEqual(0)
        expect(textColor).toEqual(DesignTokens.colorBlack)
      })

      it('should render Destructive variant pressed state in dark mode', async () => {
        component = render(
          <Button
            label={label}
            onPress={onPressSpy}
            buttonType={ButtonVariants.Destructive}
            testOnlyPressed={true}
          />,
        )

        backgroundColor = getButtonStyle(component).backgroundColor
        borderWidth = getButtonStyle(component).borderWidth
        textColor = getTextColor(component)

        expect(backgroundColor).toEqual(DesignTokens.colorSecondaryLightest)
        expect(borderWidth).toEqual(0)
        expect(textColor).toEqual(DesignTokens.colorBlack)
      })
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

      backgroundColor = getButtonStyle(component).backgroundColor
      borderColor = getButtonStyle(component).borderColor
      borderWidth = getButtonStyle(component).borderWidth
      textColor = getTextColor(component)

      expect(backgroundColor).toEqual(DesignTokens.colorGrayLightest)
      expect(borderColor).toEqual('none')
      expect(borderWidth).toEqual(0)
      expect(textColor).toEqual(DesignTokens.colorBlack)
    })

    it('should render White variant pressed state', async () => {
      component = render(
        <Button
          label={label}
          onPress={onPressSpy}
          buttonType={ButtonVariants.White}
          testOnlyPressed={true}
        />,
      )

      backgroundColor = getButtonStyle(component).backgroundColor
      borderWidth = getButtonStyle(component).borderWidth
      textColor = getTextColor(component)

      expect(backgroundColor).toEqual(DesignTokens.colorUswdsSystemColorGray30)
      expect(borderWidth).toEqual(0)
      expect(textColor).toEqual(DesignTokens.colorBlack)
    })

    describe('Dark mode', () => {
      beforeEach(() => mockedColorScheme.mockImplementationOnce(() => 'dark'))

      it('should render White variant in dark mode', async () => {
        component = render(
          <Button
            label={label}
            onPress={onPressSpy}
            buttonType={ButtonVariants.White}
          />,
        )

        backgroundColor = getButtonStyle(component).backgroundColor
        borderColor = getButtonStyle(component).borderColor
        borderWidth = getButtonStyle(component).borderWidth
        textColor = getTextColor(component)

        expect(backgroundColor).toEqual(DesignTokens.colorGrayLightest)
        expect(borderColor).toEqual('none')
        expect(borderWidth).toEqual(0)
        expect(textColor).toEqual(DesignTokens.colorBlack)
      })

      it('should render White variant pressed state in dark mode', async () => {
        component = render(
          <Button
            label={label}
            onPress={onPressSpy}
            buttonType={ButtonVariants.White}
            testOnlyPressed={true}
          />,
        )

        backgroundColor = getButtonStyle(component).backgroundColor
        borderWidth = getButtonStyle(component).borderWidth
        textColor = getTextColor(component)

        expect(backgroundColor).toEqual(
          DesignTokens.colorUswdsSystemColorGray30,
        )
        expect(borderWidth).toEqual(0)
        expect(textColor).toEqual(DesignTokens.colorBlack)
      })
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

      backgroundColor = getButtonStyle(component).backgroundColor
      borderColor = getButtonStyle(component).borderColor
      borderWidth = getButtonStyle(component).borderWidth
      textColor = getTextColor(component)

      expect(backgroundColor).toEqual('transparent')
      expect(borderColor).toEqual(DesignTokens.colorGrayMedium)
      expect(borderWidth).toEqual(2)
      expect(textColor).toEqual(DesignTokens.colorGrayMedium)
    })

    it('should render BaseSecondary variant pressed state', async () => {
      component = render(
        <Button
          label={label}
          onPress={onPressSpy}
          buttonType={ButtonVariants.BaseSecondary}
          testOnlyPressed={true}
        />,
      )

      backgroundColor = getButtonStyle(component).backgroundColor
      borderColor = getButtonStyle(component).borderColor
      borderWidth = getButtonStyle(component).borderWidth
      textColor = getTextColor(component)

      expect(backgroundColor).toEqual('transparent')
      expect(borderColor).toEqual(DesignTokens.colorUswdsSystemColorGray80)
      expect(borderWidth).toEqual(2)
      expect(textColor).toEqual(DesignTokens.colorUswdsSystemColorGray80)
    })

    describe('Dark mode', () => {
      beforeEach(() => mockedColorScheme.mockImplementationOnce(() => 'dark'))

      it('should render BaseSecondary variant in dark mode', async () => {
        component = render(
          <Button
            label={label}
            onPress={onPressSpy}
            buttonType={ButtonVariants.BaseSecondary}
          />,
        )

        backgroundColor = getButtonStyle(component).backgroundColor
        borderColor = getButtonStyle(component).borderColor
        borderWidth = getButtonStyle(component).borderWidth
        textColor = getTextColor(component)

        expect(backgroundColor).toEqual('transparent')
        expect(borderColor).toEqual(DesignTokens.colorGrayLightest)
        expect(borderWidth).toEqual(2)
        expect(textColor).toEqual(DesignTokens.colorGrayLightest)
      })

      it('should render BaseSecondary variant pressed state in dark mode', async () => {
        component = render(
          <Button
            label={label}
            onPress={onPressSpy}
            buttonType={ButtonVariants.BaseSecondary}
            testOnlyPressed={true}
          />,
        )

        backgroundColor = getButtonStyle(component).backgroundColor
        borderColor = getButtonStyle(component).borderColor
        borderWidth = getButtonStyle(component).borderWidth
        textColor = getTextColor(component)

        expect(backgroundColor).toEqual('transparent')
        expect(borderColor).toEqual(DesignTokens.colorUswdsSystemColorGray30)
        expect(borderWidth).toEqual(2)
        expect(textColor).toEqual(DesignTokens.colorUswdsSystemColorGray30)
      })
    })
  })
})
