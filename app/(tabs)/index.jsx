import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/FirebaseConfig'
import Headers from '../../components/Header'
import { RemoveLocalStorage } from '../../service/Storage'
import EmptyState from '../../components/EmptyState'
import MedicationList from '../../components/MedicationList'


export default function HomeScreen() {
  return (
    <View style={{
      padding: 25,
      backgroundColor: 'white',
      height: '100%',
     
    }}>
      <Headers />
      

      <MedicationList />
      
    </View>
  )
}