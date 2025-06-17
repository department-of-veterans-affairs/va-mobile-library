/** Prevents TypeScript from complaining about importing .svg files directly and
 * tells TypeScript which props .svg's can accept
 * See: https://github.com/kristerkari/react-native-svg-transformer?tab=readme-ov-file#using-typescript
 */
declare module '*.svg' {
  import { SvgProps } from 'react-native-svg'
  import { FC } from 'react'
  const content: FC<SvgProps>
  export default content
}
