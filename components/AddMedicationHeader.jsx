import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Image, TouchableOpacity, View } from 'react-native';

export default function AddMedicationHeader() {
  const router = useRouter();

  return (
    <View>
      <Image source={require('../assets/images/consult.png')}
        style={{ width: '100%', height: 280, alignSelf: 'center' }} />

      <TouchableOpacity style={{
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
        padding: 10,
        borderRadius: 50,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      }}
      onPress={() => router.push('/(tabs)')} // Navigate to home/tabs
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      
    </View>
  )
}