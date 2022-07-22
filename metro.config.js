/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
const crypto = require.resolve('crypto-browserify')
const url = require.resolve('url/')
const { getDefaultConfig } = require('metro-config')

module.exports = (async () => {
  const {
    resolver: { sourceExts },
  } = await getDefaultConfig()

  return {
    resolver: {
      extraNodeModules: {
        crypto,
        fs: require.resolve('expo-file-system'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        net: require.resolve('react-native-tcp'),
        os: require.resolve('os-browserify/browser.js'),
        path: require.resolve('path-browserify'),
        stream: require.resolve('readable-stream'),
        url,
        vm: require.resolve('vm-browserify'),
      },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      sourceExts: [...sourceExts, 'cjs', 'mjs'],
    },
    transformer: {
      // eslint-disable-next-line @typescript-eslint/require-await
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
  }
})()
