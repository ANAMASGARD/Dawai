import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from '../config/FirebaseConfig';
import Colors from '../constant/Colors';
import { TypeList, WhenToTake } from '../constant/Options';
import { getLocalStorage } from '../service/AsyncStorageService';
import { FormatedDateForText, formatTime, getDatesRange } from '../service/ConvertDateTime';
import { useRouter } from 'expo-router';


export default function AddMedicationForm() {
const [formData, setFormData] = React.useState({});
const [showStartDate, setShowStartDate] = useState(false);
const [showEndDate, setShowEndDate] = useState(false);
const [showReminderTime, setShowReminderTime] = useState(false);
const [loading, setLoading] = useState(false);
const router = useRouter();
const onHandleChange = (field, value) => {
  setFormData(prev=>({
    ...prev,
    [field]: value
  }));
  console.log(formData);
}

const SaveMedication = async( ) => {
  const docId = Date.now().toString();
  const user = await getLocalStorage('userDetail');
  
  if(!formData?.name || !formData?.type || !formData?.dosage || !formData?.when || !formData?.startDate || !formData?.endDate || !formData?.reminderTime) {
    Alert.alert('Please fill all fields');
    return;
  }

  const dates=getDatesRange(formData?.startDate, formData?.endDate);
  console.log(dates);
  setLoading(true);
  
  try {
    await setDoc(doc(db,'medication',docId), {
      ...formData,
      userEmail: user?.email,
      docId: docId,
      dates: dates,
    });
    setLoading(false);
    Alert.alert('Success', 'Medication added successfully!', [
      {
        text:'Ok',
        onPress: () => {
          router.push('(tabs)');
        }
      }
    ]);
  } catch(e) {
    setLoading(false);
    console.log(e);
    Alert.alert('Error', 'Failed to save medication');
  }
}

const onStartDateChange = (event, selectedDate) => {
  setShowStartDate(false);
  if (selectedDate) {
    onHandleChange('startDate', selectedDate);
  }
};

const onEndDateChange = (event, selectedDate) => {
  setShowEndDate(false);
  if (selectedDate) {
    onHandleChange('endDate', selectedDate);
  }
};

const onReminderTimeChange = (event, selectedTime) => {
  console.log('Time picker event:', event);
  console.log('Selected time:', selectedTime);
  
  setShowReminderTime(false);
  if (selectedTime) {
    console.log('Setting reminder time:', selectedTime);
    onHandleChange('reminderTime', selectedTime);
  }
};

  return (
    <View style={{ padding: 25 }}>
      <Text style={styles.header}>Add New Medication </Text>
    
    <View style={styles.inputGroup}>
     <FontAwesome5 style={styles.icon} name="briefcase-medical" size={24} color="grey" />
     <TextInput style ={styles.TextInput} placeholder='  Medicine Name'
     onChangeText={(value) => onHandleChange('name' ,value)}
     />
    </View>

     {/* type list */}
    <FlatList 
    data={TypeList}
    horizontal
    style={{ marginTop: 5 }}
    renderItem={({ item, index}) => (
        <TouchableOpacity style={[styles.inputGroup,{marginRight:10},
          {backgroundColor:item.name==formData?.type?.name?Colors.PRIMARY : 'white',}
        ]}
        onPress={() => onHandleChange('type', item)} >
            <Text style={[styles.typeText,
               {color:item.name==formData?.type?.name?'white':'black'}
            ]}>
                {item?.name}
            </Text>
        </TouchableOpacity>
    )}
    />
    
    {/* dosage input */}
    <View style={styles.inputGroup}>
     <FontAwesome5 style={styles.icon} name="pills" size={24} color="grey" />
     <TextInput style ={styles.TextInput} placeholder='  Dosage'
     onChangeText={(value) => onHandleChange('dosage' ,value)}
     />
     </View>
    
   
  {/* WHEN TO TAKE DROPDOWN */}
  <View style={styles.inputGroup}>
      <FontAwesome5 style={styles.icon} name="clock" size={24} color={Colors.PRIMARY} />
      <Picker
        selectedValue={formData?.when}
        onValueChange={(itemValue,itemIndex) => onHandleChange('when', itemValue)} 
        style={{ width: '90%' }}
        >
          <Picker.Item label="Select when to take" value="" />
          {WhenToTake.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
      </Picker>
     </View>
     
  {/* Start and End Date */}
  <View style={styles.dateInputGroup}>
    <TouchableOpacity style={[styles.inputGroup,{flex: 1,}]} onPress={() => setShowStartDate(true)}>
     <FontAwesome style={styles.icon} name="calendar-plus-o" size={24} color={Colors.PRIMARY} />
       <Text style={styles.text}>
        {formData?.startDate ? FormatedDateForText(formData.startDate) : 'Start Date'}
       </Text>
    </TouchableOpacity>

     {/* End Date */}
    <TouchableOpacity style={[styles.inputGroup,{flex: 1,}]} onPress={() => setShowEndDate(true)}>
     <FontAwesome style={styles.icon} name="calendar-plus-o" size={24} color={Colors.PRIMARY} />
       <Text style={styles.text}>
        {formData?.endDate ? FormatedDateForText(formData.endDate) : 'End Date'}
       </Text>
    </TouchableOpacity>
  </View>

  {/* Reminder Time */}
  <TouchableOpacity style={styles.inputGroup} onPress={() => {
    console.log('Reminder time button pressed');
    setShowReminderTime(true);
  }}>
   <FontAwesome5 style={styles.icon} name="bell" size={24} color={Colors.PRIMARY} />
     <Text style={styles.text}>
      {formData?.reminderTime ? formatTime(formData.reminderTime) : 'Select Reminder Time'}
     </Text>
  </TouchableOpacity>

  {/* Date Pickers */}
  {showStartDate && (
    <DateTimePicker
      value={formData.startDate ? new Date(formData.startDate) : new Date()}
      mode="date"
      display="default"
      onChange={onStartDateChange}
    />
  )}

  {showEndDate && (
    <DateTimePicker
      value={formData.endDate ? new Date(formData.endDate) : new Date()}
      mode="date"
      display="default"
      onChange={onEndDateChange}
    />
  )}

  {showReminderTime && (
    <DateTimePicker
      value={formData.reminderTime ? new Date(formData.reminderTime) : new Date()}
      mode="time"
      display="clock"
      onChange={onReminderTimeChange}
      is24Hour={false}
    />
  )}
  
 
  <TouchableOpacity style={styles.button} onPress={()=>SaveMedication()}>

     {loading? <ActivityIndicator size={'large'} color={'white' } /> :
   <Text style={styles.buttonText}>Add New Medication</Text>}
  </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        fontWeight: 'bold',
        
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderBlockColor:Colors.LIGHT_GRAY_BORDER,
        backgroundColor:'white',
    },
    TextInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 19,
        color: Colors.DARK_GRAY,
    },
    icon:{
       color: Colors.PRIMARY,
       borderRightWidth: 1,
       paddingRight: 12,
       borderColor: Colors.GRAY,
    },
    typeText: {
        fontSize: 16,
    },
    text:{
        fontSize: 16,
        padding: 5,
    },
    dateInputGroup: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    button: {
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        width: '100%',
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 25,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
})