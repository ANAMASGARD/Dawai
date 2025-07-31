import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Tabs, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';

import { auth } from '../../config/FirebaseConfig'; // Adjust the import path as necessary

export default function TabLayout() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(null);
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log('User ID:', uid);
      setAuthenticated(true); // Set auth state to true if user is signed in
    } else {
      console.log('No user is signed in.');
    
      setAuthenticated(false); // Set auth state to false if no user is signed in
    }
  });

  useEffect(() => {
    if (authenticated === false) {
      router.replace('/Login'); // Redirect to Login if not authenticated
    }
  }, [authenticated, router]);

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