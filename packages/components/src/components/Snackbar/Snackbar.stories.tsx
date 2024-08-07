import { Meta, StoryObj } from '@storybook/react'
import { Platform, View } from 'react-native'
import React from 'react'

import { Button } from '../Button/Button'
import { ShowSnackbar, Snackbar, SnackbarProps } from './Snackbar'
import { generateDocs } from '../../utils/storybook'

const meta: Meta<SnackbarProps> = {
  title: 'Snackbar',
  component: Snackbar,
  decorators: [
    (Story) => (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {Story()}
      </View>
    ),
  ],
  parameters: {
    docs: generateDocs({
      name: 'Snackbar',
      docUrl:
        'https://department-of-veterans-affairs.github.io/va-mobile-app/design/Components/Alerts%20and%20progress/Snackbar',
    }),
  },
}

export default meta

type Story = StoryObj<SnackbarProps>

/**
 * Handles rendering the story in non-web platforms to have functional Snackbar
 * @param props - Arguments from `args` list
 * @returns Flat Button display with onPress logic to pull up the Snackbar
 */
const mobileComponentRenderer = (props: SnackbarProps) => {
  const { isError, messageA11y, onActionPressed } = props.data || {}
  const onPressSnackbar = () => {
    ShowSnackbar(props.message as string, {
      isError,
      messageA11y,
      onActionPressed,
    })
  }

  return <Button label="Press for Snackbar" onPress={onPressSnackbar} />
}

export const _Snackbar: Story = {
  render: Platform.OS !== 'web' ? mobileComponentRenderer : undefined, // Render Snackbar flat in web
  args: {
    message: 'Message moved to Test Folder',
    data: {
      isError: false,
      messageA11y: 'Message moved to Test Folder with accessibility override',
      onActionPressed: () => console.log('Action pressed'),
    },
  },
}
