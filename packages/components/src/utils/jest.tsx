import { RenderResult } from '@testing-library/react-native'

import { Icon } from '../components/Icon/Icon'

/**
 * Returns Icon on the screen
 */
export const getIcon = async (screen: RenderResult) =>
  await screen.root.findByType(Icon)

/**
 * Returns the name of the Icon on the screen
 */
export const getIconName = async (screen: RenderResult) => {
  const icon = await getIcon(screen)
  return icon.props.name
}
