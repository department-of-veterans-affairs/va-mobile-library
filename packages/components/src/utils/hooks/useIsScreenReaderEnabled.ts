import { AccessibilityInfo } from 'react-native'
import { useEffect, useState } from 'react'

/**
 * Hook to monitor screen reader status
 * @returns True when the screen reader is on, else false
 */
export function useIsScreenReaderEnabled(): boolean {
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false)

  useEffect(() => {
    // Function to update state based on the screen reader status
    const updateScreenReaderStatus = (isEnabled: boolean) => {
      setScreenReaderEnabled(isEnabled)
    }

    // Initiate with current screen reader status
    AccessibilityInfo.isScreenReaderEnabled().then(updateScreenReaderStatus)

    // Subscribe to screen reader status changes
    const subscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      updateScreenReaderStatus,
    )

    // Cleanup subscription on component unmount
    return () => subscription.remove()
  }, [screenReaderEnabled])

  return screenReaderEnabled
}
