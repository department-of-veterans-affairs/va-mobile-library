import { ColorValue, View, ViewStyle, useWindowDimensions } from 'react-native'
import { FC } from 'react'
import { SvgProps } from 'react-native-svg'

import { IconMap } from './iconList'
import { useColorScheme, useTheme } from '../../utils'

type nameOrSvg =
  | {
      /** Name of preset icon to use {@link IconMap} **/
      name: keyof typeof IconMap | 'none'
      svg?: never
    }
  | {
      name?: never
      /** Custom SVG passed to display */
      svg: FC<SvgProps>
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
    /** Wraps in View that aligns the icon with text of line height passed */
    alignWithTextLineHeight?: number
    /** Fill color for the icon, defaults to light/dark mode primary blue */
    fill?: 'default' | 'base' | ColorValue | lightDarkModeFill
    /** Optional maximum width when scaled */
    maxWidth?: number
    /** True to prevent icon from being scaled */
    preventScaling?: boolean
    /** Optional TestID */
    testID?: string
  }

/**
 * #### [<u>View guidance for the Icon component on the VA Design System</u>](https://design.va.gov/components/icon)
 *
 * Convenience component to display Icons that are in .svg file format. A set
 * of pre-loaded icons can be found in the [mobile-assets](https://www.npmjs.com/package/\@department-of-veterans-affairs/mobile-assets)
 * package. Custom SVGs can also be used if your project is configured to
 * import them. See [\@svgr/webpack](https://www.npmjs.com/package/\@svgr/webpack)
 * for webpack setup guidance.
 */
export const Icon: FC<IconProps> = ({
  name,
  svg,
  width = 24,
  height = 24,
  alignWithTextLineHeight,
  fill = 'default',
  maxWidth,
  preventScaling,
  testID,
}) => {
  const theme = useTheme()
  const colorScheme = useColorScheme()
  const fontScale = useWindowDimensions().fontScale
  const fs = (val: number) => fontScale * val

  if (name === 'none') return null

  // ! to override TS incorrectly thinking svg can be undefined after update
  const _Icon: FC<SvgProps> = name ? IconMap[name] : svg!

  if (typeof fill === 'object') {
    fill = colorScheme === 'dark' ? fill.dark : fill.light
  } else if (fill === 'default') {
    fill = theme.vadsColorActionForegroundDefault
  } else if (fill === 'base') {
    fill = theme.vadsColorForegroundDefault
  }

  let iconProps: SvgProps = { fill }

  // Set height/width
  if (preventScaling) {
    iconProps = { ...iconProps, width, height }
  } else if (maxWidth && fs(width) > maxWidth) {
    const scaledHeight = (maxWidth / width) * height
    iconProps = { ...iconProps, width: maxWidth, height: scaledHeight }
  } else {
    iconProps = { ...iconProps, width: fs(width), height: fs(height) }
  }

  if (alignWithTextLineHeight) {
    const viewStyle: ViewStyle = {
      alignSelf: 'flex-start',
      minHeight: alignWithTextLineHeight * fontScale,
      alignItems: 'center',
      justifyContent: 'center',
    }

    return (
      <View style={viewStyle}>
        <_Icon {...iconProps} testID={testID} />
      </View>
    )
  }

  return <_Icon {...iconProps} testID={testID} />
}
