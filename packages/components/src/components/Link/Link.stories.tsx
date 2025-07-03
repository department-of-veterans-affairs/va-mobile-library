import { Meta, StoryObj } from '@storybook/react-native-web-vite'

import { Link, LinkProps } from './Link'

const meta = {
  title: 'Link',
  component: Link,
  argTypes: {
    onPress: {
      action: 'onPress event',
    },
  },
} satisfies Meta<typeof Link>

export default meta

type Story = StoryObj<LinkProps>

export const Default: Story = {
  args: {
    text: 'Link opens in the app',
    type: 'custom',
    onPress: () => {},
    analytics: {
      onPress: () => console.log('Analytics event: Pressed'),
    },
  },
}

export const DefaultWithIcon: Story = {
  name: 'Default (with icon)',
  args: {
    text: 'Link opens an external app',
    icon: { name: 'CleanHands' },
    type: 'custom',
    onPress: () => {},
  },
}

export const _Attachment: Story = {
  args: {
    text: 'Attachment.pdf',
    onPress: undefined, // Storybook sends a truthy function shell otherwise
    type: 'attachment',
    a11yValue: { index: 2, total: 5 },
  },
}

export const _Calendar: Story = {
  args: {
    text: 'Add to calendar',
    onPress: undefined, // Storybook sends a truthy function shell otherwise
    type: 'calendar',
  },
}

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
    analytics: {
      onCancel: () => console.log('Analytics event: Canceled'),
      onPress: () => console.log('Analytics event: Pressed'),
      onConfirm: () => console.log('Analytics event: Confirmed'),
      onOpenURLError: (e, url) => {
        console.log(JSON.stringify(e))
        console.log('Error: ' + e)
        console.log('Error opening URL: ' + url)
      },
    },
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
