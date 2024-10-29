import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Pressable, Alert } from 'react-native';
import Icone from '@expo/vector-icons/Ionicons';
import { AuthContext } from '../Context/AuthContext';

const TelaFrotas = () => {
  const { setAction, setGlobalId } = useContext(AuthContext);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const getVeiculo = async () => {
    try {
      const response = await fetch('http://10.139.75.61:5251/api/Veiculo/GetAllVeiculo', {
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch('http://10.139.75.61:5251/api/Veiculo/DeleteVeiculo/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        Alert.alert('Sucesso', 'Veículo deletado com sucesso');
        setVehicles(vehicles.filter(vehicle => vehicle.veiculoId !== id)); // Remove o veículo da lista local
      } else {
        Alert.alert('Erro', 'Falha ao deletar o veículo');
      }
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
  };

  useEffect(() => {
    getVeiculo();
  }, []);

  const renderVehicleItem = ({ item }) => (
    <View style={styles.vehicleItem}>
      <View style={styles.vehicleIconContainer}>
        <Image
          source={require('../../assets/IconeCaminhao.png')}
          style={styles.vehicleIcon}
        />
      </View>
      <View style={{ display: 'block' }}>
        <View style={styles.vehicleInfo}>
          {item.modelo.modeloVeiculo && <Text style={styles.vehicleName}>{item.modelo.modeloVeiculo}</Text>}
          {item.motorista.nomeMotorista && <Text style={styles.vehicleDriver}>Motorista: {item.motorista.nomeMotorista}</Text>}
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <TouchableOpacity 
            onPress={() => { setGlobalId(item.veiculoId); setAction('RelatorioCaminhao'); }} 
            style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>Detalhes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.veiculoId)}>
          <Image source={require('../../assets/excluir.png')} style = {{ width: 35, height: 35, marginTop: 17, marginLeft: 20}}/>
          </TouchableOpacity>
            
        </View>
      </View>
    </View>
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
          <Icone name="arrow-back" size={42} color="green" />
        </Pressable>
        <Text style={styles.headerTitle}>Frota</Text>
      </View>
      
      <FlatList
        data={vehicles}
        renderItem={renderVehicleItem}
        keyExtractor={(item) => (item.veiculoId ? item.veiculoId.toString() : Math.random().toString())}
        style={styles.vehicleList}
      ></FlatList>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F4F4',
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
    marginLeft:15,
    marginTop: 25
  },
  vehicleList: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#F2F2F2',
  },
  vehicleItem: {
  
    width: '90%',
    height: 130,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginLeft: '5%',
    marginBottom: 26,
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
    marginRight: 20,
  },
  vehicleIcon: {
    width: 78,
    height: 100,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 1,
  },
  vehicleDriver: {
    fontSize: 14,
  },
  detailsButton: {
    backgroundColor: '#87CE57',
    borderRadius: 7,
    textAlign: 'center',
    justifyContent: 'center',
    width: 80,
    height: 35,
    marginLeft: '29%',
    borderColor:'#87CE57',
    borderWidth: 2,
    marginTop: 17,
  },
  detailsButtonText: {
    color: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },

  deleteButtonText: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TelaFrotas;
