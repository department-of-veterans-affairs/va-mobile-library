import 'react-native'
import { fireEvent, render, screen } from '@testing-library/react-native'
// Note: test renderer must be required after react-native.

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
        backgroundColor: '#005ea2',
        borderWidth: 0,
      })

      expect(getButtonText()).toHaveStyle({
        color: '#f0f0f0',
      })
    })

    it('should render Primary variant pressed state', async () => {
      render(<Button {...commonProps} testOnlyPressed={true} />)

      expect(screen.root).toHaveStyle({
        backgroundColor: '#162e51',
        borderWidth: 0,
      })

      expect(getButtonText()).toHaveStyle({
        color: '#f0f0f0',
      })
    })

    describe('Dark mode', () => {
      beforeEach(() => mockedColorScheme.mockImplementationOnce(() => 'dark'))

      it('should render Primary variant in dark mode', async () => {
        render(<Button {...commonProps} />)

        expect(screen.root).toHaveStyle({
          backgroundColor: '#58b4ff',
          borderWidth: 0,
        })

        expect(getButtonText()).toHaveStyle({
          color: '#1b1b1b',
        })
      })

      it('should render Primary variant pressed state in dark mode', async () => {
        render(<Button {...commonProps} testOnlyPressed={true} />)

        expect(screen.root).toHaveStyle({
          backgroundColor: '#e1f3f8',
          borderWidth: 0,
        })

        expect(getButtonText()).toHaveStyle({
          color: '#1b1b1b',
        })
      })
    })
  })

  describe('Base Variant', () => {
    it('should render Base variant', async () => {
      render(<Button {...commonProps} buttonType={ButtonVariants.Base} />)

      expect(screen.root).toHaveStyle({
        backgroundColor: '#757575',
        borderWidth: 0,
      })

      expect(getButtonText()).toHaveStyle({
        color: '#f0f0f0',
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
        backgroundColor: '#2e2e2e',
        borderWidth: 0,
      })

      expect(getButtonText()).toHaveStyle({
        color: '#f0f0f0',
      })
    })

    describe('Dark mode', () => {
      beforeEach(() => mockedColorScheme.mockImplementationOnce(() => 'dark'))

      it('should render Base variant in dark mode', async () => {
        render(<Button {...commonProps} buttonType={ButtonVariants.Base} />)

        expect(screen.root).toHaveStyle({
          backgroundColor: '#f0f0f0',
          borderWidth: 0,
        })

        expect(getButtonText()).toHaveStyle({
          color: '#1b1b1b',
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
          backgroundColor: '#adadad',
          borderWidth: 0,
        })

        expect(getButtonText()).toHaveStyle({
          color: '#1b1b1b',
        })
      })
    })
  })

  describe('Secondary Variant', () => {
    it('should render Secondary variant', async () => {
      render(<Button {...commonProps} buttonType={ButtonVariants.Secondary} />)

      expect(screen.root).toHaveStyle({
        backgroundColor: 'transparent',
        borderColor: '#005ea2',
        borderWidth: 2,
      })

      expect(getButtonText()).toHaveStyle({
        color: '#005ea2',
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
        borderColor: '#162e51',
        borderWidth: 2,
      })

      expect(getButtonText()).toHaveStyle({
        color: '#162e51',
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
          borderColor: '#58b4ff',
          borderWidth: 2,
        })

        expect(getButtonText()).toHaveStyle({
          color: '#58b4ff',
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
          borderColor: '#e1f3f8',
          borderWidth: 2,
        })

        expect(getButtonText()).toHaveStyle({
          color: '#e1f3f8',
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
        backgroundColor: '#b50909',
        borderColor: 'none',
        borderWidth: 0,
      })

      expect(getButtonText()).toHaveStyle({
        color: '#f0f0f0',
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
        backgroundColor: '#5c1111',
        borderColor: 'none',
        borderWidth: 0,
      })

      expect(getButtonText()).toHaveStyle({
        color: '#f0f0f0',
      })
    })

    describe('Dark mode', () => {
      beforeEach(() => mockedColorScheme.mockImplementationOnce(() => 'dark'))

      it('should render Destructive variant in dark mode', async () => {
        render(
          <Button {...commonProps} buttonType={ButtonVariants.Destructive} />,
        )

        expect(screen.root).toHaveStyle({
          backgroundColor: '#fb5a47',
          borderColor: 'none',
          borderWidth: 0,
        })

        expect(getButtonText()).toHaveStyle({
          color: '#1b1b1b',
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
          backgroundColor: '#f4e3db',
          borderColor: 'none',
          borderWidth: 0,
        })

        expect(getButtonText()).toHaveStyle({
          color: '#1b1b1b',
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
        borderColor: '#757575',
        borderWidth: 2,
      })

      expect(getButtonText()).toHaveStyle({
        color: '#757575',
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
        borderColor: '#2e2e2e',
        borderWidth: 2,
      })

      expect(getButtonText()).toHaveStyle({
        color: '#2e2e2e',
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
          borderColor: '#f0f0f0',
          borderWidth: 2,
        })

        expect(getButtonText()).toHaveStyle({
          color: '#f0f0f0',
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
          borderColor: '#adadad',
          borderWidth: 2,
        })

        expect(getButtonText()).toHaveStyle({
          color: '#adadad',
        })
      })
    })
  })
})
