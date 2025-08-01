import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { getLocalStorage } from '../service/Storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../constant/Colors';

export default function Header() {
  const [user, setUser] = useState();

  useEffect(() => {
    GetUserDetail();
  }, []);

  const GetUserDetail = async () => {
    let userInfo = await getLocalStorage('userDetail');
    console.log('Raw userInfo:', userInfo); // Add this line

    try {
      userInfo = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo;
    } catch (e) {
      console.log('Parse error:', e); // Add this line
    }

    console.log('Parsed userInfo:', userInfo); // Add this line
    console.log('Display name:', userInfo?.displayName); // Add this line

    setUser(userInfo);
  };

  return (
    <View style={{
      marginTop: 20,
      
    }}>

      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
        
        >
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        
      }}>
        <Image source={require('../assets/images/smiley.png')}
          style={{
            width: 45,
            height: 45,
          }} />
        <Text style={{
          fontSize: 25,
          fontWeight: 'bold',
        }}>
          Hello {user?.displayName || 'User'} 👋
        </Text>
      </View>
      <Ionicons name="settings" size={34} color={Colors.DARK_GRAY}/>
      </View>
    </View>
  );
}