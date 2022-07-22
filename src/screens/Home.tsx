import { OpenerView } from 'unflow-react-native'
import React from 'react'
import { RootTabScreenProps } from '../navigation/types'
import { StyleSheet } from 'react-native'
import { Text, View } from '../components/Themed'

export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
  console.log(navigation.canGoBack())

  return (
    <View style={styles.container}>
      <OpenerView />
      <Text style={styles.title}>Home</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
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
