import { I18nextProvider } from 'react-i18next'
import { PropsWithChildren } from 'react'

import i18n from './utils/translation/i18n'

/**
 * App is null in the wrapper environment--for running as a package within another App
 */
const App = null

export default App

/**
 * Simple wrapping function for non-visual global component package utilities
 * @param props - Empty props w/ Component(s) as nested children being wrapped
 * @returns Wrapped component
 */
export const ComponentWrapper = ( props?: PropsWithChildren ) => {
  return (
    <I18nextProvider i18n={i18n}>
      {props ? props.children : null}
    </I18nextProvider>
  )
}
