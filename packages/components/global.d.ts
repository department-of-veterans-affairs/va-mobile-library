/** Prevents TypeScript from complaining about importing .svg files directly and
 * tells TypeScript which props .svg's can accept
 * See: https://github.com/kristerkari/react-native-svg-transformer?tab=readme-ov-file#using-typescript
 */
declare module '*.svg' {
  import { SvgProps } from 'react-native-svg'
  import React from 'react'
  const content: React.FC<SvgProps>
  export default content
}

type SnackbarType = import('./src/components/Snackbar/Snackbar').SnackbarType
// eslint-disable-next-line no-var
declare var snackbar: SnackbarType

// export declare const snackbar: SnackbarType

// eslint-disable-next-line
// var global: any

// declare module globalThis {
//   // eslint-disable-next-line no-var
//   var snackbar: SnackbarType
// }