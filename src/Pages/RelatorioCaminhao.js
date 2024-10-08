import React, {useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '../Context/AuthContext';



const TruckDetails = () => {
  const { setAction } = useContext(AuthContext);
  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
    
        </TouchableOpacity>
        <Pressable onPress={() => setAction('TelaFrota')} style = {styles.volt}><Ionicons name="arrow-back" size={32} color="green" /></Pressable>
        <Text style={styles.headerTitle}>Caminhão 1</Text>
        <View style={styles.profileIcon}>
          <Text style={styles.profileIconText}>👤</Text>
        </View>
      </View>
      <View style={styles.emissionCard}>
        <View style={styles.emissionCircle}>
          <Text style={styles.emissionCircleText}>Leve</Text>
        </View>
        <Text style={styles.emissionText}>Emissão do dia</Text>
      </View>
      <Image source={require('../../assets/nissan-gtr.png')} style={styles.truckImage} />
      <View style={styles.truckInfo}>
        <Image source={require('../../assets/IconeCarro.png')} style={styles.scaniaLogo} />
        <Text style={styles.scaniaText}>GT-R nissan</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 15
       }}>
        <View style={styles.infoItem}>
          <Text style={styles.infoItemTitle}>Motorista</Text>
          <Text style={styles.infoItemValue}>-</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoItemTitle}>Emissão/km</Text>
          <Text style={styles.infoItemValue}>-</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.reportButton}>
        <Text style={styles.reportButtonText}>Relatório Individual</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#333333',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  volt:{
   marginTop: 30
  },
  profileIconText: {
    fontSize: 24,
    color: '#333333',
  },
  emissionCard: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  emissionCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emissionCircleText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  emissionText: {
    fontSize: 16,
    color: '#333333',
    marginTop: 10,
  },
  truckImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    
  },
  truckInfo: {
    width: 350,
    height: 130,
    borderColor: "#D9D9D9",
    borderWidth: 2,
    marginLeft: 25,
    borderRadius: 5,
    alignItems: 'center'
  },
  scaniaLogo: {
    width: 40,
    height: 40,
    zIndex: -1,
    marginTop: -20,
  },
  scaniaText: {
    color: '#5C9635',
    fontWeight: '500',
    fontSize: 20,
    marginLeft: 10,
  },
  infoContainer: {
    
  },
  infoItem: {
    marginTop: 30,
   width: 170,
   height: 100,
   borderColor: "#D9D9D9",
   borderWidth: 2,
   marginLeft: 10,
   borderRadius: 5


  },
  reportButton:
  {
    marginTop: 30,
    width: 350,
    height: 55,
    marginLeft: 25,
    backgroundColor: '#87CE57',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoItemTitle:{
    marginLeft: '10%',
    marginTop: 10
  }
  
});
export default TruckDetails;