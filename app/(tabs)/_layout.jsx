import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


export default function TabLayout() {
  return (
   <Tabs screenOptions={{
    headerShown: false
    }}>
    

     <Tabs.Screen
      name="index"
      options={{
        title: 'Home',
        tabBarIcon: ({ color,size }) => (
         <Ionicons name="home" size={size} color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="AddNew"
      options={{
        title: 'Add New',
        tabBarIcon: ({ color,size }) => (
         <Feather name="plus-circle" size={size} color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="Camera"
      options={{
        title: 'AI',
        tabBarIcon: ({ color,size }) => (
          <FontAwesome5 name="camera" size={size} color={color} />
         
        ),
      }}
    />

    <Tabs.Screen
      name="Profile"
      options={{
        title: 'Profile',
        tabBarIcon: ({ color,size }) => (
          <FontAwesome5 name="user-astronaut" size={size} color={color} />
        ),
      }}
    /> 
   </Tabs>
  )
}