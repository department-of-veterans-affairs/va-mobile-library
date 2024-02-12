import { Meta, StoryObj } from '@storybook/react'
import { Platform, View } from 'react-native'
import React from 'react'

import { Link, LinkProps } from './Link'
import { generateDocs } from '../../utils/storybook'

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

export const Calendar: Story = {
  name: 'Calendar',
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

export const Custom: Story = {
  name: 'Custom Link w/o Icon',
  args: {
    text: 'Custom Link - no icon',
    type: 'custom',
    onPress: () => {
      null
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
  },
}
