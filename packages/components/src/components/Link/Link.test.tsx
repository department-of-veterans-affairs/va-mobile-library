import { RenderAPI, fireEvent, render } from '@testing-library/react-native'
import React from 'react'

import * as utils from '../../utils/OSfunctions'
import { Icon } from '../Icon/Icon'
import { Link, LinkProps } from './Link'

const onPressSpy = jest.fn()
const mockedColorScheme = jest.fn()
let mockedUseExternalLink = jest.spyOn(utils, 'useExternalLink')

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => {
  return {
    default: mockedColorScheme,
  }
})

describe('Link', () => {
  let component: RenderAPI
  let textColor: string

  const defaultProps: LinkProps = {
    type: 'custom',
    text: 'Example Link',
    a11yLabel: 'a11yLabel override',
    a11yHint: 'a11yHint override',
    a11yValue: { index: 2, total: 5 },
    onPress: onPressSpy,
  }

  const getTextColor = (element: RenderAPI) =>
    element.getByText(defaultProps.text).props.style.color

  beforeEach(() => {
    mockedUseExternalLink = jest.spyOn(utils, 'useExternalLink')
  })

  afterEach(() => {
    // Restore spy mocks for each test
    jest.restoreAllMocks()
    onPressSpy.mockReset()
  })

  describe('Default/custom variant and basic tests', () => {
    beforeEach(() => {
      component = render(<Link {...defaultProps} />)
    })

    it('initializes correctly', async () => {
      expect(component).toBeTruthy()
    })

    it('renders the link text', async () => {
      const linkText = component.getByText('Example Link')
      expect(linkText).toBeDefined()
    })

    it('calls onPress when tapped', async () => {
      fireEvent.press(component.getByText('Example Link'))
      expect(onPressSpy).toHaveBeenCalled()
    })

    it('renders no icon', async () => {
      const icon = component.UNSAFE_queryByType(Icon)
      expect(icon).toBeNull()
    })
  })

  it('renders default/custom variant with Truck icon', async () => {
    component = render(<Link {...defaultProps} icon={{ name: 'Truck' }} />)

    const icon = component.root.findByType(Icon)
    expect(icon).toBeDefined()
    expect(icon.props.name).toBe('Truck')
  })

  describe('light mode tone tests', () => {
    it('renders primary tone', async () => {
      component = render(<Link {...defaultProps} />)
      textColor = getTextColor(component)
      expect(textColor).toBe('#005ea2')
    })

    it('renders base tone', async () => {
      component = render(<Link {...defaultProps} variant="base" />)
      textColor = getTextColor(component)
      expect(textColor).toBe('#3d4551')
    })
  })

  describe('dark mode tone tests', () => {
    beforeEach(() => mockedColorScheme.mockImplementationOnce(() => 'dark'))

    it('renders primary tone', async () => {
      component = render(<Link {...defaultProps} />)
      textColor = getTextColor(component)
      expect(textColor).toBe('#58b4ff')
    })

    it('renders base tone', async () => {
      component = render(<Link {...defaultProps} variant="base" />)
      textColor = getTextColor(component)
      expect(textColor).toBe('#f0f0f0')
    })
  })

  describe('attachment variant tests', () => {
    const attachmentProps: LinkProps = {
      type: 'attachment',
      onPress: onPressSpy,
      text: 'Attachment Link',
    }
    beforeEach(() => {
      component = render(<Link {...attachmentProps} />)
    })

    it('renders attachment link', async () => {
      const linkText = component.getByText('Attachment Link')

      expect(linkText).toBeDefined()
    })

    it('calls custom onPress when tapped', async () => {
      fireEvent.press(component.getByText('Attachment Link'))

      expect(onPressSpy).toHaveBeenCalled()
    })

    it('renders attachment icon', async () => {
      const icon = component.root.findByType(Icon)

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
    beforeEach(() => {
      component = render(<Link {...calendarProps} />)
    })

    it('renders calendar link', async () => {
      const linkText = component.getByText('Calendar Link')

      expect(linkText).toBeDefined()
    })

    it('calls custom onPress when tapped', async () => {
      fireEvent.press(component.getByText('Calendar Link'))

      expect(onPressSpy).toHaveBeenCalled()
      // expect(mockedUseExternalLink).not.toHaveBeenCalled()
    })

    it('renders calendar icon', async () => {
      const icon = component.root.findByType(Icon)

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
    beforeEach(() => {
      component = render(<Link {...callProps} />)
    })

    it('renders call link', async () => {
      const linkText = component.getByText('123-456-7890')

      expect(linkText).toBeDefined()
    })

    it('calls useExternalLink hook when tapped', async () => {
      expect(mockedUseExternalLink).toHaveBeenCalledTimes(1)
      mockedUseExternalLink.mockRestore()
      console.log('pre-press')
      fireEvent.press(component.getByText('123-456-7890'))
      console.log('post-press')

      expect(mockedUseExternalLink).toHaveBeenCalledTimes(1)
      // expect(mockedUseExternalLink).toHaveBeenCalledWith({url: 'tel:1234567890'})
      expect(onPressSpy).not.toHaveBeenCalled()
    })

    it('renders call icon', async () => {
      const icon = component.root.findByType(Icon)

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
    beforeEach(() => {
      component = render(<Link {...callTTYProps} />)
    })

    it('renders call TTY link', async () => {
      const linkText = component.getByText('TTY: 711')

      expect(linkText).toBeDefined()
    })

    it('calls useExternalLink hook when tapped', async () => {
      fireEvent.press(component.getByText('TTY: 711'))

      expect(mockedUseExternalLink).toHaveBeenCalledTimes(1)
    })

    it('renders TTY icon', async () => {
      const icon = component.root.findByType(Icon)

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
    beforeEach(() => {
      component = render(<Link {...directionsProps} />)
    })

    it('renders directions link', async () => {
      const linkText = component.getByText('Get Directions')

      expect(linkText).toBeDefined()
    })

    it('calls useExternalLink hook when tapped', async () => {
      fireEvent.press(component.getByText('Get Directions'))

      expect(mockedUseExternalLink).toHaveBeenCalledTimes(1)
    })

    it('renders directions icon', async () => {
      const icon = component.root.findByType(Icon)

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
    beforeEach(() => {
      component = render(<Link {...textProps} />)
    })

    it('renders text link', async () => {
      const linkText = component.getByText('Text 123456')

      expect(linkText).toBeDefined()
    })

    it('calls onPress when tapped', async () => {
      fireEvent.press(component.getByText('Text 123456'))

      expect(mockedUseExternalLink).toHaveBeenCalledTimes(1)
    })

    it('renders mobile phone icon', async () => {
      const icon = component.root.findByType(Icon)

      expect(icon).toBeDefined()
      expect(icon.props.name).toBe('Text')
    })
  })

  describe('url variant tests', () => {
    const urlProps: LinkProps = {
      type: 'url',
      url: 'https://www.va.com',
      text: 'URL Link',
    }
    beforeEach(() => {
      component = render(<Link {...urlProps} />)
    })

    it('renders url link', async () => {
      const linkText = component.getByText('URL Link')

      expect(linkText).toBeDefined()
    })

    it('calls onPress when tapped', async () => {
      fireEvent.press(component.getByText('URL Link'))

      expect(mockedUseExternalLink).toHaveBeenCalledTimes(1)
    })

    it('renders external link icon', async () => {
      const icon = component.root.findByType(Icon)

      expect(icon).toBeDefined()
      expect(icon.props.name).toBe('ExternalLink')
    })
  })

  // Add a11y tests

  // Add promptText tests

  // Add analytics tests

  // Add more test cases as needed

  // Add OSFunctions tests for FormDirectionsUrl and maybe useExternalLink
})
