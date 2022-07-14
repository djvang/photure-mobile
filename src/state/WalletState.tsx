import AsyncStorage from '@react-native-async-storage/async-storage'
import { atom, selector } from 'recoil'

export const userWalletState = atom({
  default: {
    origin: '',
    walletAddress: '',
  },
  effects: [
    ({ onSet }) => {
      onSet(async (newWalletState) => {
        const storedWalletAddress = await AsyncStorage.getItem('@walletAddress')
        const storedWalletOrigin = await AsyncStorage.getItem('@walletOrigin')

        if (storedWalletAddress === null) {
          try {
            await AsyncStorage.setItem('@walletAddress', newWalletState.walletAddress)
          } catch (e) {
            console.error(e)
          }
        }

        if (storedWalletOrigin === null) {
          try {
            await AsyncStorage.setItem('@walletOrigin', newWalletState.origin)
          } catch (e) {
            console.error(e)
          }
        }
      })
    },
  ],
  key: 'UserWallet',
})

export const isConnectedState = selector({
  get: ({ get }) => {
    const wallet = get(userWalletState)

    return wallet.walletAddress !== ''
  },
  key: 'isConnectedState',
})
