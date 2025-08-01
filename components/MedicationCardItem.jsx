import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../constant/Colors';
import { useEffect } from 'react';
import { useState } from 'react';


export default function MedicationCardItem({medicine,selectedDate=''}) {
    console.log("medicine", medicine);
    const [status, setStatus] = useState();

    useEffect(() => {
        CheckStatus();
    }, [selectedDate]);

    const CheckStatus=() => {
        const data= medicine?.action?.find((item) => {
            return item?.date === selectedDate;
            console.log("--", data);
            setStatus(data);
        })
    }
  return (
    <View style={styles.container}>
          <View style={styles.subContainer}>
       <View style={styles.imageContainer}>
       <Image source={{uri:medicine?.type?.icon}} 
       style={{
           width: '60%',
           height: '60%',
          
       }} />

    </View>
    <View>
        <Text style={{fontSize:22,fontWeight:'bold'}}>{medicine?.name}</Text>
         <Text style={{fontSize:17}}>{medicine?.when}</Text>
          <Text style={{color:'white'}}>{medicine?.dose} {medicine?.type?.name}</Text>
    </View>
    </View>
    <View style={styles.remainderContainer}>
        <Ionicons name="timer-outline" size={24} color="black" />
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {medicine?.reminder}
        </Text>
    </View>
      {status?.date&&  <View style={styles.statusContainer}>
{status?.status=='Taken'?<Ionicons name="checkmark-circle" 
size={24} color={Colors.GREEN} />:
status?.status=='Skipped'?<Ionicons name="close-circle" size={24} color="red" />:
<Ionicons name="help-circle" size={24} color="black" />
}
    </View>}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      padding: 10,
    //   backgroundColor:Colors.LIGHT_PRIMARY,
    borderWidth: 1,
        borderColor: Colors.LIGHT_GRAY_BORDER,
       marginTop: 10,
      borderRadius: 15,
      flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
      
    },
     imageContainer: {
        padding: 10,
        backgroundColor:'white',

        borderRadius: 15,
        overflow: 'hidden',
        marginRight: 10,
       
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    remainderContainer: {
        padding: 12,
        backgroundColor:'white',
        borderRadius: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.LIGHT_GRAY_BORDER,
    },
    statusContainer: {
        position: 'absolute',
        gap:5,
        padding: 10,
    }

})