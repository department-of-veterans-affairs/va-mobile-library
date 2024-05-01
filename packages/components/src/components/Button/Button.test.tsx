import 'react-native'
import { fireEvent, render, screen } from '@testing-library/react-native'
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
  let backgroundColor: string,
    borderColor: string,
    borderWidth: number,
    textColor: string

  const commonProps = {
    label: 'Button text',
    onPress: onPressSpy,
    testID: 'testButton',
  }

  const getButtonStyle = () => screen.getByRole('button').props.style
  const getTextColor = () =>
    screen.getByText(commonProps.label).props.style.color

  describe('Basic tests', () => {
    it('initializes correctly', async () => {
      render(<Button {...commonProps} />)
      const button = screen.getByTestId('testButton')
      expect(button).toBeOnTheScreen()
    })

    it('should call onChange', async () => {
      render(<Button {...commonProps} />)
      fireEvent.press(screen.getByRole('button'))
      expect(onPressSpy).toHaveBeenCalled()
    })

    it('should render label', () => {
      render(<Button {...commonProps} />)
      expect(screen.getByText('Button text')).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    const a11yProps = {
      a11yHint: 'Test a11y hint',
      a11yLabel: 'Test a11y label',
    }

    it('should have a11yHint when provided', () => {
      render(<Button {...commonProps} {...a11yProps} />)
      expect(screen.getByHintText('Test a11y hint')).toBeOnTheScreen()
    })

    it('should have a11yLabel when provided', () => {
      render(<Button {...commonProps} {...a11yProps} />)
      expect(screen.getByLabelText('Test a11y label')).toBeOnTheScreen()
    })
  })

  describe('Primary variant', () => {
    it('should render Primary variant by default', async () => {
      render(<Button {...commonProps} />)
      backgroundColor = getButtonStyle().backgroundColor
      borderWidth = getButtonStyle().borderWidth
      textColor = getTextColor()

      expect(backgroundColor).toEqual(Colors.primary)
      expect(borderWidth).toEqual(0)
      expect(textColor).toEqual(Colors.grayLightest)
    })

    it('should render Primary variant pressed state', async () => {
      render(<Button {...commonProps} testOnlyPressed={true} />)

      backgroundColor = getButtonStyle().backgroundColor
      borderWidth = getButtonStyle().borderWidth
      textColor = getTextColor()

      expect(backgroundColor).toEqual(Colors.primaryDarker)
      expect(borderWidth).toEqual(0)
      expect(textColor).toEqual(Colors.grayLightest)
    })

    describe('Dark mode', () => {
      beforeEach(() => mockedColorScheme.mockImplementationOnce(() => 'dark'))

      it('should render Primary variant in dark mode', async () => {
        render(<Button {...commonProps} />)

        backgroundColor = getButtonStyle().backgroundColor
        borderWidth = getButtonStyle().borderWidth
        textColor = getTextColor()

        expect(backgroundColor).toEqual(Colors.uswdsBlueVivid30)
        expect(borderWidth).toEqual(0)
        expect(textColor).toEqual(Colors.black)
      })

      it('should render Primary variant pressed state in dark mode', async () => {
        render(<Button {...commonProps} testOnlyPressed={true} />)

        backgroundColor = getButtonStyle().backgroundColor
        borderWidth = getButtonStyle().borderWidth
        textColor = getTextColor()

        expect(backgroundColor).toEqual(Colors.primaryAltLightest)
        expect(borderWidth).toEqual(0)
        expect(textColor).toEqual(Colors.black)
      })
    })
  })

  describe('Base Variant', () => {
    it('should render Base variant', async () => {
      render(<Button {...commonProps} buttonType={ButtonVariants.Base} />)

      backgroundColor = getButtonStyle().backgroundColor
      borderWidth = getButtonStyle().borderWidth
      textColor = getTextColor()

      expect(backgroundColor).toEqual(Colors.grayMedium)
      expect(borderWidth).toEqual(0)
      expect(textColor).toEqual(Colors.grayLightest)
    })

    it('should render Base variant pressed state', async () => {
      render(
        <Button
          {...commonProps}
          buttonType={ButtonVariants.Base}
          testOnlyPressed={true}
        />,
      )

      backgroundColor = getButtonStyle().backgroundColor
      borderWidth = getButtonStyle().borderWidth
      textColor = getTextColor()

      expect(backgroundColor).toEqual(Colors.uswdsGray80)
      expect(borderWidth).toEqual(0)
      expect(textColor).toEqual(Colors.grayLightest)
    })

    describe('Dark mode', () => {
      beforeEach(() => mockedColorScheme.mockImplementationOnce(() => 'dark'))

      it('should render Base variant in dark mode', async () => {
        render(<Button {...commonProps} buttonType={ButtonVariants.Base} />)

        backgroundColor = getButtonStyle().backgroundColor
        borderWidth = getButtonStyle().borderWidth
        textColor = getTextColor()

        expect(backgroundColor).toEqual(Colors.grayLightest)
        expect(borderWidth).toEqual(0)
        expect(textColor).toEqual(Colors.black)
      })

      it('should render Base variant pressed state and dark mode', async () => {
        render(
          <Button
            {...commonProps}
            buttonType={ButtonVariants.Base}
            testOnlyPressed={true}
          />,
        )

        backgroundColor = getButtonStyle().backgroundColor
        borderWidth = getButtonStyle().borderWidth
        textColor = getTextColor()

        expect(backgroundColor).toEqual(Colors.uswdsGray30)
        expect(borderWidth).toEqual(0)
        expect(textColor).toEqual(Colors.black)
      })
    })
  })

  describe('Secondary Variant', () => {
    it('should render Secondary variant', async () => {
      render(<Button {...commonProps} buttonType={ButtonVariants.Secondary} />)

      backgroundColor = getButtonStyle().backgroundColor
      borderColor = getButtonStyle().borderColor
      borderWidth = getButtonStyle().borderWidth
      textColor = getTextColor()

      expect(backgroundColor).toEqual('transparent')
      expect(borderColor).toEqual(Colors.primary)
      expect(borderWidth).toEqual(2)
      expect(textColor).toEqual(Colors.primary)
    })

    it('should render Secondary variant pressed state', async () => {
      render(
        <Button
          {...commonProps}
          buttonType={ButtonVariants.Secondary}
          testOnlyPressed={true}
        />,
      )

      backgroundColor = getButtonStyle().backgroundColor
      borderColor = getButtonStyle().borderColor
      borderWidth = getButtonStyle().borderWidth
      textColor = getTextColor()

      expect(backgroundColor).toEqual('transparent')
      expect(borderColor).toEqual(Colors.primaryDarker)
      expect(borderWidth).toEqual(2)
      expect(textColor).toEqual(Colors.primaryDarker)
    })

    describe('Dark mode', () => {
      beforeEach(() => mockedColorScheme.mockImplementationOnce(() => 'dark'))

      it('should render Secondary variant in dark mode', async () => {
        render(
          <Button {...commonProps} buttonType={ButtonVariants.Secondary} />,
        )

        backgroundColor = getButtonStyle().backgroundColor
        borderColor = getButtonStyle().borderColor
        borderWidth = getButtonStyle().borderWidth
        textColor = getTextColor()

        expect(backgroundColor).toEqual('transparent')
        expect(borderColor).toEqual(Colors.uswdsBlueVivid30)
        expect(borderWidth).toEqual(2)
        expect(textColor).toEqual(Colors.uswdsBlueVivid30)
      })

      it('should render Secondary variant pressed state in dark mode', async () => {
        render(
          <Button
            {...commonProps}
            buttonType={ButtonVariants.Secondary}
            testOnlyPressed={true}
          />,
        )

        backgroundColor = getButtonStyle().backgroundColor
        borderColor = getButtonStyle().borderColor
        borderWidth = getButtonStyle().borderWidth
        textColor = getTextColor()

        expect(backgroundColor).toEqual('transparent')
        expect(borderColor).toEqual(Colors.white)
        expect(borderWidth).toEqual(2)
        expect(textColor).toEqual(Colors.white)
      })
    })
  })

  describe('Destructive Variant', () => {
    it('should render Destructive variant', async () => {
      render(
        <Button {...commonProps} buttonType={ButtonVariants.Destructive} />,
      )

      backgroundColor = getButtonStyle().backgroundColor
      borderColor = getButtonStyle().borderColor
      borderWidth = getButtonStyle().borderWidth
      textColor = getTextColor()

      expect(backgroundColor).toEqual(Colors.secondaryDark)
      expect(borderColor).toEqual('none')
      expect(borderWidth).toEqual(0)
      expect(textColor).toEqual(Colors.grayLightest)
    })

    it('should render Destructive variant pressed state', async () => {
      render(
        <Button
          {...commonProps}
          buttonType={ButtonVariants.Destructive}
          testOnlyPressed={true}
        />,
      )

      backgroundColor = getButtonStyle().backgroundColor
      borderColor = getButtonStyle().borderColor
      borderWidth = getButtonStyle().borderWidth
      textColor = getTextColor()

      expect(backgroundColor).toEqual(Colors.uswdsRedVivid80)
      expect(borderWidth).toEqual(0)
      expect(textColor).toEqual(Colors.grayLightest)
    })

    describe('Dark mode', () => {
      beforeEach(() => mockedColorScheme.mockImplementationOnce(() => 'dark'))

      it('should render Destructive variant in dark mode', async () => {
        render(
          <Button {...commonProps} buttonType={ButtonVariants.Destructive} />,
        )

        backgroundColor = getButtonStyle().backgroundColor
        borderColor = getButtonStyle().borderColor
        borderWidth = getButtonStyle().borderWidth
        textColor = getTextColor()

        expect(backgroundColor).toEqual(Colors.uswdsRedVivid40)
        expect(borderColor).toEqual('none')
        expect(borderWidth).toEqual(0)
        expect(textColor).toEqual(Colors.black)
      })

      it('should render Destructive variant pressed state in dark mode', async () => {
        render(
          <Button
            {...commonProps}
            buttonType={ButtonVariants.Destructive}
            testOnlyPressed={true}
          />,
        )

        backgroundColor = getButtonStyle().backgroundColor
        borderWidth = getButtonStyle().borderWidth
        textColor = getTextColor()

        expect(backgroundColor).toEqual(Colors.secondaryLightest)
        expect(borderWidth).toEqual(0)
        expect(textColor).toEqual(Colors.black)
      })
    })
  })

  describe('White Variant', () => {
    it('should render White variant', async () => {
      render(<Button {...commonProps} buttonType={ButtonVariants.White} />)

      backgroundColor = getButtonStyle().backgroundColor
      borderColor = getButtonStyle().borderColor
      borderWidth = getButtonStyle().borderWidth
      textColor = getTextColor()

      expect(backgroundColor).toEqual(Colors.grayLightest)
      expect(borderColor).toEqual('none')
      expect(borderWidth).toEqual(0)
      expect(textColor).toEqual(Colors.black)
    })

    it('should render White variant pressed state', async () => {
      render(
        <Button
          {...commonProps}
          buttonType={ButtonVariants.White}
          testOnlyPressed={true}
        />,
      )

      backgroundColor = getButtonStyle().backgroundColor
      borderWidth = getButtonStyle().borderWidth
      textColor = getTextColor()

      expect(backgroundColor).toEqual(Colors.uswdsGray30)
      expect(borderWidth).toEqual(0)
      expect(textColor).toEqual(Colors.black)
    })

    describe('Dark mode', () => {
      beforeEach(() => mockedColorScheme.mockImplementationOnce(() => 'dark'))

      it('should render White variant in dark mode', async () => {
        render(<Button {...commonProps} buttonType={ButtonVariants.White} />)

        backgroundColor = getButtonStyle().backgroundColor
        borderColor = getButtonStyle().borderColor
        borderWidth = getButtonStyle().borderWidth
        textColor = getTextColor()

        expect(backgroundColor).toEqual(Colors.grayLightest)
        expect(borderColor).toEqual('none')
        expect(borderWidth).toEqual(0)
        expect(textColor).toEqual(Colors.black)
      })

      it('should render White variant pressed state in dark mode', async () => {
        render(
          <Button
            {...commonProps}
            buttonType={ButtonVariants.White}
            testOnlyPressed={true}
          />,
        )

        backgroundColor = getButtonStyle().backgroundColor
        borderWidth = getButtonStyle().borderWidth
        textColor = getTextColor()

        expect(backgroundColor).toEqual(Colors.uswdsGray30)
        expect(borderWidth).toEqual(0)
        expect(textColor).toEqual(Colors.black)
      })
    })
  })

  describe('BaseSecondary Variant', () => {
    it('should render BaseSecondary variant', async () => {
      render(
        <Button {...commonProps} buttonType={ButtonVariants.BaseSecondary} />,
      )

      backgroundColor = getButtonStyle().backgroundColor
      borderColor = getButtonStyle().borderColor
      borderWidth = getButtonStyle().borderWidth
      textColor = getTextColor()

      expect(backgroundColor).toEqual('transparent')
      expect(borderColor).toEqual(Colors.grayMedium)
      expect(borderWidth).toEqual(2)
      expect(textColor).toEqual(Colors.grayMedium)
    })

    it('should render BaseSecondary variant pressed state', async () => {
      render(
        <Button
          {...commonProps}
          buttonType={ButtonVariants.BaseSecondary}
          testOnlyPressed={true}
        />,
      )

      backgroundColor = getButtonStyle().backgroundColor
      borderColor = getButtonStyle().borderColor
      borderWidth = getButtonStyle().borderWidth
      textColor = getTextColor()

      expect(backgroundColor).toEqual('transparent')
      expect(borderColor).toEqual(Colors.uswdsGray80)
      expect(borderWidth).toEqual(2)
      expect(textColor).toEqual(Colors.uswdsGray80)
    })

    describe('Dark mode', () => {
      beforeEach(() => mockedColorScheme.mockImplementationOnce(() => 'dark'))

      it('should render BaseSecondary variant in dark mode', async () => {
        render(
          <Button {...commonProps} buttonType={ButtonVariants.BaseSecondary} />,
        )

        backgroundColor = getButtonStyle().backgroundColor
        borderColor = getButtonStyle().borderColor
        borderWidth = getButtonStyle().borderWidth
        textColor = getTextColor()

        expect(backgroundColor).toEqual('transparent')
        expect(borderColor).toEqual(Colors.grayLightest)
        expect(borderWidth).toEqual(2)
        expect(textColor).toEqual(Colors.grayLightest)
      })

      it('should render BaseSecondary variant pressed state in dark mode', async () => {
        render(
          <Button
            {...commonProps}
            buttonType={ButtonVariants.BaseSecondary}
            testOnlyPressed={true}
          />,
        )

        backgroundColor = getButtonStyle().backgroundColor
        borderColor = getButtonStyle().borderColor
        borderWidth = getButtonStyle().borderWidth
        textColor = getTextColor()

        expect(backgroundColor).toEqual('transparent')
        expect(borderColor).toEqual(Colors.uswdsGray30)
        expect(borderWidth).toEqual(2)
        expect(textColor).toEqual(Colors.uswdsGray30)
      })
    })
  })
})
