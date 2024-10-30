import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '../Context/AuthContext';
import { PieChart } from 'react-native-chart-kit';

const TruckDetails = ({ id }) => {
  const { setAction } = useContext(AuthContext);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emissionLevel, setEmissionLevel] = useState(0); // Nível de emissão (0 a 100)

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

      // Supondo que a emissão esteja presente nos dados retornados
      const emissao = json?.emissao ?? 20; // Coloque um valor padrão de 50 se a emissão não for encontrada
      setEmissionLevel(emissao);
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

  // Função para determinar o nível de emissão
  const getEmissionStatus = () => {
    if (emissionLevel <= 33) {
      return 'Baixa';
    } else if (emissionLevel <= 66) {
      return 'Moderada';
    } else {
      return 'Alta';
    }
  };

  const item = vehicles;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}></TouchableOpacity>
        <Pressable onPress={() => setAction('TelaFrota')} style={styles.volt}>
          <Ionicons name="arrow-back" size={32} color="green" />
        </Pressable>
        <Text style={styles.headerTitle}></Text>
        <View style={styles.profileIcon}>
          <Text style={styles.profileIconText}>👤</Text>
        </View>
      </View>

      {/* Gráfico de Emissão no estilo Gauge */}
      <View style={styles.emissionCard}>
        <View style={styles.pieWrapper}>
          <PieChart
            data={[
              {
                name: 'Emissão',
                population: emissionLevel, // Nível de emissão
                color: emissionLevel <= 33 ? '#4CAF50' : emissionLevel <= 66 ? '#FFD700' : '#FF6347',
                legendFontColor: '#333333',
                legendFontSize: 15,
              },
              {
                name: 'Restante',
                population: 100 - emissionLevel,
                color: '#F0F0F0',
                legendFontColor: '#333333',
                legendFontSize: 15,
              },
            ]}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#FFFFFF',
              backgroundGradientFrom: '#FFFFFF',
              backgroundGradientTo: '#FFFFFF',
              decimalPlaces: 0, // Sem casas decimais
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor={'population'}
            backgroundColor={'transparent'}
            paddingLeft={'92'}
            hasLegend={false} // Remove legenda
            absolute // Mostra valor no gráfico
          />

          {/* Círculo transparente no centro para simular o buraco */}
          <View style={styles.innerCircle}></View>

          {/* Texto no centro do gráfico */}
          <View style={styles.centeredText}>
            <Text style={styles.emissionStatusText}>{getEmissionStatus()}</Text>
            <Text style={styles.emissionPercentageText}>{emissionLevel}%</Text>
          </View>
        </View>
      </View>

      <Image source={{ uri: item.modelo.foto }} style={styles.truckImage} />

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
    padding: 10,
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',

    position: 'relative', // Para posicionar o texto no centro
  },
  pieWrapper: {
    position: 'relative', // Para sobrepor o texto ao gráfico
  },
  innerCircle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    top: 50,
    left: (Dimensions.get('window').width - 160) / 2,
  },
  centeredText: {
    position: 'absolute',
    top: '38%', // Ajusta a posição do texto no centro
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emissionStatusText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
  },
  emissionPercentageText: {
    fontSize: 18,
    color: '#333333',
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
