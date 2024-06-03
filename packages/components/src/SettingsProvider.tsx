// @ts-nocheck
import React, { createContext, useState } from 'react'

const SettingsContext = createContext({
  allowDarkMode: true,
  Icon: {
    maxWidth: undefined,
  },
})

function SettingsProvider({ children, initialSettings }) {
  const [settings, updateSettings] = useState(initialSettings)

  const updateSetting = (property, value) =>
    updateSettings({
      ...settings,
      [property]: value,
    })

  const updateComponentSetting = (componentName: string, property, value) => {
    updateSettings({
      ...settings,
      [componentName]: {
        ...settings[componentName],
        [property]: value,
      },
    })
  }

  return (
    <SettingsContext.Provider
      value={{ settings, updateSetting, updateComponentSetting }}>
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsContext, SettingsProvider }
