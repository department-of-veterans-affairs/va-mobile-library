import { Meta, StoryObj } from '@storybook/react-native'
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
  parameters: {
    docs: generateDocs({
      name: 'Link',
      docUrl:
        'https://department-of-veterans-affairs.github.io/va-mobile-app/design/Components/Buttons%20and%20links/Link',
    }),
  },
  decorators: [
    (Story) => (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
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
  "id": "983GC",
  "lat": 40.553875,
  "long": -105.08795,
  "name":"Fort Collins VA Clinic",
  "address": {
    "street": "2509 Research Boulevard",
    "city": "Fort Collins",
    "state": "CO",
    "zipCode": "80526-8108"
  }
}
const getLocation = (): string => {
  const { lat, long, name, address } = location
  if (Platform.OS === 'ios' && lat && long) {
    return name || ''
  } else if (address?.street && address?.city && address?.state && address?.zipCode) {
    return `${address.street} ${address.city}, ${address.state} ${address.zipCode}`
  } else {
    return name || ''
  }
}

export const Calendar: Story = {
  storyName: 'Calendar',
  args: {
    text: 'Button text',
    type: {type: 'calendar', calendarData: {
      title: 'Test',
      startTime: startTime.getTime(),
      endTime: endTime.getTime(),
      location: getLocation(),
      latitude: location.lat,
      longitude: location.long
    }}
    // a11yLabel: 'Alternate a11y text',
    },
}

export const Phone: Story = {
  args: {
    text: 'Call number',
    type: {type: 'call', phoneNumber: '555'}
    // a11yLabel: 'Alternate a11y text',
    },
}

export const PhoneTTY: Story = {
  args: {
    text: 'Call TTY number',
    type: {type: 'call TTY', TTYnumber: '711'}
    // a11yLabel: 'Alternate a11y text',
    },
}
export const Text: Story = {
  args: {
    text: 'Text SMS number',
    type: {type: 'text', textNumber: '55555'}
    // a11yLabel: 'Alternate a11y text',
    },
}

export const URL: Story = {
  args: {
    text: 'External link',
    type: {type: 'url', url: 'https://www.va.gov/'}
    // a11yLabel: 'Alternate a11y text',
    },
}