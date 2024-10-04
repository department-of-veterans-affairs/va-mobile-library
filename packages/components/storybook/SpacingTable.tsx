import { spacing } from '@department-of-veterans-affairs/mobile-tokens'
import React from 'react'

import { useTheme } from '../src/utils'

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
            borderRadius: 3,
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
