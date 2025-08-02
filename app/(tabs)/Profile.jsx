import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { getLocalStorage, removeLocalStorage } from '../../service/AsyncStorageService';

export default function Profile() {
  const router = useRouter();
  const [userDetail, setUserDetail] = useState(null);
  const { isDarkMode, colors, toggleTheme } = useTheme();

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = async () => {
    const user = await getLocalStorage('userDetail');
    setUserDetail(user);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            await removeLocalStorage('userDetail');
            router.replace('/Login');
          },
        },
      ]
    );
  };

  const navigateToAddMedication = () => {
    router.push('/add-new-medication');
  };

  const navigateToMyMedication = () => {
    router.push('/(tabs)');
  };

  const navigateToHistory = () => {
    router.push('/(tabs)/History');
  };

  const themeColors = {
    background: colors.surface,
    cardBackground: colors.card,
    textPrimary: colors.text,
    textSecondary: colors.textSecondary,
    border: colors.border,
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: themeColors.textPrimary }]}>Profile</Text>
      </View>

      {/* User Info Section */}
      <View style={[styles.userSection, { backgroundColor: themeColors.cardBackground }]}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>⭐</Text>
        </View>
        <Text style={[styles.userName, { color: themeColors.textPrimary }]}>
          {userDetail?.displayName || userDetail?.fullName || userDetail?.email?.split('@')[0] || 'User'}
        </Text>
        <Text style={[styles.userEmail, { color: themeColors.textSecondary }]}>
          {userDetail?.email || 'user@example.com'}
        </Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {/* Add New Medication */}
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.border }]}
          onPress={navigateToAddMedication}
        >
          <View style={[styles.menuIcon, { backgroundColor: colors.primary }]}>
            <AntDesign name="plus" size={20} color="white" />
          </View>
          <Text style={[styles.menuText, { color: themeColors.textPrimary }]}>Add New Medication</Text>
          <AntDesign name="right" size={16} color={themeColors.textSecondary} />
        </TouchableOpacity>

        {/* My Medication */}
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.border }]}
          onPress={navigateToMyMedication}
        >
          <View style={[styles.menuIcon, { backgroundColor: colors.primary }]}>
            <MaterialIcons name="medical-services" size={20} color="white" />
          </View>
          <Text style={[styles.menuText, { color: themeColors.textPrimary }]}>My Medication</Text>
          <AntDesign name="right" size={16} color={themeColors.textSecondary} />
        </TouchableOpacity>

        {/* History */}
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.border }]}
          onPress={navigateToHistory}
        >
          <View style={[styles.menuIcon, { backgroundColor: colors.primary }]}>
            <MaterialIcons name="history" size={20} color="white" />
          </View>
          <Text style={[styles.menuText, { color: themeColors.textPrimary }]}>History</Text>
          <AntDesign name="right" size={16} color={themeColors.textSecondary} />
        </TouchableOpacity>

        {/* Dark Mode Toggle */}
        <View style={[styles.menuItem, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.border }]}>
          <View style={[styles.menuIcon, { backgroundColor: isDarkMode ? '#666' : '#333' }]}>
            <Ionicons name={isDarkMode ? "moon" : "sunny"} size={20} color="white" />
          </View>
          <Text style={[styles.menuText, { color: themeColors.textPrimary }]}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={isDarkMode ? '#fff' : '#f4f3f4'}
          />
        </View>

        {/* Logout */}
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.border }]}
          onPress={handleLogout}
        >
          <View style={[styles.menuIcon, { backgroundColor: '#4A90E2' }]}>
            <MaterialIcons name="logout" size={20} color="white" />
          </View>
          <Text style={[styles.menuText, { color: themeColors.textPrimary }]}>Logout</Text>
          <AntDesign name="right" size={16} color={themeColors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  header: {
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  userSection: {
    alignItems: 'center',
    padding: 30,
    borderRadius: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 40,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
});