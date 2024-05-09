import {
  Alert,
  AlertButton,
  Linking,
  Platform,
  Pressable,
  Text,
} from 'react-native'
import { fireEvent, render, screen } from '@testing-library/react-native'
import React, { FC } from 'react'

import { ComponentWrapper } from '../wrapper'
import {
  FormDirectionsUrl,
  leaveAppPromptText,
  useExternalLink,
} from './OSfunctions'
import { LinkAnalytics } from '../components/Link/Link'

/** Jest mock to change Platform.OS return
 *    - Defaults 'ios'
 *    - Change with `Platform.OS = 'android'` in a test
 */
jest.doMock('react-native/Libraries/Utilities/Platform.ios.js', () => ({
  OS: 'ios',
  select: jest.fn(),
}))

jest.spyOn(Linking, 'openURL')

// Massaging RN AlertStatic.alert typing to match our use case so TS doesn't complain using AlertSpy
type AlertSpyProps = jest.SpyInstance<
  void,
  [
    title: string,
    message: string,
    buttons: [
      {
        text: string
        style: AlertButton['style']
        onPress: (value?: string) => void
      },
      {
        text: string
        style: AlertButton['style']
        onPress: (value?: string) => void
      },
    ],
  ]
>
const AlertSpy = jest.spyOn(Alert, 'alert') as AlertSpyProps

describe('OSFunctions', () => {
  describe('FormDirectionsUrl tests', () => {
    let url: string
    const location = {
      latitude: 33.7764681,
      longitude: -118.1189664,
      name: 'Tibor Rubin VA Medical Center',
      address: {
        street: '5901 E 7th St',
        city: 'Long Beach',
        state: 'CA',
        zipCode: '90822',
      },
    }

    describe('Apple Maps tests', () => {
      it('forms URL with just name/address', () => {
        url = FormDirectionsUrl({
          name: location.name,
          address: location.address,
        })

        expect(url).toBe(
          'https://maps.apple.com/?t=m&daddr=5901+E+7th+St+Long+Beach+CA+90822%2BTibor+Rubin+VA+Medical+Center%2Bundefined%2Cundefined',
        )
      })

      it('forms URL with just name/latitude/longitude', () => {
        url = FormDirectionsUrl({
          name: location.name,
          latitude: location.latitude,
          longitude: location.longitude,
        })

        expect(url).toBe(
          'https://maps.apple.com/?t=m&daddr=%2BTibor+Rubin+VA+Medical+Center%2B33.7764681%2C-118.1189664',
        )
      })

      it('forms URL with all props', () => {
        url = FormDirectionsUrl(location)

        expect(url).toBe(
          'https://maps.apple.com/?t=m&daddr=5901+E+7th+St+Long+Beach+CA+90822%2BTibor+Rubin+VA+Medical+Center%2B33.7764681%2C-118.1189664',
        )
      })
    })

    describe('Google Maps tests', () => {
      it('forms URL with just name/address', () => {
        Platform.OS = 'android'
        url = FormDirectionsUrl({
          name: location.name,
          address: location.address,
        })

        expect(url).toBe(
          'https://www.google.com/maps/dir/?api=1&destination=5901+E+7th+St+Long+Beach+CA+90822',
        )
      })

      it('forms URL with just name/latitude/longitude', () => {
        url = FormDirectionsUrl({
          name: location.name,
          latitude: location.latitude,
          longitude: location.longitude,
        })

        expect(url).toBe(
          'https://www.google.com/maps/dir/?api=1&destination=33.7764681%2C-118.1189664',
        )
      })

      it('forms URL with all props', () => {
        url = FormDirectionsUrl(location)

        expect(url).toBe(
          'https://www.google.com/maps/dir/?api=1&destination=5901+E+7th+St+Long+Beach+CA+90822',
        )
      })
    })
  })

  type UseExternalLinkButtonProps = {
    url: string
    analytics?: LinkAnalytics
    text?: leaveAppPromptText
  }

  /** Dummy component modeled off Link to access useExternalLink hook logic */
  const UseExternalLinkButton: FC<UseExternalLinkButtonProps> = ({
    url,
    analytics,
    text,
  }) => {
    const launchExternalLink = useExternalLink()
    const onPress = async (): Promise<void> => {
      launchExternalLink(url, analytics, text)
    }
    return (
      <ComponentWrapper>
        <Pressable testID="useExternalLinkButton" onPress={onPress}>
          <Text>useExternalLinkButton</Text>
        </Pressable>
      </ComponentWrapper>
    )
  }

  describe('useExternalLink tests', () => {
    const onPressAnalyticMock = jest.fn()
    const onCancelAnalyticMock = jest.fn()
    const onConfirmAnalyticMock = jest.fn()

    const commonProps: UseExternalLinkButtonProps = {
      url: 'https://www.va.com',
      analytics: {
        onPress: onPressAnalyticMock,
        onCancel: onCancelAnalyticMock,
        onConfirm: onConfirmAnalyticMock,
      },
      text: {
        title: 'Title override',
        body: 'Body override',
        cancel: 'Cancel override',
        confirm: 'Confirm override',
      },
    }

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should call RN Linking with no RN Alert prompt on non-URL variety', () => {
      render(<UseExternalLinkButton url="tel:555-867-5309" />)

      fireEvent.press(screen.getByTestId('useExternalLinkButton'))

      expect(Linking.openURL).toHaveBeenCalledWith('tel:555-867-5309')
      expect(Alert.alert).not.toHaveBeenCalled()
    })

    describe('URL w/o analytics or promptText tests', () => {
      it('should open RN Alert prompt with default alert text', () => {
        render(<UseExternalLinkButton url={commonProps.url} />)

        fireEvent.press(screen.getByTestId('useExternalLinkButton'))

        expect(Alert.alert).toHaveBeenCalledWith(
          'Leave the mobile app?',
          `You'll go to a website outside of this app.`,
          expect.arrayContaining([
            expect.objectContaining({
              style: 'cancel',
              text: 'Go back',
            }),
            expect.objectContaining({
              style: 'default',
              text: 'Leave',
            }),
          ]),
        )
        expect(Linking.openURL).not.toHaveBeenCalled()
      })

      it('should call RN Linking when confirming RN Alert dialog', () => {
        render(<UseExternalLinkButton url={commonProps.url} />)

        fireEvent.press(screen.getByTestId('useExternalLinkButton'))

        expect(Linking.openURL).not.toHaveBeenCalled()

        AlertSpy.mock.calls[0][2][1].onPress()

        expect(Linking.openURL).toHaveBeenCalled()
      })

      it('should not call RN Linking when canceling RN Alert dialog', () => {
        render(<UseExternalLinkButton url={commonProps.url} />)

        fireEvent.press(screen.getByTestId('useExternalLinkButton'))

        expect(Linking.openURL).not.toHaveBeenCalled()

        AlertSpy.mock.calls[0][2][0].onPress()

        expect(Linking.openURL).not.toHaveBeenCalled()
      })
    })

    describe('URL with analytics and promptText tests', () => {
      it('should open RN Alert prompt with custom alert text', () => {
        render(<UseExternalLinkButton {...commonProps} />)

        fireEvent.press(screen.getByTestId('useExternalLinkButton'))

        expect(Alert.alert).toHaveBeenCalledWith(
          'Title override',
          `Body override`,
          expect.arrayContaining([
            expect.objectContaining({
              style: 'cancel',
              text: 'Cancel override',
            }),
            expect.objectContaining({
              style: 'default',
              text: 'Confirm override',
            }),
          ]),
        )
        expect(Linking.openURL).not.toHaveBeenCalled()
      })

      it('should call onPress and onConfirm analytics', () => {
        render(<UseExternalLinkButton {...commonProps} />)

        fireEvent.press(screen.getByTestId('useExternalLinkButton'))

        expect(onPressAnalyticMock).toHaveBeenCalled()
        expect(onConfirmAnalyticMock).not.toHaveBeenCalled()

        AlertSpy.mock.calls[0][2][1].onPress()

        expect(onConfirmAnalyticMock).toHaveBeenCalled()
        expect(Linking.openURL).toHaveBeenCalled()
      })

      it('should call onPress and onCancel analytics', () => {
        render(<UseExternalLinkButton {...commonProps} />)

        fireEvent.press(screen.getByTestId('useExternalLinkButton'))

        expect(onPressAnalyticMock).toHaveBeenCalled()
        expect(onCancelAnalyticMock).not.toHaveBeenCalled()

        AlertSpy.mock.calls[0][2][0].onPress()

        expect(onCancelAnalyticMock).toHaveBeenCalled()
        expect(Linking.openURL).not.toHaveBeenCalled()
      })
    })
  })
})
