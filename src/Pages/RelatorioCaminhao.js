import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '../Context/AuthContext';
import { PieChart } from 'react-native-chart-kit';

const TruckDetails = ({ id }) => {
  const { setAction } = useContext(AuthContext);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [emissionLevel, setEmissionLevel] = useState(0); // Nível de emissão (0 a 100)
  const [emissao, setEmissao] = useState();

  const getVeiculo = async () => {



    await fetch('http://10.139.75.86:5001/api/Veiculo/GetVeiculoId/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        setVehicles(json);
        const emissao = json?.emissao ?? 20; // Coloque um valor padrão de 50 se a emissão não for encontrada
        setEmissionLevel(emissao);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
      })
  }

  function FatoCombustivel(combustivel){
    let fatorEmissao;
    switch (combustivel) {
      case 'diesel':
        fatorEmissao = 2.68;
        break;
      case 'gasolina':
        fatorEmissao = 2.31;
        break;
      case 'etanol':
        fatorEmissao = 1.53;
        break;
      default:
        fatorEmissao = 2.68;

    }
    return fatorEmissao;
  }
  

  async function getKmsRodadosDia() {
    const hoje = new Date();

    await fetch('http://10.139.75.86:5001/api/KmsRodados/GetKmVeiculoDia/'  + id + "/" + hoje.toDateString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(json => {
        const emissaoemKg = ( json.kmsRodados / json.veiculo.consumo ) * FatoCombustivel( json.veiculo.tipoCombustivel.combustivel );
        setEmissao( json.kmsRodados );
        setEmissionLevel( json.kmsRodados );
      })
      .catch((err) => {
        setError(err.message);
      })
  }

  useEffect(() => {
    getVeiculo();
  }, []);

  useEffect(() => {
    getKmsRodadosDia();
  }, [vehicles])

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  // Função para determinar o nível de emissão
  const getEmissionStatus = () => {
    if (emissionLevel <= 33) {
      return 'Leve';
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
          <Ionicons name="arrow-back" size={32} color="green" bottom={20} right={30} />
          <Text style={styles.textback}>Auto Móvel</Text>
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


              },
              {
                name: 'Restante',
                population: 100 - emissionLevel,
                color: '#D3D3D3',

              },
            ]}
            width={Dimensions.get('window').width - 500}
            height={130}
            chartConfig={{

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
        <Text style={{ bottom: 100, left: 165, fontSize: 15 }}>Emissão do dia</Text>
        <Text></Text>
      </View>

      <Image source={{ uri: item.modelo.foto }} style={styles.truckImage} />

      <View style={styles.truckInfo}>
        <Image source={require('../../assets/IconeCarro.png')} style={styles.scaniaLogo} />
        {item.modelo.modeloVeiculo && <Text style={styles.vehicleName}>{item.modelo.modeloVeiculo}</Text>}
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 22 }}>
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
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 50,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    backgroundColor: '#87CE57',
    borderBottomWidth: 1,
    zIndex: -1,
    borderBottomColor: '#CCCCCC',
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
    bottom: 23,
    left: 30
  },
  volt: {
    marginTop: 20,
    display: "flex"
  },
  textback: {
    bottom: 52,
    left: 10,
    fontWeight: 'bold',
    fontSize: 23,
    color: '#fff',
  },
  profileIconText: {
    fontSize: 24,
    color: '#333333',
  },
  emissionCard: {
    backgroundColor: '#FFFFFF',
    display: "flex",
    margin: 20,
    width: "75%",
    height: 140,
    bottom: 80,
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    left: 35
  },
  pieWrapper: {
    position: 'relative', // Para sobrepor o texto ao gráfico
  },
  innerCircle: {
    position: 'absolute',
    width: 83,
    height: 83,
    borderRadius: 60,
    backgroundColor: '#F0F0F0',
    top: 23,
    left: (Dimensions.get('window').width - 355) / 2,
  },
  centeredText: {
    position: 'absolute',
    top: '30%', // Ajusta a posição do texto no centro
    left: 0,
    right: 170,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emissionStatusText: {
    fontSize: 20,
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
    bottom: 105,
    resizeMode: "contain",
    alignSelf: 'center',
  },
  truckInfo: {
    width: '83%',
    height: 160,
    borderColor: "#D9D9D9",
    bottom: 110,
    borderWidth: 2,
    marginLeft: 2,
    borderRadius: 15,
    marginLeft: 37,
    alignItems: 'center',
  },
  scaniaLogo: {
    width: 40,
    height: 40,
    zIndex: -1,
    marginTop: -20,
  },
  infoItem: {
    width: 160,
    height: 120,
    bottom: 90,
    borderColor: "#D9D9D9",
    borderWidth: 2,
    marginLeft: 15,
    borderRadius: 10,
  },
  infoItem2: {
    width: 160,
    height: 120,
    bottom: 90,
    borderColor: "#D9D9D9",
    borderWidth: 2,
    marginLeft: 20,
    borderRadius: 10,
  },
  reportButton: {
    width: '82%',
    height: 55,
    bottom: 65,
    marginLeft: 38,
    backgroundColor: '#87CE57',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoItemTitle: {
    marginLeft: '10%',
    marginTop: 10,
  },
  vehicleName: {
    color: '#87CE57',
    top: 5
  }
});

export default TruckDetails;
