import {
  Controls,
  Description,
  IconGallery,
  IconItem,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks'
import React from 'react'

import { Icon } from '../components/Icon/Icon'
import { IconMap } from '../components/Icon/iconList'

// Export related hooks
export { useWebStorybookColorScheme } from './hooks/useWebStorybookColorScheme'

type DocProps = {
  icons?: typeof IconMap
}

/**
 * Custom Storybook docs generator function
 * @param name - Name of the component
 * @param docUrl - URL for the component's documentation on the docs site
 * @param icons - IconGallery documentation section passthrough
 * @returns
 */
export const generateDocs = ({ icons }: DocProps) => ({
  page: () => (
    <>
      <Title />
      <Subtitle />
      <Description />
      <Primary />
      <Controls />
      {icons ? buildIconGallery(icons) : null}
      <Stories />
    </>
  ),
})

/**
 * Function to create a gallery of all icons for documentation
 * @returns JSX Element containing grid displaying all icons
 */
const buildIconGallery = (icons: typeof IconMap) => {
  const iconItems = []
  const iconMapArray = Object.keys(icons)

  for (const icon of iconMapArray) {
    iconItems.push(
      <IconItem name={icon} key={icon}>
        {/* @ts-ignore - Typed as string, but derived from IconMap names */}
        <Icon name={icon} />
      </IconItem>,
    )
  }

  return <IconGallery>{iconItems}</IconGallery>
}

export default generateDocs
