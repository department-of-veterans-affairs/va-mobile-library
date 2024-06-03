import { ColorValue, useWindowDimensions } from 'react-native'
import { Colors } from '@department-of-veterans-affairs/mobile-tokens'
import { SvgProps } from 'react-native-svg'
import React, { FC, useContext } from 'react'

import { SettingsContext } from '../../SettingsProvider'
import { useColorScheme } from '../../utils'

import AccountCircle from '@department-of-veterans-affairs/mobile-assets/icons/AccountCircle.svg'
import Add from '@department-of-veterans-affairs/mobile-assets/icons/Add.svg'
import Building from '@department-of-veterans-affairs/mobile-assets/icons/Building.svg'
import Bullet from '@department-of-veterans-affairs/mobile-assets/icons/Bullet.svg'
import Calendar from '@department-of-veterans-affairs/mobile-assets/icons/Calendar.svg'
import Check from '@department-of-veterans-affairs/mobile-assets/icons/Check.svg'
import CheckBoxEmpty from '@department-of-veterans-affairs/mobile-assets/icons/CheckBoxEmpty.svg'
import CheckBoxError from '@department-of-veterans-affairs/mobile-assets/icons/CheckBoxError.svg'
import CheckBoxFilled from '@department-of-veterans-affairs/mobile-assets/icons/CheckBoxFilled.svg'
import CheckBoxIntermediate from '@department-of-veterans-affairs/mobile-assets/icons/CheckBoxIntermediate.svg'
import ChevronDown from '@department-of-veterans-affairs/mobile-assets/icons/ChevronDown.svg'
import ChevronLeft from '@department-of-veterans-affairs/mobile-assets/icons/ChevronLeft.svg'
import ChevronRight from '@department-of-veterans-affairs/mobile-assets/icons/ChevronRight.svg'
import ChevronUp from '@department-of-veterans-affairs/mobile-assets/icons/ChevronUp.svg'
import CircleCheckMark from '@department-of-veterans-affairs/mobile-assets/icons/CircleCheckMark.svg'
import Compose from '@department-of-veterans-affairs/mobile-assets/icons/Compose.svg'
import Description from '@department-of-veterans-affairs/mobile-assets/icons/Description.svg'
import DescriptionOutline from '@department-of-veterans-affairs/mobile-assets/icons/DescriptionOutline.svg'
import Directions from '@department-of-veterans-affairs/mobile-assets/icons/Directions.svg'
import Ellipsis from '@department-of-veterans-affairs/mobile-assets/icons/Ellipsis.svg'
import ExclamationCircle from '@department-of-veterans-affairs/mobile-assets/icons/ExclamationCircle.svg'
import ExclamationTriangle from '@department-of-veterans-affairs/mobile-assets/icons/ExclamationTriangle.svg'
import ExternalLink from '@department-of-veterans-affairs/mobile-assets/icons/ExternalLink.svg'
import FileInvoiceDollar from '@department-of-veterans-affairs/mobile-assets/icons/FileInvoiceDollar.svg'
import FileInvoiceDollarOutline from '@department-of-veterans-affairs/mobile-assets/icons/FileInvoiceDollarOutline.svg'
import Folder from '@department-of-veterans-affairs/mobile-assets/icons/Folder.svg'
import Home from '@department-of-veterans-affairs/mobile-assets/icons/Home.svg'
import HomeOutline from '@department-of-veterans-affairs/mobile-assets/icons/HomeOutline.svg'
import Inbox from '@department-of-veterans-affairs/mobile-assets/icons/Inbox.svg'
import Info from '@department-of-veterans-affairs/mobile-assets/icons/Info.svg'
import Lock from '@department-of-veterans-affairs/mobile-assets/icons/Lock.svg'
import MedicalServices from '@department-of-veterans-affairs/mobile-assets/icons/MedicalServices.svg'
import MedicalServicesOutline from '@department-of-veterans-affairs/mobile-assets/icons/MedicalServicesOutline.svg'
import Minus from '@department-of-veterans-affairs/mobile-assets/icons/Minus.svg'
import PaperClip from '@department-of-veterans-affairs/mobile-assets/icons/PaperClip.svg'
import Phone from '@department-of-veterans-affairs/mobile-assets/icons/Phone.svg'
import QuestionMark from '@department-of-veterans-affairs/mobile-assets/icons/QuestionMark.svg'
import RadioEmpty from '@department-of-veterans-affairs/mobile-assets/icons/RadioEmpty.svg'
import RadioFilled from '@department-of-veterans-affairs/mobile-assets/icons/RadioFilled.svg'
import Redo from '@department-of-veterans-affairs/mobile-assets/icons/Redo.svg'
import Remove from '@department-of-veterans-affairs/mobile-assets/icons/Remove.svg'
import Reply from '@department-of-veterans-affairs/mobile-assets/icons/Reply.svg'
import Sort from '@department-of-veterans-affairs/mobile-assets/icons/Sort.svg'
import TTY from '@department-of-veterans-affairs/mobile-assets/icons/TTY.svg'
import Text from '@department-of-veterans-affairs/mobile-assets/icons/Text.svg'
import Trash from '@department-of-veterans-affairs/mobile-assets/icons/Trash.svg'
import Truck from '@department-of-veterans-affairs/mobile-assets/icons/Truck.svg'
import Unread from '@department-of-veterans-affairs/mobile-assets/icons/Unread.svg'
import VideoCamera from '@department-of-veterans-affairs/mobile-assets/icons/VideoCamera.svg'

export const IconMap = {
  AccountCircle,
  Add,
  Building,
  Bullet,
  Calendar,
  CheckBoxEmpty,
  CheckBoxError,
  CheckBoxFilled,
  CheckBoxIntermediate,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleCheckMark,
  Compose,
  Description,
  DescriptionOutline,
  Directions,
  Ellipsis,
  ExclamationCircle,
  ExclamationTriangle,
  ExternalLink,
  FileInvoiceDollar,
  FileInvoiceDollarOutline,
  Folder,
  Home,
  HomeOutline,
  Inbox,
  Info,
  Lock,
  MedicalServices,
  MedicalServicesOutline,
  Minus,
  PaperClip,
  Phone,
  QuestionMark,
  RadioEmpty, // Also used for RadioDisabled content--same icon, different colors
  RadioFilled,
  Redo,
  Remove,
  Reply,
  Sort,
  Text,
  Trash,
  Truck,
  TTY,
  Unread,
  VideoCamera,
}

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
  const { Icon: IconSettings, allowDarkMode } = useContext(SettingsContext)

  const globalMaxWidth = IconSettings?.maxWidth || 10
  console.log('allowDarkMode', allowDarkMode)
  console.log('globalMaxWidth', globalMaxWidth)

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

  const _maxWidth = globalMaxWidth || maxWidth

  console.log(_maxWidth)

  // Set height/width
  if (preventScaling) {
    iconProps = { ...iconProps, width, height }
  } else if (_maxWidth && fs(width) > _maxWidth) {
    const scaledHeight = (_maxWidth / width) * height
    iconProps = { ...iconProps, width: _maxWidth, height: scaledHeight }
  } else {
    iconProps = { ...iconProps, width: fs(width), height: fs(height) }
  }

  return <_Icon {...iconProps} testID={testID} />
}
