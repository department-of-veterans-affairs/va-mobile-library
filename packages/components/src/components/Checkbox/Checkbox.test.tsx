import 'react-native'
import { fireEvent, render, screen } from '@testing-library/react-native'

import { Checkbox } from './Checkbox'
import { getIcon, getIconName } from '../../utils/jest'

const mockedColorScheme = jest.fn()

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => {
  return {
    default: mockedColorScheme,
  }
})

describe('Checkbox', () => {
  const onPressSpy = jest.fn()

  const commonProps = {
    header: 'Header text',
    description: 'Description text',
    hint: 'Hint text',
    label: 'Label text',
    testID: 'testCheckbox',
    onPress: onPressSpy,
  }

  const labelObject = { text: 'Label text object', a11yLabel: 'Label a11y' }
  const descriptionObject = {
    text: 'Description text object',
    a11yLabel: 'Description a11y',
  }

  const errorMsg = 'Error text'

  describe('Basic tests', () => {
    it('initializes correctly', () => {
      render(<Checkbox {...commonProps} />)
      expect(screen.getByTestId('testCheckbox')).toBeTruthy()
    })

    it('renders header, description, hint, icon, and label text', async () => {
      render(<Checkbox {...commonProps} />)
      expect(screen.getByText('Header text')).toBeOnTheScreen()
      expect(screen.getByText('Description text')).toBeOnTheScreen()
      expect(screen.getByText('Label text')).toBeOnTheScreen()
      expect(screen.getByText('Hint text')).toBeOnTheScreen()
      expect(screen.queryByText('(*Required)')).not.toBeOnTheScreen()
      expect(await getIconName(screen)).toBe('CheckBoxOutlineBlank')
    })

    it('renders error message', () => {
      render(<Checkbox {...commonProps} error={errorMsg} />)
      expect(screen.getByText('Error text')).toBeOnTheScreen()
    })

    it('renders required indicator next to label', async () => {
      render(<Checkbox {...commonProps} required />)
      expect(screen.getByText('Label text (*Required)')).toBeOnTheScreen()
    })

    it('renders checked icon', async () => {
      render(<Checkbox {...commonProps} checked />)
      expect(await getIconName(screen)).toBe('CheckBox')
    })

    it('renders indeterminate icon', async () => {
      render(<Checkbox {...commonProps} indeterminate />)
      expect(await getIconName(screen)).toBe('IndeterminateCheckBox')
    })

    it('overrides checked if indeterminate', async () => {
      render(<Checkbox {...commonProps} indeterminate checked />)
      expect(await getIconName(screen)).toBe('IndeterminateCheckBox')
    })

    it('fires onPress', async () => {
      render(<Checkbox {...commonProps} />)
      fireEvent.press(screen.getByRole('checkbox'))
      expect(onPressSpy).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('should have a11y labels when label and description are strings', () => {
      render(<Checkbox {...commonProps} />)
      expect(
        screen.getByLabelText('Label text, Description text'),
      ).toBeOnTheScreen()
    })

    it('should include required in a11y label', () => {
      render(<Checkbox {...commonProps} required />)
      expect(
        screen.getByLabelText('Label text, Required, Description text'),
      ).toBeOnTheScreen()
    })

    it('should have a11y labels when label and description are TextWithA11y objects', () => {
      render(
        <Checkbox
          {...commonProps}
          label={labelObject}
          description={descriptionObject}
          required
        />,
      )
      expect(
        screen.getByLabelText('Label a11y, Required, Description a11y'),
      ).toBeOnTheScreen()
    })

    it('should have a11y labels when label and description are objects without a11y', () => {
      render(
        <Checkbox
          {...commonProps}
          label={{ text: 'Label without a11y' }}
          description={{ text: 'Description without a11y' }}
        />,
      )
      expect(
        screen.getByLabelText('Label without a11y, Description without a11y'),
      ).toBeOnTheScreen()
    })
  })

  describe('Styling', () => {
    describe('Light mode', () => {
      it('icon color (unchecked)', async () => {
        render(<Checkbox {...commonProps} />)
        const icon = await getIcon(screen)
        expect(icon.props.fill).toEqual('#565c65')
      })

      it('icon color (checked)', async () => {
        render(<Checkbox {...commonProps} checked />)
        const icon = await getIcon(screen)
        expect(icon.props.fill).toEqual('#005ea2')
      })

      it('tiled variant styling (unchecked)', async () => {
        render(<Checkbox {...commonProps} tile />)

        expect(screen.getByRole('checkbox')).toHaveStyle({
          borderWidth: 2,
          borderRadius: 4,
          padding: 12,
          paddingRight: 16,
          borderColor: '#a9aeb1',
          backgroundColor: '#ffffff',
        })

        const icon = await getIcon(screen)
        expect(icon.props.fill).toEqual('#565c65')
      })

      it('tiled variant styling (checked)', async () => {
        render(<Checkbox {...commonProps} tile checked />)
        expect(screen.getByRole('checkbox')).toHaveStyle({
          borderWidth: 2,
          borderRadius: 4,
          padding: 12,
          paddingRight: 16,
          borderColor: '#005ea2',
          backgroundColor: '#ecf1f7',
        })

        const icon = await getIcon(screen)
        expect(icon.props.fill).toEqual('#005ea2')
      })

      it('error state', () => {
        render(<Checkbox {...commonProps} error={errorMsg} />)

        expect(screen.root).toHaveStyle({
          paddingLeft: 16,
          borderColor: '#b50909',
          borderLeftWidth: 4,
        })
      })
    })

    describe('Dark mode', () => {
      it('tiled variant styling (unchecked)', () => {
        mockedColorScheme.mockImplementation(() => 'dark')

        render(<Checkbox {...commonProps} tile />)
        expect(screen.getByRole('checkbox')).toHaveStyle({
          borderWidth: 2,
          borderRadius: 4,
          padding: 12,
          paddingRight: 16,
          borderColor: '#565c65',
          backgroundColor: '#2e2e2e',
        })
      })

      it('tiled variant styling (checked)', () => {
        mockedColorScheme.mockImplementation(() => 'dark')

        render(<Checkbox {...commonProps} tile checked />)
        expect(screen.getByRole('checkbox')).toHaveStyle({
          borderWidth: 2,
          borderRadius: 4,
          padding: 12,
          paddingRight: 16,
          borderColor: '#58b4ff',
          backgroundColor: '#252f3e',
        })
      })

      it('error state', () => {
        render(<Checkbox {...commonProps} error={errorMsg} />)

        expect(screen.root).toHaveStyle({
          paddingLeft: 16,
          borderColor: '#fb5a47',
          borderLeftWidth: 4,
        })
      })
    })
  })
})
