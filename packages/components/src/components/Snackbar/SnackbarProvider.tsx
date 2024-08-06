// import React, { createContext, useState } from 'react'

// import { ToastProvider } from 'react-native-toast-notifications'
// const DEFAULT_OFFSET = 50

// export const SnackbarContext = createContext()

// export const SnackbarProvider: React.FC = ({ children }) => {
//   // const forceUpdate = useReducer(x => x + 1, 0)[1]
//   const [offset, setOffset] = useState(DEFAULT_OFFSET)

//   const updateOffset = (num) => {
//     console.log(`setting offset to ${num}`)
//     setOffset(num)
//   }
//   // useEffect(
//   //   () => {
//   //     if (offset != globalThis.snackbarOffset) {
//   //       globalThis.updateSnackbarOffset(globalThis.snackbarOffset)
//   //       forceUpdate()
//   //       return
//   //     }
//   //   }, [offset]
//   // )

//   // useEffect(() =>
//   //   AccessibilityInfo.announceForAccessibility('Test announce provider'),
//   // )

//   return (
//     <SnackbarContext.Provider value={{ offset, updateOffset }}>
//       <ToastProvider
//         animationDuration={100}
//         duration={1000000000000} // Essentially indefinite until dismissed
//         offset={offset}
//         placement="bottom"
//         onClose={() => {
//           console.log('onClose')
//           updateOffset(DEFAULT_OFFSET)
//         }}
//         onPress={() => {
//           console.log('onClose')
//           updateOffset(DEFAULT_OFFSET)
//         }}
//         // ref={(ref) => ((globalThis.snackbar as ToastContainer | null) = ref)}
//         renderToast={(toast) => <Snackbar {...toast} />}
//         swipeEnabled={false}>
//         {children}
//       </ToastProvider>
//     </SnackbarContext.Provider>
//   )
// }
