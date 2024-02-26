import { Meta, StoryObj } from '@storybook/react'
import { Platform, View } from 'react-native'
import React from 'react'

import { Link, LinkProps } from './Link'

const meta: Meta<LinkProps> = {
  title: 'Link',
  component: Link,
  argTypes: {
    onPress: {
      action: 'onPress event',
    },
  },
  decorators: [
    (Story) => (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Story />
      </View>
    ),
  ],
}

export default meta

type Story = StoryObj<LinkProps>

export const Default: Story = {
  args: {
    text: 'Link opens in the app',
    type: 'custom',
    onPress: () => {
      null
    },
  },
}

export const DefaultWithIcon: Story = {
  name: 'Default (with icon)',
  args: {
    text: 'Link opens an external app',
    icon: { name: 'Truck' },
    type: 'custom',
    onPress: () => {
      null
    },
  },
}

const paragraphText: LinkProps['paragraphText'] = [
  // @ts-ignore: TS being wrong and thinking all should be LinkProps and none normalText
  { text: 'A sentence may include a ' },
  {
    text: 'link that opens in a webview',
    type: 'custom',
    onPress: () => {
      null
    },
    a11yLabel: 'a11y override',
  },
  // @ts-ignore: TS being wrong and thinking all should be LinkProps and none normalText
  { text: ' or a ' },
  {
    text: 'link that opens in an external app',
    type: 'url',
    url: 'https://department-of-veterans-affairs.github.io/va-mobile-app/design/intro',
  },
  // @ts-ignore: TS being wrong and thinking all should be LinkProps and none normalText
  { text: '.' },
]

export const Inline: Story = {
  args: {
    text: '',
    onPress: undefined, // Storybook sends a truthy function shell otherwise
    type: 'inline',
    paragraphText: paragraphText,
  },
}

const startTime = new Date()
const endTime = new Date(startTime.setMinutes(startTime.getMinutes() + 30))
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
const getLocation = (): string => {
  const { lat, long, name, address } = location
  if (Platform.OS === 'ios' && lat && long) {
    return name || ''
  } else if (
    address?.street &&
    address?.city &&
    address?.state &&
    address?.zipCode
  ) {
    return `${address.street} ${address.city}, ${address.state} ${address.zipCode}`
  } else {
    return name || ''
  }
}

export const _Calendar: Story = {
  args: {
    text: 'Add to calendar',
    onPress: undefined, // Storybook sends a truthy function shell otherwise
    type: 'calendar',
    calendarData: {
      title: 'Test',
      startTime: startTime.getTime(),
      endTime: endTime.getTime(),
      location: getLocation(),
      latitude: location.lat,
      longitude: location.long,
    },
  },
}

export const _Directions: Story = {
  args: {
    text: 'Get directions',
    onPress: undefined, // Storybook sends a truthy function shell otherwise
    type: 'directions',
    locationData: {
      name: 'VA Long Beach Healthcare System',
      address: location.address,
      latitude: location.lat,
      longitude: location.long,
    },
    promptText: {
      body: "You're navigating to your Maps app.",
      cancel: 'No thanks',
      confirm: "Let's go!",
      title: 'Title override',
    },
    a11yLabel: 'Get directions with Maps app',
    a11yHint: 'Opens maps app with directions to the location',
  },
}

export const _ExternalLink: Story = {
  args: {
    text: 'Link opens in external browser',
    onPress: undefined, // Storybook sends a truthy function shell otherwise
    type: 'url',
    url: 'https://www.va.gov/',
  },
}

export const _Phone: Story = {
  args: {
    text: '000-000-0000',
    onPress: undefined, // Storybook sends a truthy function shell otherwise
    type: 'call',
    phoneNumber: '000-000-0000',
  },
}

export const _PhoneTTY: Story = {
  args: {
    text: 'TTY: 711',
    onPress: undefined, // Storybook sends a truthy function shell otherwise
    type: 'call TTY',
    TTYnumber: '711',
  },
}

export const _Text: Story = {
  args: {
    text: 'Text 000000',
    onPress: undefined, // Storybook sends a truthy function shell otherwise
    type: 'text',
    textNumber: '000000',
  },
}
