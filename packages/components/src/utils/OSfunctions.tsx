/** A file for functions that leverage OS functionality */

import { Alert, Linking, NativeModules, PermissionsAndroid, Platform } from 'react-native'
// import { logNonFatalErrorToFirebase } from './analytics'

const isIOS = Platform.OS === 'ios'

/**
 * Hook to display a warning that the user is leaving the app when tapping an external link
 *
 * @returns an alert showing user they are leaving the app
 */
export function useExternalLink(): (url: string) => void {
  // const { t } = useTranslation(NAMESPACE.COMMON)

  return (url: string) => {
    // logAnalyticsEvent(Events.vama_link_click({ url, ...eventParams }))

    const onOKPress = () => {
      // logAnalyticsEvent(Events.vama_link_confirm({ url, ...eventParams }))
      return Linking.openURL(url)
    }

    if (url.startsWith('http')) {
      // Alert.alert(t('leavingApp.title'), t('leavingApp.body'), [
      Alert.alert("You’re leaving the app", "You're navigating to a website outside of the app.", [
        {
          text: 'Cancel',
          // style: 'cancel',
        },
        { text: 'Ok', onPress: (): Promise<void> => onOKPress(), style: 'default' },
      ])
    } else {
      Linking.openURL(url)
    }
  }
}

// Calendar bridge from iOS and Android
const RNCal = NativeModules.RNCalendar

export type CalendarData = {
  title: string
  startTime: number
  endTime: number
  location: string
  latitude: number
  longitude: number
}

export const onPressCalendar = async (calendarData: CalendarData): Promise<void> => {
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
