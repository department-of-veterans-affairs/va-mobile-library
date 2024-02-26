import { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
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

export const Calendar: Story = {
  name: 'Calendar',
  args: {
    text: 'Add to calendar',
    onPress: undefined, // Storybook sends a truthy function shell otherwise
    type: 'calendar',
  },
}

export const Custom: Story = {
  name: 'Custom Link w/o Icon',
  args: {
    text: 'Custom Link - no icon',
    type: 'custom',
    onPress: () => {
      null
    },
    analytics: {
      onPress: () => console.log('pressed'),
    },
  },
}

export const CustomWithIcon: Story = {
  name: 'Custom Link with Icon',
  args: {
    text: 'Custom Link',
    icon: { name: 'Truck' },
    type: 'custom',
    onPress: () => {
      null
    },
  },
}

export const Directions: Story = {
  name: 'Directions',
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

export const Phone: Story = {
  args: {
    text: 'Call number',
    onPress: undefined, // Storybook sends a truthy function shell otherwise
    type: 'call',
    phoneNumber: '555',
  },
}

export const PhoneTTY: Story = {
  args: {
    text: 'Call TTY number',
    onPress: undefined, // Storybook sends a truthy function shell otherwise
    type: 'call TTY',
    TTYnumber: '711',
  },
}

export const Text: Story = {
  args: {
    text: 'Text SMS number',
    variant: 'base',
    onPress: undefined, // Storybook sends a truthy function shell otherwise
    type: 'text',
    textNumber: '55555',
  },
}

export const URL: Story = {
  args: {
    text: 'External link',
    onPress: undefined, // Storybook sends a truthy function shell otherwise
    type: 'url',
    url: 'https://www.va.gov/',
    analytics: {
      onCancel: () => console.log('Analytics event: Canceled'),
      onPress: () => console.log('Analytics event: Pressed'),
      onConfirm: () => console.log('Analytics event: Confirmed'),
    },
  },
}
