import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

import { getLocalStorage } from '../../service/Storage';

export default function TabLayout() {
  const router = useRouter();
  const { colors } = useTheme();
  
  useEffect(() =>{
    const GetUserDetail=async()=>{
      const userInfo = await getLocalStorage('userDetail');
      if(!userInfo){
        router.replace('/Login');
      }
    }
    GetUserDetail();
  },[router])

  return (
   <Tabs screenOptions={{
    headerShown: false,
    tabBarStyle: {
      backgroundColor: colors.card,
      borderTopColor: colors.border,
    },
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.textSecondary,
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
      name="History"
      options={{
        title: 'History',
        tabBarIcon: ({ color,size }) => (
         <FontAwesome5 name="history" size={size} color={color} />
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