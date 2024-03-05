import { AppState, AppStateStatus, PixelRatio } from 'react-native'
import { SvgProps } from 'react-native-svg'
import React, { FC, useEffect, useState } from 'react'

import { Colors } from '@department-of-veterans-affairs/mobile-tokens'

// TODO: Ticket 102 merge Navigation icons into the general icon list below
// Navigation
import BenefitsSelected from '@department-of-veterans-affairs/mobile-assets/svgs/navIcon/BenefitsSelected.svg'
import BenefitsUnselected from '@department-of-veterans-affairs/mobile-assets/svgs/navIcon/BenefitsUnselected.svg'
import HealthSelected from '@department-of-veterans-affairs/mobile-assets/svgs/navIcon/HealthSelected.svg'
import HealthUnselected from '@department-of-veterans-affairs/mobile-assets/svgs/navIcon/HealthUnselected.svg'
import HomeSelected from '@department-of-veterans-affairs/mobile-assets/svgs/navIcon/HomeSelected.svg'
import HomeUnselected from '@department-of-veterans-affairs/mobile-assets/svgs/navIcon/HomeUnselected.svg'
import PaymentsSelected from '@department-of-veterans-affairs/mobile-assets/svgs/navIcon/PaymentsSelected.svg'
import PaymentsUnselected from '@department-of-veterans-affairs/mobile-assets/svgs/navIcon/PaymentsUnselected.svg'
import ProfileSelected from '@department-of-veterans-affairs/mobile-assets/svgs/navIcon/ProfileSelected.svg'

// Branch emblems
import AirForce from '@department-of-veterans-affairs/mobile-assets/svgs/dodBranch/AirForce.svg'
import Army from '@department-of-veterans-affairs/mobile-assets/svgs/dodBranch/Army.svg'
import CoastGuard from '@department-of-veterans-affairs/mobile-assets/svgs/dodBranch/CoastGuard.svg'
import MarineCorps from '@department-of-veterans-affairs/mobile-assets/svgs/dodBranch/MarineCorps.svg'
import Navy from '@department-of-veterans-affairs/mobile-assets/svgs/dodBranch/Navy.svg'

// VA Logo
import Logo from '@department-of-veterans-affairs/mobile-assets/svgs/vaParentLogo/Logo.svg'

// TODO: Ticket 102 merge VASelector icons into the general icon list below
// VASelector
import CheckBoxEmpty from '@department-of-veterans-affairs/mobile-assets/svgs/checkbox/CheckBoxEmpty.svg'
import CheckBoxError from '@department-of-veterans-affairs/mobile-assets/svgs/checkbox/CheckBoxError.svg'
import CheckBoxFilled from '@department-of-veterans-affairs/mobile-assets/svgs/checkbox/CheckBoxFilled.svg'
import CheckBoxIntermediate from '@department-of-veterans-affairs/mobile-assets/svgs/checkbox/CheckBoxIntermediate.svg'
import RadioEmpty from '@department-of-veterans-affairs/mobile-assets/svgs/radio/RadioEmpty.svg'
import RadioFilled from '@department-of-veterans-affairs/mobile-assets/svgs/radio/RadioFilled.svg'

import Add from '@department-of-veterans-affairs/mobile-assets/svgs/Add.svg'
import Building from '@department-of-veterans-affairs/mobile-assets/svgs/Building.svg'
import Bullet from '@department-of-veterans-affairs/mobile-assets/svgs/Bullet.svg'
import Calendar from '@department-of-veterans-affairs/mobile-assets/svgs/Calendar.svg'
import Check from '@department-of-veterans-affairs/mobile-assets/svgs/Check.svg'
import ChevronDown from '@department-of-veterans-affairs/mobile-assets/svgs/ChevronDown.svg'
import ChevronLeft from '@department-of-veterans-affairs/mobile-assets/svgs/ChevronLeft.svg'
import ChevronRight from '@department-of-veterans-affairs/mobile-assets/svgs/ChevronRight.svg'
import ChevronUp from '@department-of-veterans-affairs/mobile-assets/svgs/ChevronUp.svg'
import CircleCheckMark from '@department-of-veterans-affairs/mobile-assets/svgs/CircleCheckMark.svg'
import Compose from '@department-of-veterans-affairs/mobile-assets/svgs/Compose.svg'
import Directions from '@department-of-veterans-affairs/mobile-assets/svgs/Directions.svg'
import Ellipsis from '@department-of-veterans-affairs/mobile-assets/svgs/Ellipsis.svg'
import ExclamationCircle from '@department-of-veterans-affairs/mobile-assets/svgs/ExclamationCircle.svg'
import ExclamationTriangle from '@department-of-veterans-affairs/mobile-assets/svgs/ExclamationTriangle.svg'
import ExternalLink from '@department-of-veterans-affairs/mobile-assets/svgs/ExternalLink.svg'
import Folder from '@department-of-veterans-affairs/mobile-assets/svgs/Folder.svg'
import Inbox from '@department-of-veterans-affairs/mobile-assets/svgs/Inbox.svg'
import Info from '@department-of-veterans-affairs/mobile-assets/svgs/Info.svg'
import Lock from '@department-of-veterans-affairs/mobile-assets/svgs/Lock.svg'
import Minus from '@department-of-veterans-affairs/mobile-assets/svgs/Minus.svg'
import PaperClip from '@department-of-veterans-affairs/mobile-assets/svgs/PaperClip.svg'
import Phone from '@department-of-veterans-affairs/mobile-assets/svgs/Phone.svg'
import QuestionMark from '@department-of-veterans-affairs/mobile-assets/svgs/QuestionMark.svg'
import Redo from '@department-of-veterans-affairs/mobile-assets/svgs/Redo.svg'
import Remove from '@department-of-veterans-affairs/mobile-assets/svgs/Remove.svg'
import Reply from '@department-of-veterans-affairs/mobile-assets/svgs/Reply.svg'
import Sort from '@department-of-veterans-affairs/mobile-assets/svgs/Sort.svg'
import TTY from '@department-of-veterans-affairs/mobile-assets/svgs/TTY.svg'
import Text from '@department-of-veterans-affairs/mobile-assets/svgs/Text.svg'
import Trash from '@department-of-veterans-affairs/mobile-assets/svgs/Trash.svg'
import Truck from '@department-of-veterans-affairs/mobile-assets/svgs/Truck.svg'
import Unread from '@department-of-veterans-affairs/mobile-assets/svgs/Unread.svg'
import VideoCamera from '@department-of-veterans-affairs/mobile-assets/svgs/VideoCamera.svg'

export const IconMap = {
  Add,
  AirForce,
  Army,
  BenefitsSelected,
  BenefitsUnselected,
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
  CoastGuard,
  Compose,
  Directions,
  Ellipsis,
  ExclamationCircle,
  ExclamationTriangle,
  ExternalLink,
  Folder,
  HealthSelected,
  HealthUnselected,
  HomeSelected,
  HomeUnselected,
  Inbox,
  Info,
  Lock,
  Logo,
  MarineCorps,
  Minus,
  Navy,
  PaperClip,
  PaymentsSelected,
  PaymentsUnselected,
  Phone,
  ProfileSelected,
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

/**
 *  Props that need to be passed in to {@link Icon}
 */
export type IconProps = nameOrSvg &
  heightAndWidth & {
    /** Fill color for the icon */
    fill?: string // keyof IconColors | keyof VATextColors | string
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
 * A common component to display assets (SVGs).
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
  fill,
  fill2 = Colors.white,
  stroke,
  maxWidth,
  preventScaling,
  testID,
}) => {
  const [fontScale, setFontScale] = useState<number>(PixelRatio.getFontScale())
  const fs = (val: number) => fontScale * val

  let iconProps: IconProps & SvgProps

  if (name) {
    iconProps = { name }
  } else {
    iconProps = { svg }
  }
  iconProps = {
    ...iconProps,
    width,
    height,
    preventScaling,
    fill,
    stroke,
    color: fill2,
  }

  useEffect(() => {
    // Listener for the current app state, updates the font scale when app state
    // is active and the font scale has changed
    const sub = AppState.addEventListener(
      'change',
      (newState: AppStateStatus): void => {
        if (newState === 'active') {
          const fontScaleUpdated = PixelRatio.getFontScale()
          if (fontScale !== fontScaleUpdated) {
            setFontScale(fontScaleUpdated)
          }
        }
      },
    )
    return (): void => sub?.remove()
  }, [fontScale])

  const _Icon: FC<SvgProps> | undefined = name ? IconMap[name] : svg

  if (preventScaling) {
    iconProps = { ...iconProps, width, height }
  } else if (maxWidth && fs(width) > maxWidth) {
    iconProps = {
      ...iconProps,
      width: maxWidth,
      height: (maxWidth / width) * height,
    }
  } else {
    iconProps = { ...iconProps, width: fs(width), height: fs(height) }
  }

  return <_Icon {...iconProps} testID={testID} />
}
