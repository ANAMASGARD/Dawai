import { View, Text ,Image, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import Colors from '../../constant/Colors'
import { useRouter } from 'expo-router';

export default function LoginScreen() {


  const router=useRouter();

  return (
    <View>
     <View style={{ display:'flex' , alignItems: 'center' ,marginTop: 40}}>
      <Image source={require('./../../assets/images/login.png')} 
      style={styles?.image} />
    </View>
    <View style={{ padding:25,
      backgroundColor: Colors.PRIMARY,
      height: '100%',
    }}>
      <Text style={{
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
       
      }}> Stay on Tarck , Stay Healthy !</Text>
      
      <Text style={{
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
        padding: 10,
      }}> Track your meds, take control of your health. Stay Consistent ! </Text>

      <TouchableOpacity onPress={() => router.push('/Login/signIn')}>
        <View style={{
          backgroundColor: 'white',
          padding: 15,
          borderRadius: 99,
          marginTop: 20,
          alignItems: 'center',
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: Colors.PRIMARY,
          }}>Get Started</Text>
        </View>
      </TouchableOpacity>
      <Text style={{
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
        padding: 10,
      }}>
        Note: By clicking "Get Started", you agree to our Terms of Service and Privacy Policy.
      </Text>



    </View>
    
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 210,
    height: 450,
    borderRadius: 23,
   
  },
 })