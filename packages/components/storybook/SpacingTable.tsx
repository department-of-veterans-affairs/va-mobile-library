import { spacing } from '@department-of-veterans-affairs/mobile-tokens'
import React, { CSSProperties } from 'react'

import { useTheme } from '../src/utils'

export const SpacingTable: React.FC = () => {
  const theme = useTheme()

  const thStyle: CSSProperties = { textAlign: 'left' }

  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ ...thStyle, width: 125 }}>Token</th>
          <th style={{ ...thStyle, width: 75 }}>Value</th>
          <th style={thStyle}>Example</th>
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
