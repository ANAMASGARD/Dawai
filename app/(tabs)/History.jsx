import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import EmptyState from '../../components/EmptyState';
import MedicationCardItem from '../../components/MedicationCardItem';
import { db } from '../../config/FirebaseConfig';
import Colors from '../../constant/Colors';
import { getLocalStorage } from '../../service/AsyncStorageService';
import { GetDateRangeToDisplay } from '../../service/ConvertDateTime';

export default function History() {
  const [dateRange, setDateRange] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('MM/DD/YYYY'));
  const [loading, setLoading] = useState(false);
  const [medList, setMedList] = useState([]);
  const route = useRoute();
  const router = useRouter();

  useEffect(() => {
    GetDataRangeList();
    GetMedicationList(selectedDate);
  }, []);

  const GetDataRangeList = () => {
    const dateRange = GetDateRangeToDisplay();
    setDateRange(dateRange);
  }

  const GetMedicationList = async (selectedDate) => {
    setLoading(true);
    const user = await getLocalStorage('userDetail');
    setMedList([]);
    try {
      const q = query(collection(db, 'medication'),
        where('userEmail', '==', user?.email),
        where('date', 'array-contains', selectedDate));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log("docId" + doc.id + " => ", doc.data());
        setMedList(prev => [...prev, doc.data()]);
      })
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  return (
<FlatList
    data={[]}
    style={{ marginTop: 25,
      height: '100%',
      backgroundColor: 'white',
     }}
    ListHeaderComponent={

    <View style={styles.mainContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Medication History</Text>
        <Text style={styles.subtitle}>Track all your medication records</Text>
      </View>
      <Image
        source={require('../../assets/images/med-history.png')}
        style={styles.historyImage}
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
              { backgroundColor: item.formattedDate == selectedDate ? Colors.PRIMARY : Colors.LIGHT_GRAY_BORDER }
            ]}
            onPress={() => {
              setSelectedDate(item.formattedDate);
              GetMedicationList(item.formattedDate);
            }}
          >
            <Text style={[styles.day, { color: item.formattedDate == selectedDate ? 'white' : 'black' }]}>
              {item.day}
            </Text>
            <Text style={[styles.date, { color: item.formattedDate == selectedDate ? 'white' : 'black' }]}>
              {item.date}
            </Text>
          </TouchableOpacity>
        )}
      />

      {medList.length > 0 ? <FlatList
        data={medList}
        onRefresh={() => GetMedicationList(selectedDate)}
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
            <MedicationCardItem medicine={item} selectedDate={selectedDate} />
          </TouchableOpacity>
        )}
      /> : 
      <Text style={{ fontSize: 26, color: Colors.DARK_GRAY, 
      padding: 30,
      textAlign: 'center'
  
      }}>
        No Medication Found !</Text>}

    </View>}
    />
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    padding: 25,
    paddingTop: 60,
    backgroundColor: 'white',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  historyImage: {
    width: 350,
    height: 250,
    resizeMode: 'contain',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
  },
  dateGroup: {
    padding: 8,
    backgroundColor: Colors.LIGHT_GRAY_BORDER,
    display: 'flex',
    alignItems: 'center',
    marginRight: 8,
    borderRadius: 8,
    minWidth: 45,
    maxWidth: 50,
    height: 60,
  },
  day: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  }
})