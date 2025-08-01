import { View, Text ,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import ConstantString from '../constant/ConstantString'
import Colors from '../constant/Colors'
import { useRouter } from 'expo-router'


export default function EmptyState() {
    const router = useRouter();
  return (
    <View style={{
      flex: 1,
      marginTop: 80,
      display: 'flex',
      alignItems: 'center',
    }}>
     <Image source={require('../assets/images/medicine.png')}
      style={{
        width: 200,
        height: 200,
        
      }} />
      <Text style={{
        fontSize: 35,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 30,
        
      }}>{ConstantString.NoMedication}</Text>
      <Text style={{
        fontSize: 18,
        color: Colors.DARK_GRAY,
        textAlign: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
      }}>
       {ConstantString.NoMedicationSubText}
      </Text>
      <TouchableOpacity style={{
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        borderRadius: 99,
        width: '100%',
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
      }}
      onPress={() => {
        router.push('/add-new-medication')

      }}
      >
        <Text style={{
            textAlign: 'center',
            fontSize: 18,
            color: 'white',
            fontWeight: 'bold',
            paddingHorizontal: 10,
            paddingVertical: 5,
            width: '100%',
        }}>
            {ConstantString.AddNewMedicationBin}
        </Text>
      </TouchableOpacity>
    </View>
  )
}