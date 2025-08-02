import { useRouter } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../constant/Colors'
import ConstantString from '../constant/ConstantString'


export default function EmptyState() {
    const router = useRouter();
  return (
    <View style={{
      flex: 1,
      marginTop: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
     <Image source={require('../assets/images/medicine.png')}
      style={{
        width: 120,
        height: 120,
        
      }} />
      <Text style={{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 20,
        
      }}>{ConstantString.NoMedication}</Text>
      <Text style={{
        fontSize: 16,
        color: Colors.DARK_GRAY,
        textAlign: 'center',
        marginTop: 15,
        paddingHorizontal: 20,
      }}>
       {ConstantString.NoMedicationSubText}
      </Text>
      <TouchableOpacity style={{
        backgroundColor: Colors.PRIMARY,
        padding: 12,
        borderRadius: 99,
        width: '90%',
        marginTop: 25,
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