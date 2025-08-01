import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function MedicationActionModal() {
    const medicine =useLocalSearchParams();
    console.log(medicine);
    // Here you can implement the logic to handle the medication action
    // For example, you can show a form to edit the medication details or delete it
  return (
    <View>
      <Text>MedicationActionModal</Text>
    </View>
  )
}