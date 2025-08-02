import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MedicationCardItem from '../../components/MedicationCardItem';
import Colors from '../../constant/Colors';
import moment from 'moment/moment';
import { db } from '../../config/FirebaseConfig';
import { doc, updateDoc , arrayUnion} from 'firebase/firestore';

export default function MedicationActionModal() {
    const medicine =useLocalSearchParams();
     const router = useRouter();
    // Here you can implement the logic to handle the medication action
    // For example, you can show a form to edit the medication details or delete it
  
  
    const UpdateActionStatus = async (status) => {
      try{
         const docRef = doc(db, 'medication', medicine?.id);
         await updateDoc(docRef, {
           action:arrayUnion({
            status: status,
            time:moment().format('LT'),
            date:medicine?.selectedDate,
           })
         });

         Alert.alert(status, 'Response Saved',[
            {
              text: 'OK',
              onPress: () => router.replace('(tabs)'),
            }
         ])
      }catch(e) {
        console.log(e);
      }
    }
  
  
  
    return (
    <View style={styles.container}>
      <Image 
        source={require('./../../assets/images/notification.gif')} 
        style={styles.notificationImage}
      />
      <Text style={{fontSize:18}}>
        {medicine?.selectedDate}
      </Text>
        <Text style={{fontSize:38, fontWeight: 'bold', color:Colors.PRIMARY}}>
        {medicine?.reminder}
      </Text>
      <Text  style={{fontSize:18}} >
        It's time to take your medication!
      </Text>

      <MedicationCardItem medicine={medicine} />

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.closeBtn}
          onPress={() => {
            UpdateActionStatus('Missed');
            router.replace('/');
          }}
        >
          <AntDesign name="close" size={20} color="red" />
          <Text style={{fontSize: 16, color: 'red'}}>
            Missed
          </Text>
        </TouchableOpacity>

         <TouchableOpacity style={styles.successBtn}
         onPress={() => {
           UpdateActionStatus('Taken')}}
         >
          <Feather name="check" size={20} color="white" />
          <Text style={{fontSize: 16, color: 'white'}}>
             Taken
          </Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        onPress={() => router.replace('/')} 
        style={styles.backButton} 
      >
        <AntDesign name="closecircle" size={30} color="gray" />
      </TouchableOpacity>
    </View>
  )
} 

const styles = StyleSheet.create({
     container:{
      padding:25,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      backgroundColor: 'white',
      height: '100%',
     },
     btnContainer:{
      flexDirection: 'row',
      gap: 15,
      marginTop: 30,
      width: '90%',
      justifyContent: 'space-between',
     },
     notificationImage: {
      width: 120,
      height: 120,
      resizeMode: 'contain',
     },
     closeBtn:{
      padding: 12,
      flexDirection: 'row',
      gap: 8,
      borderWidth: 2,
      alignItems: 'center',
      borderRadius: 25,
      borderColor:'red',
      flex: 1,
      justifyContent: 'center',
     },
     successBtn:{
      padding: 12,
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
      borderRadius: 25,
      backgroundColor: Colors.GREEN,
      flex: 1,
      justifyContent: 'center',
     },
     backButton: {
      position: 'absolute',
      bottom: 40,
      alignSelf: 'center',
      padding: 10,
     }
})