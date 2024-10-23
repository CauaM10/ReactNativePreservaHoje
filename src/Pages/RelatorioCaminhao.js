import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '../Context/AuthContext';

const TruckDetails = ({id}) => {
  const { setAction } = useContext(AuthContext);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getVeiculo = async () => {
    try {
      const response = await fetch('http://10.139.75.86:5251/api/Veiculo/GetVeiculoId/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      setVehicles(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVeiculo();
  }, [getVeiculo]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }
  
  const item = vehicles;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
        </TouchableOpacity>
        <Pressable onPress={() => setAction('TelaFrota')} style={styles.volt}>
          <Ionicons name="arrow-back" size={32} color="green" />
        </Pressable>
        <Text style={styles.headerTitle}></Text>
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
      <Image source={{uri: item.modelo.foto}} style={styles.truckImage} />
      <View style={styles.truckInfo}>
        <Image source={require('../../assets/IconeCarro.png')} style={styles.scaniaLogo} />
        {item.modelo.modeloVeiculo && <Text style={styles.vehicleName}>{item.modelo.modeloVeiculo}</Text>}
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 15 }}>
        <View style={styles.infoItem}>
          <Text style={styles.infoItemTitle}>Motorista</Text>
          {item.motorista.nomeMotorista && <Text style={styles.vehicleDriver}>     {item.motorista.nomeMotorista}</Text>}
        </View>
        <View style={styles.infoItem2}>
          <Text style={styles.infoItemTitle}>Emissão/km</Text>
          <Text style={styles.infoItemValue}>-</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.reportButton}>
        <Text style={styles.reportButtonText}>Relatório Individual</Text>
      </TouchableOpacity>

    </View>
  )};

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
  volt: {
    marginTop: 30,
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
    width: '90%',
    height: 130,
    borderColor: "#D9D9D9",
    borderWidth: 2,
    marginLeft: 2,
    borderRadius: 5,
    marginLeft: 20,
    alignItems: 'center',
  },
  scaniaLogo: {
    width: 40,
    height: 40,
    zIndex: -1,
    marginTop: -20,
  },
  infoItem: {
    marginTop: 30,
    width: 180,
    height: 100,
    borderColor: "#D9D9D9",
    borderWidth: 2,
    marginLeft: 5,
    borderRadius: 5,
  },
  infoItem2: {
    marginTop: 30,
    width: 180,
    height: 100,
    borderColor: "#D9D9D9",
    borderWidth: 2,
    marginLeft: 10,
    borderRadius: 5,
  },
  reportButton: {
    marginTop: 30,
    width: '90%',
    height: 55,
    marginLeft: 20,
    backgroundColor: '#87CE57',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoItemTitle: {
    marginLeft: '10%',
    marginTop: 10,
  },
});

export default TruckDetails;
