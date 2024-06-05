import 'react-native'
import { Colors } from '@department-of-veterans-affairs/mobile-tokens'
import { fireEvent, render, screen } from '@testing-library/react-native'
import React from 'react'
// Note: test renderer must be required after react-native.
import 'jest-styled-components'

import { Button, ButtonVariants } from './Button'

const onPressSpy = jest.fn()
const mockedColorScheme = jest.fn()

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => {
  return {
    default: mockedColorScheme,
  }
})

describe('Button', () => {
  const commonProps = {
    label: 'Button text',
    onPress: onPressSpy,
    testID: 'testButton',
  }

  const getButtonText = () => screen.getByText(commonProps.label)

  describe('Basic tests', () => {
    it('initializes correctly', async () => {
      render(<Button {...commonProps} />)
      expect(screen.getByTestId('testButton')).toBeOnTheScreen()
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

      expect(screen.root).toHaveStyle({
        backgroundColor: Colors.vadsColorActionSurfaceDefaultOnLight,
        borderWidth: 0,
      })

      expect(getButtonText()).toHaveStyle({
        color: Colors.vadsColorForegroundInverseOnLight,
      })
    })

    it('should render Primary variant pressed state', async () => {
      render(<Button {...commonProps} testOnlyPressed={true} />)

      expect(screen.root).toHaveStyle({
        backgroundColor: Colors.vadsColorActionSurfaceDefaultActiveOnLight,
        borderWidth: 0,
      })

      expect(getButtonText()).toHaveStyle({
        color: Colors.vadsColorForegroundInverseOnLight,
      })
    })

    describe('Dark mode', () => {
      beforeEach(() => mockedColorScheme.mockImplementationOnce(() => 'dark'))

      it('should render Primary variant in dark mode', async () => {
        render(<Button {...commonProps} />)

        expect(screen.root).toHaveStyle({
          backgroundColor: Colors.vadsColorActionSurfaceDefaultOnDark,
          borderWidth: 0,
        })

        expect(getButtonText()).toHaveStyle({
          color: Colors.vadsColorForegroundInverseOnDark,
        })
      })

      it('should render Primary variant pressed state in dark mode', async () => {
        render(<Button {...commonProps} testOnlyPressed={true} />)

        expect(screen.root).toHaveStyle({
          backgroundColor: Colors.vadsColorActionSurfaceDefaultActiveOnDark,
          borderWidth: 0,
        })

        expect(getButtonText()).toHaveStyle({
          color: Colors.vadsColorForegroundInverseOnDark,
        })
      })
    })
  })

  describe('Base Variant', () => {
    it('should render Base variant', async () => {
      render(<Button {...commonProps} buttonType={ButtonVariants.Base} />)

      expect(screen.root).toHaveStyle({
        backgroundColor: Colors.vadsColorActionSurfaceBaseOnLight,
        borderWidth: 0,
      })

      expect(getButtonText()).toHaveStyle({
        color: Colors.vadsColorForegroundInverseOnLight,
      })
    })

    it('should render Base variant pressed state', async () => {
      render(
        <Button
          {...commonProps}
          buttonType={ButtonVariants.Base}
          testOnlyPressed={true}
        />,
      )

      expect(screen.root).toHaveStyle({
        backgroundColor: Colors.vadsColorActionSurfaceBaseActiveOnLight,
        borderWidth: 0,
      })

      expect(getButtonText()).toHaveStyle({
        color: Colors.vadsColorForegroundInverseOnLight,
      })
    })

    describe('Dark mode', () => {
      beforeEach(() => mockedColorScheme.mockImplementationOnce(() => 'dark'))

      it('should render Base variant in dark mode', async () => {
        render(<Button {...commonProps} buttonType={ButtonVariants.Base} />)

        expect(screen.root).toHaveStyle({
          backgroundColor: Colors.vadsColorActionSurfaceBaseOnDark,
          borderWidth: 0,
        })

        expect(getButtonText()).toHaveStyle({
          color: Colors.vadsColorForegroundInverseOnDark,
        })
      })

      it('should render Base variant pressed state and dark mode', async () => {
        render(
          <Button
            {...commonProps}
            buttonType={ButtonVariants.Base}
            testOnlyPressed={true}
          />,
        )

        expect(screen.root).toHaveStyle({
          backgroundColor: Colors.vadsColorActionSurfaceBaseActiveOnDark,
          borderWidth: 0,
        })

        expect(getButtonText()).toHaveStyle({
          color: Colors.vadsColorForegroundInverseOnDark,
        })
      })
    })
  })

  describe('Secondary Variant', () => {
    it('should render Secondary variant', async () => {
      render(<Button {...commonProps} buttonType={ButtonVariants.Secondary} />)

      expect(screen.root).toHaveStyle({
        backgroundColor: 'transparent',
        borderColor: Colors.vadsColorActionBorderDefaultOnLight,
        borderWidth: 2,
      })

      expect(getButtonText()).toHaveStyle({
        color: Colors.vadsColorActionForegroundDefaultOnLight,
      })
    })

    it('should render Secondary variant pressed state', async () => {
      render(
        <Button
          {...commonProps}
          buttonType={ButtonVariants.Secondary}
          testOnlyPressed={true}
        />,
      )

      expect(screen.root).toHaveStyle({
        backgroundColor: 'transparent',
        borderColor: Colors.vadsColorActionBorderDefaultActiveOnLight,
        borderWidth: 2,
      })

      expect(getButtonText()).toHaveStyle({
        color: Colors.vadsColorActionForegroundDefaultActiveOnLight,
      })
    })

    describe('Dark mode', () => {
      beforeEach(() => mockedColorScheme.mockImplementationOnce(() => 'dark'))

      it('should render Secondary variant in dark mode', async () => {
        render(
          <Button {...commonProps} buttonType={ButtonVariants.Secondary} />,
        )

        expect(screen.root).toHaveStyle({
          backgroundColor: 'transparent',
          borderColor: Colors.vadsColorActionBorderDefaultOnDark,
          borderWidth: 2,
        })

        expect(getButtonText()).toHaveStyle({
          color: Colors.vadsColorActionForegroundDefaultOnDark,
        })
      })

      it('should render Secondary variant pressed state in dark mode', async () => {
        render(
          <Button
            {...commonProps}
            buttonType={ButtonVariants.Secondary}
            testOnlyPressed={true}
          />,
        )

        expect(screen.root).toHaveStyle({
          backgroundColor: 'transparent',
          borderColor: Colors.vadsColorActionBorderDefaultActiveOnDark,
          borderWidth: 2,
        })

        expect(getButtonText()).toHaveStyle({
          color: Colors.vadsColorActionForegroundDefaultActiveOnDark,
        })
      })
    })
  })

  describe('Destructive Variant', () => {
    it('should render Destructive variant', async () => {
      render(
        <Button {...commonProps} buttonType={ButtonVariants.Destructive} />,
      )

      expect(screen.root).toHaveStyle({
        backgroundColor: Colors.vadsColorActionSurfaceDestructiveOnLight,
        borderColor: 'none',
        borderWidth: 0,
      })

      expect(getButtonText()).toHaveStyle({
        color: Colors.vadsColorForegroundInverseOnLight,
      })
    })

    it('should render Destructive variant pressed state', async () => {
      render(
        <Button
          {...commonProps}
          buttonType={ButtonVariants.Destructive}
          testOnlyPressed={true}
        />,
      )

      expect(screen.root).toHaveStyle({
        backgroundColor: Colors.vadsColorActionSurfaceDestructiveActiveOnLight,
        borderColor: 'none',
        borderWidth: 0,
      })

      expect(getButtonText()).toHaveStyle({
        color: Colors.vadsColorForegroundInverseOnLight,
      })
    })

    describe('Dark mode', () => {
      beforeEach(() => mockedColorScheme.mockImplementationOnce(() => 'dark'))

      it('should render Destructive variant in dark mode', async () => {
        render(
          <Button {...commonProps} buttonType={ButtonVariants.Destructive} />,
        )

        expect(screen.root).toHaveStyle({
          backgroundColor: Colors.vadsColorActionSurfaceDestructiveOnDark,
          borderColor: 'none',
          borderWidth: 0,
        })

        expect(getButtonText()).toHaveStyle({
          color: Colors.vadsColorForegroundInverseOnDark,
        })
      })

      it('should render Destructive variant pressed state in dark mode', async () => {
        render(
          <Button
            {...commonProps}
            buttonType={ButtonVariants.Destructive}
            testOnlyPressed={true}
          />,
        )

        expect(screen.root).toHaveStyle({
          backgroundColor: Colors.vadsColorActionSurfaceDestructiveActiveOnDark,
          borderColor: 'none',
          borderWidth: 0,
        })

        expect(getButtonText()).toHaveStyle({
          color: Colors.vadsColorForegroundInverseOnDark,
        })
      })
    })
  })

  describe('White Variant', () => {
    it('should render White variant', async () => {
      render(<Button {...commonProps} buttonType={ButtonVariants.White} />)

      expect(screen.root).toHaveStyle({
        backgroundColor: Colors.vadsColorBaseLightest,
        borderColor: 'none',
        borderWidth: 0,
      })

      expect(getButtonText()).toHaveStyle({
        color: Colors.vadsColorBlack,
      })
    })

    it('should render White variant pressed state', async () => {
      render(
        <Button
          {...commonProps}
          buttonType={ButtonVariants.White}
          testOnlyPressed={true}
        />,
      )

      expect(screen.root).toHaveStyle({
        backgroundColor: Colors.uswdsSystemColorGray30,
        borderColor: 'none',
        borderWidth: 0,
      })

      expect(getButtonText()).toHaveStyle({
        color: Colors.vadsColorBlack,
      })
    })

    describe('Dark mode', () => {
      beforeEach(() => mockedColorScheme.mockImplementationOnce(() => 'dark'))

      it('should render White variant in dark mode', async () => {
        render(<Button {...commonProps} buttonType={ButtonVariants.White} />)

        expect(screen.root).toHaveStyle({
          backgroundColor: Colors.vadsColorBaseLightest,
          borderColor: 'none',
          borderWidth: 0,
        })

        expect(getButtonText()).toHaveStyle({
          color: Colors.vadsColorBlack,
        })
      })

      it('should render White variant pressed state in dark mode', async () => {
        render(
          <Button
            {...commonProps}
            buttonType={ButtonVariants.White}
            testOnlyPressed={true}
          />,
        )

        expect(screen.root).toHaveStyle({
          backgroundColor: Colors.uswdsSystemColorGray30,
          borderColor: 'none',
          borderWidth: 0,
        })

        expect(getButtonText()).toHaveStyle({
          color: Colors.vadsColorBlack,
        })
      })
    })
  })

  describe('BaseSecondary Variant', () => {
    it('should render BaseSecondary variant', async () => {
      render(
        <Button {...commonProps} buttonType={ButtonVariants.BaseSecondary} />,
      )

      expect(screen.root).toHaveStyle({
        backgroundColor: 'transparent',
        borderColor: Colors.vadsColorActionBorderBaseOnLight,
        borderWidth: 2,
      })

      expect(getButtonText()).toHaveStyle({
        color: Colors.vadsColorActionForegroundBaseOnLight,
      })
    })

    it('should render BaseSecondary variant pressed state', async () => {
      render(
        <Button
          {...commonProps}
          buttonType={ButtonVariants.BaseSecondary}
          testOnlyPressed={true}
        />,
      )

      expect(screen.root).toHaveStyle({
        backgroundColor: 'transparent',
        borderColor: Colors.vadsColorActionBorderBaseActiveOnLight,
        borderWidth: 2,
      })

      expect(getButtonText()).toHaveStyle({
        color: Colors.vadsColorActionForegroundBaseActiveOnLight,
      })
    })

    describe('Dark mode', () => {
      beforeEach(() => mockedColorScheme.mockImplementationOnce(() => 'dark'))

      it('should render BaseSecondary variant in dark mode', async () => {
        render(
          <Button {...commonProps} buttonType={ButtonVariants.BaseSecondary} />,
        )

        expect(screen.root).toHaveStyle({
          backgroundColor: 'transparent',
          borderColor: Colors.vadsColorActionBorderBaseOnDark,
          borderWidth: 2,
        })

        expect(getButtonText()).toHaveStyle({
          color: Colors.vadsColorActionForegroundBaseOnDark,
        })
      })

      it('should render BaseSecondary variant pressed state in dark mode', async () => {
        render(
          <Button
            {...commonProps}
            buttonType={ButtonVariants.BaseSecondary}
            testOnlyPressed={true}
          />,
        )

        expect(screen.root).toHaveStyle({
          backgroundColor: 'transparent',
          borderColor: Colors.vadsColorActionBorderBaseActiveOnDark,
          borderWidth: 2,
        })

        expect(getButtonText()).toHaveStyle({
          color: Colors.vadsColorActionForegroundBaseActiveOnDark,
        })
      })
    })
  })
})
