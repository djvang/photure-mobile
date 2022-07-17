import { ExpoConfig } from '@expo/config-types'
import xml2js from 'xml2js'
import { AndroidManifest, ConfigPlugin, withAndroidManifest } from '@expo/config-plugins'

const queriesXml = `
<queries>
  <intent>
    <action android:name="android.intent.action.VIEW" />
    <data android:scheme="wc"/>
  </intent>
  <intent>
    <action android:name="android.intent.action.VIEW" />
    <data android:scheme="https"/>
  </intent>
  <intent>
    <action android:name="android.intent.action.VIEW" />
    <data android:scheme="wss"/>
  </intent>
</queries>`

type KeyValuePair = {
  $: {
    [key: string]: string | undefined
  }
}

type Intent = {
  action?: KeyValuePair[]
  data?: KeyValuePair[]
}

type Queries = {
  intent?: Intent[]
}

type ParseResult = {
  queries: Queries
}

type AndroidManifestWithQuery = AndroidManifest & {
  manifest: {
    $: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ['queries']?: any
    }
  }
}

/**
 * Does not currently work as expected, need to run `expo prebuild`
 * to configure plugins, but this breaks the `Expo Go` app functionality
 *
 * @param androidManifest A AndroidManifest file that has been updated
 *                        to accept queries as a parameter
 * @returns an updated AndroidManifest file
 *
 * @see https://chafikgharbi.com/expo-android-manifest/
 * @see https://docs.expo.dev/workflow/customizing/
 * @see https://docs.expo.dev/workflow/configuration/
 * @see https://docs.expo.dev/guides/config-plugins/#modifying-the-androidmanifestxml
 */
const addQueryToManifest = (androidManifest: AndroidManifestWithQuery) => {
  const { manifest } = androidManifest
  let packageQuery: Queries

  xml2js.parseString(queriesXml, (err, result: ParseResult) => {
    packageQuery = result.queries

    if (!Array.isArray(manifest.$['queries'])) {
      manifest.$['queries'] = []
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    manifest.$['queries'].push(packageQuery)
  })

  return androidManifest
}

const withPackageVisibility: ConfigPlugin = (config) => {
  return withAndroidManifest(config, (config) => {
    config.modResults = addQueryToManifest(config.modResults)
    return config
  })
}

const config: ExpoConfig = {
  android: {
    adaptiveIcon: {
      backgroundColor: '#ffffff',
      foregroundImage: './src/assets/images/adaptive-icon.png',
    },
    googleServicesFile: './google-services.json',
    package: 'com.app.photure',
  },
  assetBundlePatterns: ['**/*'],
  hooks: {
    postPublish: [
      {
        config: {
          authToken: 'b954df431d144801961bea75c82df6b6d63e1fed49c44e87be0045e015434fbf',
          organization: 'photure-inc',
          project: 'react-native',
        },
        file: 'sentry-expo/upload-sourcemaps',
      },
    ],
  },
  icon: './src/assets/images/icon.png',
  ios: {
    bundleIdentifier: 'com.app.photure',
    googleServicesFile: './GoogleService-Info.plist',
    supportsTablet: true,
  },
  name: 'Photure',
  orientation: 'portrait',
  plugins: [
    'sentry-expo',
    '@react-native-firebase/app',
    './src/plugins/rn-firebase-fix',
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static',
        },
      },
    ],
  ],
  scheme: 'myapp',
  slug: 'photure',
  splash: {
    backgroundColor: '#ffffff',
    image: './src/assets/images/splash.png',
    resizeMode: 'contain',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  userInterfaceStyle: 'automatic',
  version: '4.0.0',
  web: {
    config: {
      firebase: {
        apiKey: 'AIzaSyCJ7ywPn-a0wLwchxYACdIbgviNK9XszFk',
        appId: '1:775824147773:web:9bf9f298f770e1aafdb154',
        authDomain: 'photure-app.firebaseapp.com',
        measurementId: 'G-5XP1TWBZE7',
        messagingSenderId: '775824147773',
        projectId: 'photure-app',
        storageBucket: 'photure-app.appspot.com',
      },
    },
    favicon: './src/assets/images/favicon.png',
  },
}

export default withPackageVisibility(config)
