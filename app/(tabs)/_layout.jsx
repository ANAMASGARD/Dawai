import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
   <Tabs>
    <Tabs.Screen
      name="index"
      options={{
        title: 'Home',
        tabBarIcon: ({ color }) => (
          <Text style={{ color }}>🏠</Text>
        ),
      }}
    />
    <Tabs.Screen
      name="AddNew"
      options={{
        title: 'Add New',
        tabBarIcon: ({ color }) => (
          <Text style={{ color }}>➕</Text>
        ),
      }}
    />
    <Tabs.Screen
      name="Profile"
      options={{
        title: 'Profile',
        tabBarIcon: ({ color }) => (
          <Text style={{ color }}>👤</Text>
        ),
      }}
    />
   </Tabs>
  )
}