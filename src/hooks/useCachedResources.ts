import * as SplashScreen from 'expo-splash-screen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSetRecoilState } from 'recoil'
import { userWalletState } from '../state/WalletState'
import { useEffect, useState } from 'react'

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false)
  const setWallet = useSetRecoilState(userWalletState)

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    void (async () => {
      try {
        void SplashScreen.preventAutoHideAsync()

        const storedWalletAddress = await AsyncStorage.getItem('@walletAddress')
        const storedWalletOrigin = await AsyncStorage.getItem('@walletOrigin')

        if (storedWalletAddress && storedWalletOrigin) {
          setWallet({
            origin: storedWalletOrigin,
            walletAddress: storedWalletAddress,
          })
        }
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.error(e)
      } finally {
        setLoadingComplete(true)
        void SplashScreen.hideAsync()
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isLoadingComplete
}
