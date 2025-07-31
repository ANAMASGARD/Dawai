import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';

export default function SignUp() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={{ padding: 25 }}>
      <Text style={styles.textHeader}>Create Account</Text>
      <Text style={styles.textSubHeader}>Welcome!</Text>
      <Text style={styles.textSubHeader}>Let's get you started.</Text>

      <View style={{ marginTop: 25 }}>
        <Text>Full Name</Text>
        <TextInput placeholder='Enter your Full Name' style={styles.textInput} autoCapitalize='words' />
      </View>

      <View style={{ marginTop: 25 }}>
        <Text>Email</Text>
        <TextInput placeholder='Enter your Email' style={styles.textInput} autoCapitalize='none' />
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

      <TouchableOpacity style={styles.button}>
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