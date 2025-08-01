import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { auth } from '../../config/FirebaseConfig';
import Colors from '../../constant/Colors';
import { setLocalStorage } from '../../service/Storage';

export default function SignUp() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userName, setUserName] = useState();

  // Helper for showing toast on Android and alert elsewhere
  const showMessage = (msg) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert('Notification', msg);
    }
  };

  const onCreateAccount = () => {
    if (!email || !password || !userName) {
      showMessage('Please enter all fields.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        const user = userCredential.user;
        
        // Update the profile with displayName
        await updateProfile(user, {
          displayName: userName,
        });
        
        // Create a user object with displayName included
        const userToStore = {
          uid: user.uid,
          email: user.email,
          displayName: userName, // Explicitly set the displayName
          emailVerified: user.emailVerified,
          // Add other properties you might need
        };
        
        console.log('Storing user:', userToStore);
        
        // Store the custom user object
        await setLocalStorage('userDetail', userToStore);
        router.replace('/(tabs)');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error creating user:', errorCode, errorMessage);
        if (errorCode === 'auth/email-already-in-use') {
          showMessage('Email already in use. Please use a different email.');
        } else {
          showMessage(errorMessage);
        }
      });
  };

  return (
    <View style={{ padding: 25 }}>
      <Text style={styles.textHeader}>Create Account</Text>
      <Text style={styles.textSubHeader}>Welcome!</Text>
      <Text style={styles.textSubHeader}>Let's get you started.</Text>

      <View style={{ marginTop: 25 }}>
        <Text>Full Name</Text>
        <TextInput placeholder='Enter your Full Name' style={styles.textInput} autoCapitalize='words' 
        onChangeText={(value)=>setUserName(value)}/>
      </View>

      <View style={{ marginTop: 25 }}>
        <Text>Email</Text>
        <TextInput
          placeholder='Enter your Email'
          style={styles.textInput}
          autoCapitalize='none'
          onChangeText={(value)=> setEmail(value)} // Trim whitespace
        />
      </View>

      <View style={{ marginTop: 25 }}>
        <Text>Password</Text>
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

      <TouchableOpacity style={styles.button} onPress={onCreateAccount}>
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: 'white',
        }}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonCreate}
        onPress={() => router.push('/Login/signIn')}
      >
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: Colors.PRIMARY,
        }}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
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
    color: Colors.GRAY,
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
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 99,
    marginTop: 40,
    alignItems: 'center',
  },
  buttonCreate: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 99,
    borderColor: Colors.PRIMARY,
    borderWidth: 2,
    marginTop: 35,
    alignItems: 'center',
  },
});