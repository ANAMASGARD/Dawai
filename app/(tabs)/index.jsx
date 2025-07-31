import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/FirebaseConfig'


export default function HomeScreen() {
  return (
    <View>
      <Text>HomeScreen</Text>
     <Button title="Logout" onPress={() => signOut(auth)} />
    </View>
  )
}