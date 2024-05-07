import { Platform } from 'react-native'

import { FormDirectionsUrl } from './OSfunctions'

/** Jest mock to change Platform.OS return
 *    - Defaults 'ios'
 *    - Change with `Platform.OS = 'android'` in a test
 */
jest.doMock('react-native/Libraries/Utilities/Platform.ios.js', () => ({
  OS: 'ios',
  select: jest.fn(),
}))

describe('OSFunctions', () => {
  describe('FormDirectionsUrl tests', () => {
    let url: string
    const location = {
      lat: 33.7764681,
      long: -118.1189664,
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
          latitude: location.lat,
          longitude: location.long,
        })

        expect(url).toBe(
          'https://maps.apple.com/?t=m&daddr=%2BTibor+Rubin+VA+Medical+Center%2B33.7764681%2C-118.1189664',
        )
      })

      it('forms URL with all props', () => {
        url = FormDirectionsUrl({
          name: location.name,
          address: location.address,
          latitude: location.lat,
          longitude: location.long,
        })

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
          latitude: location.lat,
          longitude: location.long,
        })

        expect(url).toBe(
          'https://www.google.com/maps/dir/?api=1&destination=33.7764681%2C-118.1189664',
        )
      })

      it('forms URL with all props', () => {
        url = FormDirectionsUrl({
          name: location.name,
          address: location.address,
          latitude: location.lat,
          longitude: location.long,
        })

        expect(url).toBe(
          'https://www.google.com/maps/dir/?api=1&destination=5901+E+7th+St+Long+Beach+CA+90822',
        )
      })
    })
  })

  // describe('useExternalLink tests', () => {
    
  // })
})
