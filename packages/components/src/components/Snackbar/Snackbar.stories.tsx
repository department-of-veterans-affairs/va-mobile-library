import { Meta, StoryObj } from '@storybook/react'
import { Platform, View } from 'react-native'
import React from 'react'

import { Button } from '../Button/Button'
import { Snackbar, SnackbarProps } from './Snackbar'
import { generateDocs } from '../../utils/storybook'
import { useSnackbar } from '../../hooks/useSnackbar'

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

const isWeb = Platform.OS !== 'web'

const mobileComponentRenderer = (props: SnackbarProps) => {
  const { isError, messageA11y, onActionPressed, offset } = props.data || {}
  const { show } = useSnackbar()
  const onPressSnackbar = () => {
    show(props.message as string, {
      isError,
      messageA11y,
      onActionPressed,
      offset,
    })
  }

  return (
    <>
      <Button label="Press for Snackbar" onPress={onPressSnackbar} />
    </>
  )
}

export const _Default: Story = {
  render: isWeb ? mobileComponentRenderer : undefined, // Render Snackbar flat in web
  args: {
    message: 'Message moved to Test Folder',
    data: {
      isError: false,
      messageA11y: 'Message moved to Custom Folder with a11y',
      onActionPressed: () => console.log('Action pressed'),
    },
  },
}

export const __CustomOffset: Story = {
  render: isWeb ? mobileComponentRenderer : undefined, // Render Snackbar flat in web
  args: {
    message: 'Message moved to Test Folder',
    data: {
      isError: false,
      messageA11y: 'Message moved to Custom Folder with a11y',
      onActionPressed: () => console.log('Action pressed'),
      offset: 200,
    },
  },
}
