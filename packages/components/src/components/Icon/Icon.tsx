import { ColorValue, useWindowDimensions } from 'react-native'
import { Colors } from '@department-of-veterans-affairs/mobile-tokens'
import { SvgProps } from 'react-native-svg'
import React, { FC } from 'react'

// import './iconImport'
// import { IconMap } from './iconImport'
// import * as Test from './index'
// import './index'
import { IconMap } from './index'
import { useColorScheme } from '../../utils'

type nameOrSvg =
  | {
      /** Name of preset icon to use {@link IconMap} **/
      name: keyof typeof IconMap
      svg?: never
    }
  | {
      name?: never
      /** Custom SVG passed to display */
      svg: React.FC<SvgProps>
    }

type heightAndWidth =
  | {
      /** Optional height override; otherwise 24 */
      height: number
      /** Optional width override; otherwise 24 */
      width: number
    }
  | {
      height?: never
      width?: never
    }

type lightDarkModeFill = {
  light: string
  dark: string
}

/**
 *  Props that need to be passed in to {@link Icon}
 */
export type IconProps = nameOrSvg &
  heightAndWidth & {
    /** Fill color for the icon, defaults to light/dark mode primary blue */
    fill?: 'default' | 'base' | ColorValue | lightDarkModeFill
    /** Slated for deprecation. Icon updates eliminating duotone icons over time.
     * Secondary fill color for duotone icons--fills icons inside main fill, defaults white */
    fill2?: string
    /** Stroke color of the icon */
    stroke?: string
    /** Optional maximum width when scaled */
    maxWidth?: number
    /** True to prevent icon from being scaled */
    preventScaling?: boolean
    /** Optional TestID */
    testID?: string
  }

/**
 * Convenience component to display Icons that are in .svg file format. A set
 * of pre-loaded icons can be found in the [mobile-assets](https://www.npmjs.com/package/\@department-of-veterans-affairs/mobile-assets)
 * package. Custom SVGs can also be used if your project is configured to
 * import them. See [\@svgr/webpack](https://www.npmjs.com/package/\@svgr/webpack)
 * for webpack setup guidance.
 *
 * For all icons in the SVG definitions, on the primary/only path:
 *    - Set `fill` to `#000` to inherit Icon's fill color prop
 * If the SVG icon is duotone, additionally:
 *    - Set `color` to `#fff` on the top level svg (not path)
 *    - Set `fill` to `currentColor` on the secondary path to inherit Icon's fill2 color prop
 * If the SVG icon uses stroke, additionally:
 *    - Set `stroke` to `#00F` to inherit Icon's stroke color prop
 *
 * Example icons of each classification:
 *    - One layer: HomeSelected.svg
 *    - Duotone: CircleCheckMark.svg
 *    - Stroke: RadioEmpty.svg
 *
 * @returns Icon component
 */
export const Icon: FC<IconProps> = ({
  name,
  svg,
  width = 24,
  height = 24,
  fill = 'default',
  fill2 = Colors.white,
  stroke,
  maxWidth,
  preventScaling,
  testID,
}) => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const fontScale = useWindowDimensions().fontScale
  const fs = (val: number) => fontScale * val

  // ! to override TS incorrectly thinking svg can be undefined after update
  const _Icon: FC<SvgProps> = name ? IconMap[name] : svg!

  if (typeof fill === 'object') {
    fill = isDarkMode ? fill.dark : fill.light
  } else if (fill === 'default') {
    fill = isDarkMode ? Colors.uswdsBlueVivid30 : Colors.primary
  } else if (fill === 'base') {
    fill = isDarkMode ? Colors.grayLightest : Colors.grayDark
  }

  let iconProps: SvgProps = {
    fill,
    stroke,
    color: fill2,
  }

  // Set height/width
  if (preventScaling) {
    iconProps = { ...iconProps, width, height }
  } else if (maxWidth && fs(width) > maxWidth) {
    const scaledHeight = (maxWidth / width) * height
    iconProps = { ...iconProps, width: maxWidth, height: scaledHeight }
  } else {
    iconProps = { ...iconProps, width: fs(width), height: fs(height) }
  }

  return <_Icon {...iconProps} testID={testID} />
}
