import { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { View } from 'react-native'

import { Button, ButtonVariants } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { Link } from '../Link/Link'
import { Spacer, SpacerProps } from './Spacer'

const meta: Meta<SpacerProps> = {
  title: 'Spacer',
  component: Spacer,
}

export default meta

type Story = StoryObj<SpacerProps>

export const Horizontal: Story = {
  args: {
    horizontal: true,
  },
  decorators: [
    (Story) => (
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <Icon name="Info" preventScaling />
        <Story />
        <Link text="Link text after Spacer" type="custom" onPress={() => {}} />
      </View>
    ),
  ],
}

export const Vertical: Story = {
  decorators: [
    (Story) => (
      <View style={{ alignItems: 'center', flexDirection: 'column' }}>
        <Button label="Button before Spacer" onPress={() => {}} />
        <Story />
        <Button
          label="Button after Spacer"
          buttonType={ButtonVariants.Secondary}
          onPress={() => {}}
        />
      </View>
    ),
  ],
}
