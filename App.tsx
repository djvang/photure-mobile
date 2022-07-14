import * as Sentry from 'sentry-expo'
import { NativeBaseProvider } from 'native-base'
import Navigation from './src/navigation'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import useColorScheme from './src/hooks/useColorScheme'

Sentry.init({
  debug: true,
  dsn: 'https://13581d430cfc4359a7bc8bd583683fd9@o1317655.ingest.sentry.io/6570861',
  enableInExpoDevelopment: false,
  tracesSampleRate: 1.0,
})

export default function App() {
  const colorScheme = useColorScheme()

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <RecoilRoot>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </RecoilRoot>
      </NativeBaseProvider>
    </SafeAreaProvider>
  )
}
