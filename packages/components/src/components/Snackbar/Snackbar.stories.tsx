import { Meta, StoryObj } from '@storybook/react'
import { Platform, View } from 'react-native'
import React from 'react'

import { Button } from '../Button/Button'
import { Snackbar, SnackbarOptions, SnackbarProps } from './Snackbar'
import { useSnackbar } from './useSnackbar'

const meta: Meta<SnackbarProps> = {
  title: 'Snackbar',
  component: Snackbar,
  decorators:
    Platform.OS === 'web'
      ? [
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
        ]
      : undefined,
}

export default meta

type storyArgs = { message: string; data?: SnackbarOptions }

type Story = StoryObj<storyArgs>

/**
 * Handles rendering the story in non-web platforms to have functional Snackbar
 * @param props - Arguments from `args` list
 * @returns Flat Button display with onPress logic to pull up the Snackbar
 */
const mobileComponentRenderer = (props: storyArgs) => {
  const { show } = useSnackbar()
  const onPressSnackbar = () => show(props.message, props.data)

  return <Button label="Press for Snackbar" onPress={onPressSnackbar} />
}

// Render Snackbar flat in web
const render = Platform.OS !== 'web' ? mobileComponentRenderer : undefined

export const _Default: Story = {
  render,
  args: {
    message: 'Message moved to Test Folder',
    data: {
      isError: false,
      messageA11y: 'Message moved to Test Folder with accessibility override',
    },
  },
}

export const _WithAction: Story = {
  render,
  args: {
    message: 'Message sent',
    data: {
      isError: false,
      messageA11y: 'Message sent with accessibility override',
      onActionPressed: () => console.log('Action pressed'),
    },
  },
}
