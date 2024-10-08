import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Pressable } from 'react-native';
import Icone from '@expo/vector-icons/Ionicons';
import { AuthContext } from '../Context/AuthContext';

const App = () => {
  const { setAction } = useContext(AuthContext);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const getVeiculo = async () => {
    try {
      const response = await fetch('http://10.139.75.86:5251/api/Veiculo/GetAllVeiculo', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      setVehicles(json);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVeiculo();
  }, []);

  const handleVehiclePress = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const renderVehicleItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleVehiclePress(item)} style={styles.vehicleItem}>
      <View style={styles.vehicleIconContainer}>
        <Image
          source={require('../../assets/IconeCaminhao.png')}
          style={styles.vehicleIcon}
        />
      </View>
      <View style={styles.vehicleInfo}>
        {item.modeloVeiculo && <Text style={styles.vehicleName}>{item.modeloVeiculo}</Text>}
        {item.marcaVeiculo && <Text style={styles.vehicleDriver}>Marca: {item.marcaVeiculo}</Text>}
      </View>
      <TouchableOpacity onPress={() => setAction('RelatorioCaminhao')} style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Detalhes</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Pressable onPress={() => setAction('home')} style={styles.volt}>
        <Icone name="arrow-back" size={32} color="green" />
      </Pressable>
      <Text style={styles.headerTitle}>Frota</Text>
    </View>
    <FlatList
      data={vehicles}
      renderItem={renderVehicleItem}
      keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())} // Se id não existir, gera um id aleatório
      style={styles.vehicleList}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#78e08f',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  volt: {
    marginTop: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  vehicleList: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  vehicleItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleIconContainer: {
    marginRight: 16,
  },
  vehicleIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  vehicleDriver: {
    fontSize: 14,
  },
  detailsButton: {
    backgroundColor: '#78e08f',
    borderRadius: 4,
    padding: 8,
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
