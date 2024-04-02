import { RenderAPI, fireEvent, render } from '@testing-library/react-native'
import React from 'react'

import * as link from './Link'
import * as utils from '../../utils/OSfunctions'
import { Icon } from '../Icon/Icon'
import { Link, LinkAnalytics, LinkProps } from './Link'

const onPressSpy = jest.fn()
const mockedColorScheme = jest.fn()
const mockedUseExternalLink = jest.spyOn(utils, 'useExternalLink')
// const mocked2UseExternalLink = jest.spyOn(utils, 'useExternalLink')
  // .mockImplementation((url: string, analytics?: LinkAnalytics, text?: utils.leaveAppPromptText) => return)
const mocked2UseExternalLink = mockedUseExternalLink.mockImplementation(() => ((url, analytics, text) => {return url}))

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

    afterEach(() => {
      // restore the spy created with spyOn
      jest.restoreAllMocks();
    });

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
    })

    it('renders calendar icon', async () => {
      const icon = component.root.findByType(Icon)

      expect(icon).toBeDefined()
      expect(icon.props.name).toBe('Calendar')
    })
  })

  describe('call variant tests', () => {
    // const mockedUseExternalLink = jest.spyOn(utils, 'useExternalLink')
    // jest.spyOn(utils, 'useExternalLink')
    const callProps: LinkProps = {
      type: 'call',
      phoneNumber: '1234567890',
      onPress: undefined,
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
      // const phoneProp = component.UNSAFE_queryByProps({ phoneNumber: '1234567890' })
      // const LinkComponent = component.root.findByType(Link)
    
      console.log('useExternalLink Test start')
      // const mockedUseExternalLink = jest.spyOn(utils, 'useExternalLink')
      // jest.spyOn(utils, 'useExternalLink')
      fireEvent.press(component.getByText('123-456-7890'))

      console.log('useExternalLink Test middle')

      // await new Promise((resolve) => setTimeout(resolve, 1000))

      expect(mockedUseExternalLink).toHaveBeenCalledTimes(1)
      // expect(LinkComponent).toBeDefined()
      // expect(component.UNSAFE_queryByProps({phoneNumber: '1234567890'})).toBe('Truck')
      // expect(phoneProp).toBe('Truck')
      // expect(mockedUseExternalLink.mock.results).toHaveBeenLastCalledWith('tel:1234567890')
      // expect(mockedUseExternalLink).toHaveBeenCalledWith('tel:1234567890')
      // expect(mocked2UseExternalLink.toString()).toHaveBeenCalledWith('tel:1234567890')
      // expect(utils.useExternalLink).toHaveBeenLastCalledWith('tel:1234567890')
      console.log('useExternalLink Test end')
    })

    it('renders call icon', async () => {
      const icon = component.root.findByType(Icon)

      expect(icon).toBeDefined()
      expect(icon.props.name).toBe('Phone')
    })
  })

  it('renders call TTY link', async () => {
    const callTTYProps: LinkProps = {
      type: 'call TTY',
      onPress: jest.fn(),
      TTYnumber: '1234567890',
      text: 'Call TTY Link',
    }

    const { getByText } = render(<Link {...callTTYProps} />)
    const linkText = getByText('Call TTY Link')
    expect(linkText).toBeDefined()
  })

  it('renders custom link', async () => {
    const customProps: LinkProps = {
      type: 'custom',
      onPress: jest.fn(),
      text: 'Custom Link',
    }

    const { getByText } = render(<Link {...customProps} />)
    const linkText = getByText('Custom Link')
    expect(linkText).toBeDefined()
  })

  it('renders directions link', async () => {
    const directionsProps: LinkProps = {
      type: 'directions',
      onPress: jest.fn(),
      locationData: { latitude: 123, longitude: 456, name: 'Test Location' },
      text: 'Directions Link',
    }

    const { getByText } = render(<Link {...directionsProps} />)
    const linkText = getByText('Directions Link')
    expect(linkText).toBeDefined()
  })

  it('renders text link', async () => {
    const textProps: LinkProps = {
      type: 'text',
      onPress: jest.fn(),
      textNumber: '1234567890',
      text: 'Text Link',
    }

    const { getByText } = render(<Link {...textProps} />)
    const linkText = getByText('Text Link')
    expect(linkText).toBeDefined()
  })

  it('renders url link', async () => {
    const urlProps: LinkProps = {
      type: 'url',
      onPress: jest.fn(),
      url: 'https://www.va.com',
      text: 'URL Link',
    }

    const { getByText } = render(<Link {...urlProps} />)
    const linkText = getByText('URL Link')
    expect(linkText).toBeDefined()
  })

  // Add a11y tests

  // Add promptText tests

  // Add analytics tests

  // Add more test cases as needed
})
