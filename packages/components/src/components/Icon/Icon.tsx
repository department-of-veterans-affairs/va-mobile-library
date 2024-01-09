import { SvgProps } from 'react-native-svg'
import React, { FC, useEffect, useState } from 'react'

// Navigation
import { AppState, AppStateStatus, PixelRatio, View } from 'react-native'
import BenefitsSelected from '@department-of-veterans-affairs/mobile-assets/svgs/navIcon/BenefitsSelected.svg'
import BenefitsUnselected from '@department-of-veterans-affairs/mobile-assets/svgs/navIcon/BenefitsUnselected.svg'
import HealthSelected from '@department-of-veterans-affairs/mobile-assets/svgs/navIcon/HealthSelected.svg'
import HealthUnselected from '@department-of-veterans-affairs/mobile-assets/svgs/navIcon/HealthUnselected.svg'
import HomeSelected from '@department-of-veterans-affairs/mobile-assets/svgs/navIcon/HomeSelected.svg'
import HomeUnselected from '@department-of-veterans-affairs/mobile-assets/svgs/navIcon/HomeUnselected.svg'
import PaymentsSelected from '@department-of-veterans-affairs/mobile-assets/svgs/navIcon/PaymentsSelected.svg'
import PaymentsUnselected from '@department-of-veterans-affairs/mobile-assets/svgs/navIcon/PaymentsUnselected.svg'
import ProfileSelected from '@department-of-veterans-affairs/mobile-assets/svgs/navIcon/ProfileSelected.svg'

// Chevrons
import ChevronDown from '@department-of-veterans-affairs/mobile-assets/svgs/ChevronDown.svg'
import ChevronLeft from '@department-of-veterans-affairs/mobile-assets/svgs/ChevronLeft.svg'
import ChevronRight from '@department-of-veterans-affairs/mobile-assets/svgs/ChevronRight.svg'
import ChevronUp from '@department-of-veterans-affairs/mobile-assets/svgs/ChevronUp.svg'

// Branch icons
import AirForce from '@department-of-veterans-affairs/mobile-assets/svgs/dodBranch/AirForce.svg'
import Army from '@department-of-veterans-affairs/mobile-assets/svgs/dodBranch/Army.svg'
import CoastGuard from '@department-of-veterans-affairs/mobile-assets/svgs/dodBranch/CoastGuard.svg'
import MarineCorps from '@department-of-veterans-affairs/mobile-assets/svgs/dodBranch/MarineCorps.svg'
import Navy from '@department-of-veterans-affairs/mobile-assets/svgs/dodBranch/Navy.svg'

// Links
import Calendar from '@department-of-veterans-affairs/mobile-assets/svgs/links/Calendar.svg'
import Chat from '@department-of-veterans-affairs/mobile-assets/svgs/links/Chat.svg'
import CircleExternalLink from '@department-of-veterans-affairs/mobile-assets/svgs/links/CircleExternalLink.svg'
import CirclePhone from '@department-of-veterans-affairs/mobile-assets/svgs/links/CirclePhone.svg'
import Directions from '@department-of-veterans-affairs/mobile-assets/svgs/links/Directions.svg'
import PhoneTTY from '@department-of-veterans-affairs/mobile-assets/svgs/links/PhoneTTY.svg'
import Text from '@department-of-veterans-affairs/mobile-assets/svgs/links/Text.svg'

// VASelector
import CheckBoxEmpty from '@department-of-veterans-affairs/mobile-assets/svgs/checkbox/CheckBoxEmpty.svg'
import CheckBoxError from '@department-of-veterans-affairs/mobile-assets/svgs/checkbox/CheckBoxError.svg'
import CheckBoxFilled from '@department-of-veterans-affairs/mobile-assets/svgs/checkbox/CheckBoxFilled.svg'
import CheckBoxIntermediate from '@department-of-veterans-affairs/mobile-assets/svgs/checkbox/CheckBoxIntermediate.svg'
import RadioEmpty from '@department-of-veterans-affairs/mobile-assets/svgs/radio/RadioEmpty.svg'
import RadioFilled from '@department-of-veterans-affairs/mobile-assets/svgs/radio/RadioFilled.svg'

// Misc
import Add from '@department-of-veterans-affairs/mobile-assets/svgs/Add.svg'
import Building from '@department-of-veterans-affairs/mobile-assets/svgs/Building.svg'
import Bullet from '@department-of-veterans-affairs/mobile-assets/svgs/Bullet.svg'
import CheckMark from '@department-of-veterans-affairs/mobile-assets/svgs/CheckMark.svg'
import CircleCheckMark from '@department-of-veterans-affairs/mobile-assets/svgs/CircleCheckMark.svg'
import Compose from '@department-of-veterans-affairs/mobile-assets/svgs/Compose.svg'
import Ellipsis from '@department-of-veterans-affairs/mobile-assets/svgs/Ellipsis.svg'
import ExclamationTriangle from '@department-of-veterans-affairs/mobile-assets/svgs/ExclamationTriangle.svg'
import ExternalLink from '@department-of-veterans-affairs/mobile-assets/svgs/ExternalLink.svg'
import Folder from '@department-of-veterans-affairs/mobile-assets/svgs/Folder.svg'
import Inbox from '@department-of-veterans-affairs/mobile-assets/svgs/Inbox.svg'
import Info from '@department-of-veterans-affairs/mobile-assets/svgs/Info.svg'
import Lock from '@department-of-veterans-affairs/mobile-assets/svgs/Lock.svg'
import Logo from '@department-of-veterans-affairs/mobile-assets/svgs/vaParentLogo/Logo.svg'
import Minus from '@department-of-veterans-affairs/mobile-assets/svgs/Minus.svg'
import PaperClip from '@department-of-veterans-affairs/mobile-assets/svgs/PaperClip.svg'
import Phone from '@department-of-veterans-affairs/mobile-assets/svgs/Phone.svg'
import QuestionMark from '@department-of-veterans-affairs/mobile-assets/svgs/QuestionMark.svg'
import Redo from '@department-of-veterans-affairs/mobile-assets/svgs/Redo.svg'
import Remove from '@department-of-veterans-affairs/mobile-assets/svgs/Remove.svg'
import Reply from '@department-of-veterans-affairs/mobile-assets/svgs/Reply.svg'
import Sort from '@department-of-veterans-affairs/mobile-assets/svgs/Sort.svg'
import Trash from '@department-of-veterans-affairs/mobile-assets/svgs/Trash.svg'
import Truck from '@department-of-veterans-affairs/mobile-assets/svgs/Truck.svg'
import Unread from '@department-of-veterans-affairs/mobile-assets/svgs/Unread.svg'
import UploadPhoto from '@department-of-veterans-affairs/mobile-assets/svgs/UploadPhoto.svg'
import VideoCamera from '@department-of-veterans-affairs/mobile-assets/svgs/VideoCamera.svg'

const IconMap = {
  Add,
  AirForce,
  Army,
  BenefitsSelected,
  BenefitsUnselected,
  Building,
  Bullet,
  Calendar,
  Chat,
  CheckBoxEmpty,
  CheckBoxError,
  CheckBoxFilled,
  CheckBoxIntermediate,
  CheckMark,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleCheckMark,
  CircleExternalLink,
  CirclePhone,
  CoastGuard,
  Compose,
  Directions,
  Ellipsis,
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
  PhoneTTY,
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
  Unread,
  UploadPhoto,
  VideoCamera,
}

/**
 *  Props that need to be passed in to {@link Icon}
 */
export type IconProps = {
  /**  enum name of the icon to use {@link IconMap} **/
  name?: keyof typeof IconMap

  /** SVG passed to display */
  svg?: React.FC<SvgProps>

  /** Fill color for the icon */
  fill?: string // keyof IconColors | keyof VATextColors | string

  /** Secondary fill color for duotone icons--fills icons inside main fill, defaults white */
  fill2?: string

  /** Stroke color of the icon */
  stroke?: string

  /**  optional number use to set the width; otherwise defaults to svg's width */
  width?: number

  /**  optional number use to set the height; otherwise defaults to svg's height */
  height?: number

  /** optional maximum width when scaled (requires width and height props) */
  maxWidth?: number

  /** if true, prevents icon from being scaled (requires width and height props) */
  preventScaling?: boolean

  /** Optional TestID */
  testID?: string

  /** optional top margin */
  marginTop?: number

  /** optional bottom margin */
  marginBottom?: number

  /** optional right margin */
  marginRight?: number

  /** optional left margin */
  marginLeft?: number

  /** optional top padding */
  paddingTop?: number

  /** optional bottom padding */
  paddingBottom?: number

  /** optional right padding */
  paddingRight?: number

  /** optional left padding */
  paddingLeft?: number
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
  width,
  height,
  fill,
  fill2,
  stroke,
  maxWidth,
  preventScaling,
  testID,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
}) => {
  const [fontScale, setFontScale] = useState<number>(PixelRatio.getFontScale())
  const fs = (val: number) => fontScale * val

  let iconProps = {
    name,
    width,
    height,
    preventScaling,
    fill,
    stroke,
    color: fill2,
  }

  const viewProps = {
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
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

  if (!_Icon) {
    return <></>
  }

  if (width && height) {
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
  }

  return (
    <View testID={testID} style={viewProps}>
      <_Icon {...iconProps} />
    </View>
  )
}
