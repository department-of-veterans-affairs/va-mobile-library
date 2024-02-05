import 'react-native'
import { RenderAPI, fireEvent, render } from '@testing-library/react-native'
import React from 'react'
// Note: test renderer must be required after react-native.
import 'jest-styled-components'

import { Colors } from '@department-of-veterans-affairs/mobile-tokens'

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

      expect(backgroundColor).toEqual(Colors.primary)
      expect(borderWidth).toEqual(0)
      expect(textColor).toEqual(Colors.grayLightest)
    })

    it('should render Primary variant pressed state', async () => {
      component = render(
        <Button label={label} onPress={onPressSpy} testOnlyPressed={true} />,
      )

      backgroundColor = getButtonStyle(component).backgroundColor
      borderWidth = getButtonStyle(component).borderWidth
      textColor = getTextColor(component)

      expect(backgroundColor).toEqual(Colors.primaryDarker)
      expect(borderWidth).toEqual(0)
      expect(textColor).toEqual(Colors.grayLightest)
    })

    describe('Dark mode', () => {
      beforeEach(() => mockedColorScheme.mockImplementationOnce(() => 'dark'))

      it('should render Primary variant in dark mode', async () => {
        component = render(<Button label={label} onPress={onPressSpy} />)

        backgroundColor = getButtonStyle(component).backgroundColor
        borderWidth = getButtonStyle(component).borderWidth
        textColor = getTextColor(component)

        expect(backgroundColor).toEqual(Colors.uswdsBlueVivid30)
        expect(borderWidth).toEqual(0)
        expect(textColor).toEqual(Colors.black)
      })

      it('should render Primary variant pressed state in dark mode', async () => {
        component = render(
          <Button label={label} onPress={onPressSpy} testOnlyPressed={true} />,
        )

        backgroundColor = getButtonStyle(component).backgroundColor
        borderWidth = getButtonStyle(component).borderWidth
        textColor = getTextColor(component)

        expect(backgroundColor).toEqual(Colors.primaryAltLightest)
        expect(borderWidth).toEqual(0)
        expect(textColor).toEqual(Colors.black)
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

      expect(backgroundColor).toEqual(Colors.grayMedium)
      expect(borderWidth).toEqual(0)
      expect(textColor).toEqual(Colors.grayLightest)
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

      expect(backgroundColor).toEqual(Colors.uswdsGray80)
      expect(borderWidth).toEqual(0)
      expect(textColor).toEqual(Colors.grayLightest)
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

        expect(backgroundColor).toEqual(Colors.grayLightest)
        expect(borderWidth).toEqual(0)
        expect(textColor).toEqual(Colors.black)
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

        expect(backgroundColor).toEqual(Colors.uswdsGray30)
        expect(borderWidth).toEqual(0)
        expect(textColor).toEqual(Colors.black)
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
      expect(borderColor).toEqual(Colors.primary)
      expect(borderWidth).toEqual(2)
      expect(textColor).toEqual(Colors.primary)
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
      expect(borderColor).toEqual(Colors.primaryDarker)
      expect(borderWidth).toEqual(2)
      expect(textColor).toEqual(Colors.primaryDarker)
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
        expect(borderColor).toEqual(Colors.uswdsBlueVivid30)
        expect(borderWidth).toEqual(2)
        expect(textColor).toEqual(Colors.uswdsBlueVivid30)
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
        expect(borderColor).toEqual(Colors.white)
        expect(borderWidth).toEqual(2)
        expect(textColor).toEqual(Colors.white)
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

      expect(backgroundColor).toEqual(Colors.secondaryDark)
      expect(borderColor).toEqual('none')
      expect(borderWidth).toEqual(0)
      expect(textColor).toEqual(Colors.grayLightest)
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

      expect(backgroundColor).toEqual(Colors.uswdsRedVivid80)
      expect(borderWidth).toEqual(0)
      expect(textColor).toEqual(Colors.grayLightest)
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

        expect(backgroundColor).toEqual(Colors.uswdsRedVivid40)
        expect(borderColor).toEqual('none')
        expect(borderWidth).toEqual(0)
        expect(textColor).toEqual(Colors.black)
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

        expect(backgroundColor).toEqual(Colors.secondaryLightest)
        expect(borderWidth).toEqual(0)
        expect(textColor).toEqual(Colors.black)
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

      expect(backgroundColor).toEqual(Colors.grayLightest)
      expect(borderColor).toEqual('none')
      expect(borderWidth).toEqual(0)
      expect(textColor).toEqual(Colors.black)
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

      expect(backgroundColor).toEqual(Colors.uswdsGray30)
      expect(borderWidth).toEqual(0)
      expect(textColor).toEqual(Colors.black)
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

        expect(backgroundColor).toEqual(Colors.grayLightest)
        expect(borderColor).toEqual('none')
        expect(borderWidth).toEqual(0)
        expect(textColor).toEqual(Colors.black)
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

        expect(backgroundColor).toEqual(Colors.uswdsGray30)
        expect(borderWidth).toEqual(0)
        expect(textColor).toEqual(Colors.black)
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
      expect(borderColor).toEqual(Colors.grayMedium)
      expect(borderWidth).toEqual(2)
      expect(textColor).toEqual(Colors.grayMedium)
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
      expect(borderColor).toEqual(Colors.uswdsGray80)
      expect(borderWidth).toEqual(2)
      expect(textColor).toEqual(Colors.uswdsGray80)
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
        expect(borderColor).toEqual(Colors.grayLightest)
        expect(borderWidth).toEqual(2)
        expect(textColor).toEqual(Colors.grayLightest)
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
        expect(borderColor).toEqual(Colors.uswdsGray30)
        expect(borderWidth).toEqual(2)
        expect(textColor).toEqual(Colors.uswdsGray30)
      })
    })
  })
})
