'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const { withDangerousMod, withPlugins } = require('@expo/config-plugins')
const { mergeContents } = require('@expo/config-plugins/build/utils/generateCode')
const fs = require('fs')
const path = require('path')

async function readFileAsync(path) {
  return fs.promises.readFile(path, 'utf8')
}

async function saveFileAsync(path, content) {
  return fs.promises.writeFile(path, content, 'utf8')
}

const withFirebaseStaticLibBug = (c) => {
  return withDangerousMod(c, [
    'ios',
    async (config) => {
      const file = path.join(config.modRequest.platformProjectRoot, 'Podfile')
      const contents = await readFileAsync(file)
      try {
        await saveFileAsync(file, addFramework(addHeaders(contents)))
      } catch (error) {
        throw error
      }
      return config
    },
  ])
}

function addFramework(src) {
  return mergeContents({
    tag: 'rn-firebase-fix-add-framework',
    src,
    newSrc: '$RNFirebaseAsStaticFramework = true',
    anchor: /platform :ios/,
    offset: 1,
    comment: '#',
  }).contents
}

function addHeaders(src) {
  return mergeContents({
    tag: 'rn-firebase-fix-add-headers',
    src,
    newSrc: `  pod 'Firebase', :modular_headers => true
  pod 'FirebaseCore', :modular_headers => true
  pod 'GoogleUtilities', :modular_headers => true`,
    anchor: /use_react_native!/,
    offset: 0,
    comment: '#',
  }).contents
}

module.exports = (config) => withPlugins(config, [withFirebaseStaticLibBug])
