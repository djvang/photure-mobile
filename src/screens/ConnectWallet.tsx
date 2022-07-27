import { Orbis } from '@orbisclub/orbis-sdk-react-native'
import React from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { useSetRecoilState } from 'recoil'
import { useWalletConnect } from '@walletconnect/react-native-dapp'
import { userWalletState } from '../state/WalletState'
import {
  ICreateSessionOptions,
  IJsonRpcRequest,
  IJsonRpcResponseError,
  IJsonRpcResponseSuccess,
  IRequestOptions,
  ISessionError,
  ISessionStatus,
  ITxData,
  IUpdateChainParams,
} from '@walletconnect/types'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text, View } from '../components/Themed'

// const shortenAddress = (address: string) => {
//   return `${address.slice(0, 6)}...${address.slice(address.length - 4, address.length)}`
// }

const orbis = new Orbis()

export default function ConnectWallet() {
  const connector = useWalletConnect()

  const connectWallet = React.useCallback(async () => {
    const provider = new WalletConnectProvider({
      chainId: 1,
      connector: {
        accounts: connector.accounts,
        approveRequest: (response: Partial<IJsonRpcResponseSuccess>): void => {
          connector.approveRequest(response)
        },
        approveSession: (sessionStatus: ISessionStatus): void => {
          connector.approveSession(sessionStatus)
        },
        bridge: connector.bridge,
        chainId: connector.chainId,
        clientId: connector.clientId,
        clientMeta: connector.clientMeta,
        connect: (opts?: ICreateSessionOptions): Promise<ISessionStatus> => {
          return connector.connect(opts)
        },
        connected: connector.connected,
        createSession: (opts?: ICreateSessionOptions): Promise<void> => {
          return connector.createSession(opts)
        },
        handshakeId: connector.handshakeId,
        handshakeTopic: connector.handshakeTopic,
        key: connector.key,
        killSession: (sessionError?: ISessionError): Promise<void> => {
          return connector.killSession(sessionError)
        },
        networkId: connector.networkId,
        on: (event: string, callback: (error: Error | null, payload: any | null) => void) => {
          // console.log('event', event)
          // console.log('callback', callback)
          if (event === 'connect') {
            connector.connect({
              chainId: 1,
            })
          } else {
            connector.on(event, callback)
          }
        },
        peerId: connector.peerId,
        peerMeta: connector.peerMeta,
        pending: connector.pending,
        rejectRequest: (response: Partial<IJsonRpcResponseError>): void => {
          connector.rejectRequest(response)
        },
        rejectSession: (sessionError?: ISessionError): void => {
          connector.rejectSession(sessionError)
        },
        rpcUrl: connector.rpcUrl,
        sendCustomRequest: (
          request: Partial<IJsonRpcRequest>,
          options?: IRequestOptions,
        ): Promise<any> => {
          return connector.sendCustomRequest(request, options)
        },
        sendTransaction: (tx: ITxData): Promise<any> => {
          return connector.sendTransaction(tx)
        },
        session: connector.session,
        signMessage: (params: any[]): Promise<any> => {
          return connector.signMessage(params)
        },
        signPersonalMessage: (params: any[]): Promise<any> => {
          return connector.signPersonalMessage(params)
        },
        signTransaction: (tx: ITxData): Promise<any> => {
          return connector.signTransaction(tx)
        },
        signTypedData: (params: any[]): Promise<any> => {
          return connector.signTypedData(params)
        },
        unsafeSend: (
          request: IJsonRpcRequest,
          options?: IRequestOptions,
        ): Promise<IJsonRpcResponseSuccess | IJsonRpcResponseError> => {
          return connector.unsafeSend(request, options)
        },
        updateChain: (chainParams: IUpdateChainParams): Promise<any> => {
          return connector.updateChain(chainParams)
        },
        updateSession: (sessionStatus: ISessionStatus): void => {
          connector.updateSession(sessionStatus)
        },
        uri: connector.uri,
      },
      // connector: connector,
      qrcode: false,
      rpc: {
        1: 'https://main-rpc.linkpool.io',
      },
    })

    orbis
      .connect(provider)
      .then((res) => {
        console.log(res)
        if (res.status == 200) {
          console.log('Connected')
          console.log(res.did)
        } else {
          console.log('Error connecting to Ceramic: ', res)
          // alert('Error connecting to Ceramic.')
        }
      })
      .catch((err) => {
        console.log(err)
        // alert('Error connecting to Ceramic.')
      })

    // const wc = await connector.connect({
    //   chainId: 137,
    // })

    // setWallet({
    //   origin: 'walletconnect',
    //   walletAddress: wc.accounts[0],
    // })

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
      <TouchableOpacity
        onPress={async () => console.log(await orbis.isConnected())}
        style={styles.buttonStyle}
      >
        <Text style={styles.buttonTextStyle}>Is Connected</Text>
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
