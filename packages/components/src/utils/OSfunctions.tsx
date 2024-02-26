/** A file for functions that leverage OS functionality */

import { Alert, Linking, Platform } from 'react-native'
import { useTranslation } from 'react-i18next'

export const isIOS = Platform.OS === 'ios'

type address = {
  street: string
  city: string
  /** 2 letter state abbreviation */
  state: string
  zipCode: string
}

type hasAddress = {
  name: string
  address: address
  latitude?: number
  longitude?: number
}

type hasLatLong = {
  name: string
  address?: address
  latitude: number
  longitude: number
}

export type LocationData = hasAddress | hasLatLong

const APPLE_MAPS_BASE_URL = 'https://maps.apple.com/'
const GOOGLE_MAPS_BASE_URL = 'https://www.google.com/maps/dir/'

/** Function to convert location data into a URL for handling by Apple/Google Maps */
export const FormDirectionsUrl = (location: LocationData): string => {
  const { name, address, latitude, longitude } = location
  const addressString = Object.values(address || {}).join(' ')

  if (isIOS) {
    const queryString = new URLSearchParams({
      t: 'm', // type: map
      daddr: `${addressString}+${name}+${latitude},${longitude}`,
    }).toString()
    return `${APPLE_MAPS_BASE_URL}?${queryString}`
  } else {
    const queryString = new URLSearchParams({
      api: '1',
      destination: addressString || `${latitude},${longitude}`,
    }).toString()
    return `${GOOGLE_MAPS_BASE_URL}?${queryString}`
  }
}

export type leaveAppPromptText = {
  body?: string
  cancel?: string
  confirm?: string
  title?: string
}

/**
 * Hook to handle a link that leaves the app; conditionally displays alert prior to leaving
 */
export function useExternalLink(): (
  url: string,
  text?: leaveAppPromptText,
) => void {
  const { t } = useTranslation()

  return (url: string, text?: leaveAppPromptText) => {
    // TODO: Ticket 170
    // logAnalyticsEvent(Events.vama_link_click({ url, ...eventParams }))

    const onOKPress = () => {
      // TODO: Ticket 170
      // logAnalyticsEvent(Events.vama_link_confirm({ url, ...eventParams }))
      return Linking.openURL(url)
    }

    const body = text?.body ? text.body : t('leaveAppAlert.body')
    const cancel = text?.cancel ? text.cancel : t('cancel')
    const confirm = text?.confirm ? text.confirm : t('ok')
    const title = text?.title ? text.title : t('leaveAppAlert.title')

    if (url.startsWith('http')) {
      Alert.alert(title, body, [
        { text: cancel, style: 'cancel' },
        {
          text: confirm,
          onPress: (): Promise<void> => onOKPress(),
          style: 'default',
        },
      ])
    } else {
      Linking.openURL(url)
    }
  }
}

// TODO: Ticket 169 created to implement support for adding to calendar (or clean up if not feasible)
// Calendar bridge from iOS and Android
// const RNCal = NativeModules.RNCalendar

export type CalendarData = {
  title: string
  startTime: number
  endTime: number
  location: string
  latitude: number
  longitude: number
}

export const OnPressCalendar = async (
  calendarData: CalendarData,
): Promise<void> => {
  calendarData
  // const { title, endTime, startTime, location, latitude, longitude } = calendarData

  // console.log('test')
  // let hasPermission = await checkCalendarPermission()
  // if (!hasPermission) {
  //   hasPermission = await requestCalendarPermission()
  // }

  // if (hasPermission) {
  //   await addToCalendar(title, startTime, endTime, location, latitude, longitude)
  // }
}

// /**
//  * This function adds requests the device add a date to the native calendar and display it to the user.
//  * @param title - The title or name of the event to add to the calendar.
//  * @param beginTime - The number of seconds UTC from 1970 when the event will start.
//  * @param endTime - The number of seconds UTC from 1970 when the event will end.
//  * @param location - The address or name of place where the event will take place.
//  * @param latitude - iOS only: Latitude of place where the event will take place.
//  * @param longitude - iOS only: Longitude of place where the event will take place.
//  * @returns Returns an empty Promise
//  */
// const addToCalendar = async (
//   title: string,
//   beginTime: number,
//   endTime: number,
//   location: string,
//   latitude: number,
//   longitude: number,
// ): Promise<void> => {
//   if (isIOS) {
//     await RNCal.addToCalendar(
//       title,
//       beginTime,
//       endTime,
//       location,
//       latitude,
//       longitude,
//     )
//   } else {
//     await RNCal.addToCalendar(title, beginTime, endTime, location)
//   }
// }

// /**
//  * This function is used to check and see if the app has permission to add to the calendar before sending a request
//  * to add an event to the calendar. This should be called every time before addToCalendar.
//  * @returns Returns a Promise with a boolan value that indicates whether or not the permission is currently granted.
//  */
// const checkCalendarPermission = async (): Promise<boolean> => {
//   if (isIOS) {
//     return await RNCal.hasPermission()
//   } else {
//     return PermissionsAndroid.check(
//       PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
//     )
//   }
// }

// /**
//  * This function is used to request permission from the user to add or edit events in the calendar.
//  * This should only be called if checkCalendarPermissions returns a false value.
//  * @returns Returns a Promise with a boolean value that indicates whether or not the permission was granted.
//  */
// const requestCalendarPermission = async (): Promise<boolean> => {
//   if (isIOS) {
//     return await RNCal.requestPermission()
//   } else {
//     // RN has android built in so we just use this instead of Native Modules
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
//         {
//           title: 'Calendar Permission Needed for this Action',
//           message:
//             'VA:Health and Benefits needs calendar permission to add your appointments to your calendar',
//           buttonNegative: 'Deny',
//           buttonPositive: 'Grant',
//         },
//       )
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         return true
//       } else {
//         // todo: if this is "never_ask_again" we need to prompt to go to settings?
//         return false
//       }
//     } catch (err) {
//       // logNonFatalErrorToFirebase(
//       //   err,
//       //   'requestCalendarPermission: RnCalendar Error',
//       // )
//       console.warn(err)
//       return false
//     }
//   }
// }
