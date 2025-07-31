import { Ionicons } from '@expo/vector-icons'; // Make sure @expo/vector-icons is installed
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/FirebaseConfig'; // Adjust the import path as necessary
import { setLocalStorage } from '../../service/Storage';



export default function SignIn() {
    const router=useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const OnSignInClick= () => {
    if (!email || !password) {
      // Show an alert or toast message to the user
      Alert.alert('Please enter both email and password.');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        const user = userCredential.user;
        console.log('User signed in:', user);
         await setLocalStorage('userDetail',user);
        router.replace('/(tabs)');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error signing in:', errorCode, errorMessage);
        if (errorCode === 'auth/user-not-found') {
          Alert.alert('User not found', 'Please check your email and password.');
        } else if (errorCode === 'auth/wrong-password') {
          Alert.alert('Incorrect password', 'Please try again.');
        } else {
          Alert.alert('Error', errorMessage);
        }
        
      });
  }

  return (
    <View style={{
      padding: 25,
    }}>
      <Text style={styles.textHeader}>Let's Sign You In</Text>
       <Text style={styles.textSubHeader}>Welcome Back </Text>
       <Text style={styles.textSubHeader}>You've Been Missed ! </Text>

         {/* <Text style={{
            fontSize: 18,
            color: Colors.GRAY,
            marginTop: 10,
         }}>Enter your email and password to access your account.</Text> */}
<View style={{marginTop: 25}}>
         <Text >
            Email
         </Text>
         <TextInput placeholder='Enter your Email' style={styles.textInput}
         onChangeText={(value)=> setEmail(value)}/>
    </View>

    <View style={{marginTop: 25}}>
         <Text >
            Password
         </Text>
         <View style={{ position: 'relative' }}>
          <TextInput
            placeholder='Enter your Password'
            secureTextEntry={!passwordVisible}
            autoCapitalize='none'
            autoCorrect={false}
            style={styles.textInput}
            onChangeText={(value)=> setPassword(value)}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={{
              position: 'absolute',
              right: 10,
              top: 18,
              zIndex: 1,
            }}
          >
            <Ionicons
              name={passwordVisible ? 'eye' : 'eye-off'}
              size={24}
              color={Colors.GRAY}
            />
          </TouchableOpacity>
        </View>
    </View>

    <TouchableOpacity style={styles.button}
      onPress={OnSignInClick}>
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
      }}>Login</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.buttonCreate}
      onPress={() => router.push('/Login/signUp')}>
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
      }}>Create Account</Text>
    </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
textHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 15,

  
  },
  textSubHeader: {
    fontSize: 29,
    fontWeight: 'bold',
    marginTop: 10,
    color:Colors.GRAY,
  },
  textInput: {
    borderWidth: 2,
    borderColor: Colors.GRAY,
    fontSize: 17,
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: 'white',
  },
  button:{
     backgroundColor: Colors.PRIMARY,
      padding: 15,
      borderRadius: 99,
      marginTop: 35,
      alignItems: 'center',
  },
  buttonCreate:{
     backgroundColor: 'white',
      padding: 15,
      borderRadius: 99,
      borderColor: Colors.PRIMARY,
      borderWidth: 2,
      marginTop: 35,
      alignItems: 'center',
  }

})