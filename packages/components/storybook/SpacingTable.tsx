import React from 'react'

import { spacing } from '@department-of-veterans-affairs/mobile-tokens'
import { useTheme } from '../src/utils'

// Table Component to display the data
export const SpacingTable: React.FC = () => {
  const theme = useTheme()

  return (
    <table style={{ width: '60%' }}>
      <thead>
        <tr>
          <th>Token</th>
          <th>Value</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(spacing).map(([token, value], index) => {
          const exampleStyle = {
            width: '100%',
            backgroundColor: theme.vadsColorActionForegroundDefault,
            height: value,
          }

          return (
            <tr key={index}>
              <td>{token}</td>
              <td>{value}</td>
              <td>
                <div style={exampleStyle} />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
