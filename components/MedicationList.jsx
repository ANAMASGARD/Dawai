import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GetDateRangeToDisplay } from './../service/ConvertDateTime';
// Define Colors constants here since the import isn't resolving
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';
import Colors from '../constant/Colors'; // Ensure this path is correct

import moment from 'moment';
import { getLocalStorage } from '../service/AsyncStorageService';
import EmptyState from './EmptyState';
import MedicationCardItem from './MedicationCardItem';
import { useRoute } from '@react-navigation/native';

export default function MedicationList() {

    const [medList, setMedList] = useState([]);
    const [dateRange, setDateRange] = useState([]);
    const [selectedDate, setSelectedDate] = useState(moment().format('MM/DD/YYYY'));

    const [loading, setLoading] = useState(false);
    const router = useRoute();
    useEffect(() => {
        GetDataRangeList();
        GetMedicationList(selectedDate);
    }, []);

    const  GetDataRangeList = () => {
        const dateRange = GetDateRangeToDisplay();
        setDateRange(dateRange);
    }

    const GetMedicationList = async(selectedDate) => {
        setLoading(true);
      const user = await getLocalStorage('userDetail');
      setMedList([]);
    try{
       const q=query(collection(db, 'medication'),
    where('userEmail', '==', user?.email), 
    where('date', 'array-contains', selectedDate));

    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
        console.log("docId"+doc.id+" => ", doc.data());
        setMedList(prev => [...prev, doc.data()]);

    })
    setLoading(false);
    }catch(e) {
        console.log(e);
        setLoading(false);
    }
    
    }
    
    return (
        <View style={{
            marginTop: 25,
        }}>
    <Image 
     source={require('./../assets/images/medication.jpeg')} 
      style={{
                    width: '100%',
                    height: 160,
                    alignSelf: 'center',
                    borderRadius: 15,
                    marginHorizontal: 10,
                }} 
            />

<FlatList 
data={dateRange}
horizontal
style={{
    marginTop: 20,
    paddingLeft: 10,
}}
keyExtractor={(item, index) => index.toString()}
showsHorizontalScrollIndicator={false}
renderItem={({ item, index }) => (
    <TouchableOpacity 
        style={[
            styles.dateGroup,
            {backgroundColor: item.formattedDate == selectedDate ? Colors.PRIMARY : Colors.LIGHT_GRAY_BORDER}
        ]}
        onPress={() => {
            setSelectedDate(item.formattedDate);
            GetMedicationList(item.formattedDate);
        }}
    >
        <Text style={[styles.day, {color: item.formattedDate == selectedDate ? 'white' : 'black'}]}>
            {item.day}
        </Text>
        <Text style={[styles.date, {color: item.formattedDate == selectedDate ? 'white' : 'black'}]}> 
             {item.date}
        </Text>
    </TouchableOpacity>
)}
/>

{medList.length>0? <FlatList
data={medList}
onRefresh={()=>GetMedicationList(selectedDate)}
refreshing={loading}
renderItem={({ item, index }) => (
    <TouchableOpacity onPress={
        () => router.push({
            pathname: '/action-modal',
            params: { 
                ...item,
                selectedDate: selectedDate,
                

             }
        })
    }>
        <MedicationCardItem medicine={item} selectedDate={selectedDate}/>
    </TouchableOpacity>
)}
/>:<EmptyState/>}


        </View>
    )
}

const styles = StyleSheet.create({
    dateGroup: {
        padding: 8,
        backgroundColor:Colors.LIGHT_GRAY_BORDER,
        display: 'flex',
        alignItems: 'center',
        marginRight: 8,
        borderRadius: 8,
        minWidth: 45,
        maxWidth: 50,
        height: 60,
    },
    day:{
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    date:{
        fontSize: 16,
        fontWeight: 'bold',
    }
})