import React from 'react'
import { useSetRecoilState } from 'recoil'
import { useWalletConnect } from '@walletconnect/react-native-dapp'
import { userWalletState } from '../state/WalletState'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text, View } from '../components/Themed'

// const shortenAddress = (address: string) => {
//   return `${address.slice(0, 6)}...${address.slice(address.length - 4, address.length)}`
// }

export default function ConnectWallet() {
  const connector = useWalletConnect()
  const setWallet = useSetRecoilState(userWalletState)

  const connectWallet = React.useCallback(async () => {
    const wc = await connector.connect({
      chainId: 137,
    })

    setWallet({
      origin: 'walletconnect',
      walletAddress: wc.accounts[0],
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connector])

  const killSession = React.useCallback(() => {
    return connector.killSession()
  }, [connector])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity onPress={connectWallet} style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>Connect a Wallet</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={killSession} style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>Use Email</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#3399FF',
    borderColor: '#3399FF',
    borderRadius: 30,
    borderWidth: 0,
    color: '#FFFFFF',
    height: 40,
    marginBottom: 20,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    marginVertical: 30,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
