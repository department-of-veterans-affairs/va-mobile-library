import {
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react-native'
import React from 'react'

import * as utils from '../../utils/OSfunctions'
import { Icon } from '../Icon/Icon'
import { Link, LinkAnalytics, LinkProps } from './Link'

const onPressSpy = jest.fn()
const mockedColorScheme = jest.fn()

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => {
  return {
    default: mockedColorScheme,
  }
})

// Mock the internal function call within the useExternalLink hook
const useExternalLinkHookMock = jest.fn(
  (url: string, analytics?: LinkAnalytics, text?: utils.leaveAppPromptText) => {
    url
    analytics
    text
  },
)
// Mock the useExternalLink hook to leverage mock implementation
jest.spyOn(utils, 'useExternalLink').mockImplementation(() => {
  return useExternalLinkHookMock
})

describe('Link', () => {
  const analytics = {
    onPress: jest.fn(),
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
  }

  const commonProps: LinkProps = {
    type: 'custom',
    text: 'Example Link',
    testID: 'testLink',
    a11yLabel: 'a11yLabel override',
    a11yHint: 'a11yHint override',
    a11yValue: { index: 2, total: 5 },
    onPress: onPressSpy,
    analytics: analytics,
  }

  const getLinkText = () => screen.getByText(commonProps.text)
  const getIcon = async () => await screen.root.findByType(Icon)

  afterEach(() => {
    onPressSpy.mockReset()
    useExternalLinkHookMock.mockReset()
  })

  describe('Default/custom variant and basic tests', () => {
    it('initializes correctly', async () => {
      render(<Link {...commonProps} />)
      expect(screen.getByTestId('testLink')).toBeOnTheScreen()
    })

    it('renders the link text', async () => {
      render(<Link {...commonProps} />)
      expect(screen.getByText('Example Link')).toBeOnTheScreen()
    })

    it('calls onPress when tapped', async () => {
      render(<Link {...commonProps} />)
      fireEvent.press(screen.getByText('Example Link'))

      expect(onPressSpy).toHaveBeenCalled()
      expect(useExternalLinkHookMock).not.toHaveBeenCalled()
    })

    it('renders no icon', async () => {
      render(<Link {...commonProps} />)
      const icon = screen.UNSAFE_queryByType(Icon)

      expect(icon).toBeNull()
    })
  })

  it('renders default/custom variant with Truck icon', async () => {
    render(<Link {...commonProps} icon={{ name: 'Truck' }} />)

    const icon = await getIcon()

    expect(icon).toBeDefined()
    expect(icon.props.name).toBe('Truck')
  })

  describe('attachment variant tests', () => {
    const attachmentProps: LinkProps = {
      type: 'attachment',
      onPress: onPressSpy,
      text: 'Attachment Link',
    }

    it('renders attachment link', async () => {
      render(<Link {...attachmentProps} />)
      expect(screen.getByText('Attachment Link')).toBeOnTheScreen()
    })

    it('calls custom onPress when tapped', async () => {
      render(<Link {...attachmentProps} />)
      fireEvent.press(screen.getByText('Attachment Link'))

      expect(onPressSpy).toHaveBeenCalled()
      expect(useExternalLinkHookMock).not.toHaveBeenCalled()
    })

    it('renders attachment icon', async () => {
      render(<Link {...attachmentProps} />)
      const icon = await getIcon()

      expect(icon).toBeDefined()
      expect(icon.props.name).toBe('PaperClip')
    })
  })

  describe('calendar variant tests', () => {
    const calendarProps: LinkProps = {
      type: 'calendar',
      onPress: onPressSpy,
      text: 'Calendar Link',
    }

    it('renders calendar link', async () => {
      render(<Link {...calendarProps} />)
      expect(screen.getByText('Calendar Link')).toBeOnTheScreen()
    })

    it('calls custom onPress when tapped', async () => {
      render(<Link {...calendarProps} />)
      fireEvent.press(screen.getByText('Calendar Link'))

      expect(onPressSpy).toHaveBeenCalled()
      expect(useExternalLinkHookMock).not.toHaveBeenCalled()
    })

    it('renders calendar icon', async () => {
      render(<Link {...calendarProps} />)
      const icon = await getIcon()

      expect(icon).toBeDefined()
      expect(icon.props.name).toBe('Calendar')
    })
  })

  describe('call variant tests', () => {
    const callProps: LinkProps = {
      type: 'call',
      phoneNumber: '1234567890',
      text: '123-456-7890',
    }

    it('renders call link', async () => {
      render(<Link {...callProps} />)
      expect(screen.getByText('123-456-7890')).toBeOnTheScreen()
    })

    it('calls useExternalLink hook when tapped', async () => {
      render(<Link {...callProps} />)
      fireEvent.press(screen.getByText('123-456-7890'))

      expect(useExternalLinkHookMock).toHaveBeenCalledWith(
        'tel:1234567890',
        undefined,
      )
      expect(onPressSpy).not.toHaveBeenCalled()
    })

    it('renders call icon', async () => {
      render(<Link {...callProps} />)
      const icon = await getIcon()

      expect(icon).toBeDefined()
      expect(icon.props.name).toBe('Phone')
    })
  })

  describe('call TTY variant tests', () => {
    const callTTYProps: LinkProps = {
      type: 'call TTY',
      TTYnumber: '711',
      text: 'TTY: 711',
    }

    it('renders call TTY link', async () => {
      render(<Link {...callTTYProps} />)
      expect(screen.getByText('TTY: 711')).toBeOnTheScreen()
    })

    it('calls useExternalLink hook when tapped', async () => {
      render(<Link {...callTTYProps} />)
      fireEvent.press(screen.getByText('TTY: 711'))

      expect(useExternalLinkHookMock).toHaveBeenCalledWith('tel:711', undefined)
      expect(onPressSpy).not.toHaveBeenCalled()
    })

    it('renders TTY icon', async () => {
      render(<Link {...callTTYProps} />)
      const icon = await getIcon()

      expect(icon).toBeDefined()
      expect(icon.props.name).toBe('TTY')
    })
  })

  describe('directions variant tests', () => {
    const location = {
      lat: 33.7764681,
      long: -118.1189664,
      name: 'Tibor Rubin VA Medical Center',
      address: {
        street: '5901 E 7th St',
        city: 'Long Beach',
        state: 'CA',
        zipCode: '90822',
      },
    }
    const directionsProps: LinkProps = {
      type: 'directions',
      locationData: {
        latitude: location.lat,
        longitude: location.long,
        name: location.name,
      },
      text: 'Get Directions',
    }

    it('renders directions link', async () => {
      render(<Link {...directionsProps} />)
      expect(screen.getByText('Get Directions')).toBeOnTheScreen()
    })

    it('calls useExternalLink hook when tapped', async () => {
      render(<Link {...directionsProps} />)
      fireEvent.press(screen.getByText('Get Directions'))

      expect(useExternalLinkHookMock).toHaveBeenCalledWith(
        'https://maps.apple.com/?t=m&daddr=%2BTibor+Rubin+VA+Medical+Center%2B33.7764681%2C-118.1189664',
        undefined,
        undefined,
      )
      expect(onPressSpy).not.toHaveBeenCalled()
    })

    it('renders directions icon', async () => {
      render(<Link {...directionsProps} />)
      const icon = await getIcon()

      expect(icon).toBeDefined()
      expect(icon.props.name).toBe('Directions')
    })
  })

  describe('text variant tests', () => {
    const textProps: LinkProps = {
      type: 'text',
      textNumber: '123456',
      text: 'Text 123456',
    }

    it('renders text link', async () => {
      render(<Link {...textProps} />)
      expect(screen.getByText('Text 123456')).toBeOnTheScreen()
    })

    it('calls onPress when tapped', async () => {
      render(<Link {...textProps} />)
      fireEvent.press(screen.getByText('Text 123456'))

      expect(useExternalLinkHookMock).toHaveBeenCalledWith(
        'sms:123456',
        undefined,
      )
      expect(onPressSpy).not.toHaveBeenCalled()
    })

    it('renders mobile phone icon', async () => {
      render(<Link {...textProps} />)
      const icon = await getIcon()

      expect(icon).toBeDefined()
      expect(icon.props.name).toBe('Text')
    })
  })

  describe('url variant tests', () => {
    const urlProps: LinkProps = {
      type: 'url',
      url: 'https://www.va.com',
      text: 'External Link',
    }

    it('renders url link', async () => {
      render(<Link {...urlProps} />)
      expect(screen.getByText('External Link')).toBeOnTheScreen()
    })

    it('calls onPress when tapped', async () => {
      render(<Link {...urlProps} />)
      fireEvent.press(screen.getByText('External Link'))

      expect(useExternalLinkHookMock).toHaveBeenCalledWith(
        'https://www.va.com',
        undefined,
        undefined,
      )
      expect(onPressSpy).not.toHaveBeenCalled()
    })

    it('renders external link icon', async () => {
      render(<Link {...urlProps} />)
      const icon = await getIcon()

      expect(icon).toBeDefined()
      expect(icon.props.name).toBe('ExternalLink')
    })
  })

  describe('light mode tone tests', () => {
    it('renders primary tone', async () => {
      render(<Link {...commonProps} />)
      expect(getLinkText()).toHaveStyle({ color: 'vadsColorActionForegroundDefaultOnLight' })
    })

    it('renders base tone', async () => {
      render(<Link {...commonProps} variant="base" />)
      expect(getLinkText()).toHaveStyle({ color: 'vadsColorForegroundDefaultOnLight' })
    })

    it('renders background color when pressed', async () => {
      render(<Link {...commonProps} testOnlyPressed />)
      expect(screen.root).toHaveStyle({ backgroundColor: 'vadsColorSurfaceSecondaryOnLight' })
    })
  })

  describe('dark mode tone tests', () => {
    beforeEach(() => mockedColorScheme.mockImplementationOnce(() => 'dark'))

    it('renders primary tone', async () => {
      render(<Link {...commonProps} />)
      expect(getLinkText()).toHaveStyle({ color: 'vadsColorActionForegroundDefaultOnDark' })
    })

    it('renders base tone', async () => {
      render(<Link {...commonProps} variant="base" />)
      expect(getLinkText()).toHaveStyle({ color: 'vadsColorForegroundDefaultOnDark' })
    })

    it('renders background color when pressed', async () => {
      render(<Link {...commonProps} testOnlyPressed />)
      expect(screen.root).toHaveStyle({ backgroundColor: 'vadsColorSurfaceSecondaryOnDark' })
    })
  })

  /**
   * Icon override tests non-exhaustive, their primary purpose is to validate Link's Partial<IconProps>
   * correctly allows overriding selective props while also still incorporating Link variant behavior
   * such as built in icon setting
   *
   * Note: Icon override tests use "within(icon)" to validate internal props of Icon component set
   *       correctly and not just checking passthrough of props set within Link itself
   */
  describe('icon override tests', () => {
    const iconOverrideProps: LinkProps = {
      type: 'attachment',
      onPress: onPressSpy,
      text: 'Attachment Link',
    }

    it('should prevent scaling with fontScale 2', async () => {
      render(<Link {...iconOverrideProps} icon={{ preventScaling: true }} />)
      const icon = await getIcon()

      expect(icon.props.name).toBe('PaperClip')
      const width24Exists = within(icon).UNSAFE_getByProps({ width: 24 })
      expect(width24Exists).toBeTruthy()
      const height24Exists = within(icon).UNSAFE_getByProps({ height: 24 })
      expect(height24Exists).toBeTruthy()
    })

    it('should limit max width with fontScale 2', async () => {
      render(<Link {...iconOverrideProps} icon={{ maxWidth: 36 }} />)
      const icon = await getIcon()

      expect(icon.props.name).toBe('PaperClip')
      const width36Exists = within(icon).UNSAFE_getByProps({ width: 36 })
      expect(width36Exists).toBeTruthy()
      const height36Exists = within(icon).UNSAFE_getByProps({ height: 36 })
      expect(height36Exists).toBeTruthy()
    })

    it('should allow override of icon and size to fontScale 2', async () => {
      render(<Link {...iconOverrideProps} icon={{ name: 'Add' }} />)
      const icon = await getIcon()

      expect(icon.props.name).toBe('Add')
      const width48Exists = within(icon).UNSAFE_getByProps({ width: 48 })
      expect(width48Exists).toBeTruthy()
      const height48Exists = within(icon).UNSAFE_getByProps({ height: 48 })
      expect(height48Exists).toBeTruthy()
    })

    it('should respect removing the icon', () => {
      render(<Link {...iconOverrideProps} icon={'no icon'} />)
      const icon = screen.UNSAFE_queryByType(Icon)

      expect(icon).toBeFalsy()
    })
  })

  describe('a11y tests', () => {
    it('includes a11yLabel', async () => {
      render(<Link {...commonProps} />)
      expect(screen.getByLabelText('a11yLabel override')).toBeOnTheScreen()
    })

    it('includes a11yHint', async () => {
      render(<Link {...commonProps} />)
      expect(screen.getByHintText('a11yHint override')).toBeOnTheScreen()
    })

    it('includes index/total a11yValue', async () => {
      render(<Link {...commonProps} />)

      expect(screen.root).toHaveAccessibilityValue({
        text: '3 of 5',
      })
    })

    it('includes custom string a11yValue', async () => {
      render(<Link {...commonProps} a11yValue="test string a11y value" />)

      expect(screen.root).toHaveAccessibilityValue({
        text: 'test string a11y value',
      })
    })
  })

  describe('promptText tests', () => {
    const promptText = {
      body: 'You are navigating to your browser app.',
      cancel: 'No thanks',
      confirm: "Let's go!",
      title: 'Title override',
    }

    it('calls useExternalLink hook with promptText when provided', async () => {
      render(
        <Link
          {...commonProps}
          type="url"
          url="https://www.va.com"
          promptText={promptText}
        />,
      )
      fireEvent.press(screen.getByText('Example Link'))

      expect(useExternalLinkHookMock).toHaveBeenCalledWith(
        'https://www.va.com',
        analytics,
        promptText,
      )
    })

    it('calls useExternalLink hook without promptText when not provided', async () => {
      render(<Link {...commonProps} type="url" url="https://www.va.com" />)
      fireEvent.press(screen.getByText('Example Link'))

      expect(useExternalLinkHookMock).toHaveBeenCalledWith(
        'https://www.va.com',
        analytics,
        undefined,
      )
    })
  })

  describe('analytics tests', () => {
    it('calls useExternalLink hook with analytics when provided', async () => {
      render(
        <Link
          {...commonProps}
          type="url"
          url="https://www.va.com"
          analytics={analytics}
        />,
      )
      fireEvent.press(screen.getByText('Example Link'))

      expect(useExternalLinkHookMock).toHaveBeenCalledWith(
        'https://www.va.com',
        analytics,
        undefined,
      )
    })

    it('calls useExternalLink hook without analytics when not provided', async () => {
      render(
        <Link
          {...commonProps}
          type="url"
          url="https://www.va.com"
          analytics={undefined}
        />,
      )
      fireEvent.press(screen.getByText('Example Link'))

      expect(useExternalLinkHookMock).toHaveBeenCalledWith(
        'https://www.va.com',
        undefined,
        undefined,
      )
    })

    it('calls onPress analytics with custom onPress behavior', async () => {
      render(<Link {...commonProps} analytics={analytics} />)
      fireEvent.press(screen.getByText('Example Link'))

      expect(analytics.onPress).toHaveBeenCalled()
    })
  })
})
