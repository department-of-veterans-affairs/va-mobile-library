import { Meta, StoryObj } from '@storybook/react'
import { Platform, View } from 'react-native'
import React from 'react'

import { Button } from '../Button/Button'
import { Snackbar, SnackbarProps, useSnackbar } from './Snackbar'
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

const mobileComponentRenderer = (props: SnackbarProps) => {
  const { isError, messageA11y, onActionPressed } = props.data || {}
  const { show } = useSnackbar()
  const onPressSnackbarOffset = () => {
    show(props.message as string, {
      isError,
      messageA11y,
      onActionPressed,
      offset: 500,
    })
  }

  const onPressSnackbar = () => {
    show(props.message as string, {
      isError,
      messageA11y,
      onActionPressed,
    })
  }
  return (
    <>
      <Button label="500 Offset" onPress={onPressSnackbarOffset} />
      <Button label="Default Offset" onPress={onPressSnackbar} />
    </>
  )
}

export const _Snackbar: Story = {
  render: Platform.OS !== 'web' ? mobileComponentRenderer : undefined, // Render Snackbar flat in web
  args: {
    message: 'Message moved to Test Folder',
    data: {
      isError: false,
      messageA11y: 'Message moved to Custom Folder with a11y',
      onActionPressed: () => console.log('Action pressed'),
    },
  },
}
