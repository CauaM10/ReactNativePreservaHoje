import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Alert, Image, Pressable } from 'react-native';
import { Button, TextInput, Provider as PaperProvider, Text, Card, DefaultTheme } from 'react-native-paper';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import foto from '..//../assets/PreservaHj-risco.png';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '../Context/AuthContext';

const MAX_DISTANCE = 10000; // Máximo de 10.000 km
const MAX_CONSUMO = 1000; // Máximo de 1000 L/100km

const CarbonEmissionCalculator = () => {
  const { setAction } = useContext(AuthContext);
  const [distancia, setDistancia] = useState('');
  const [consumo, setConsumo] = useState('');
  const [combustivel, setCombustivel] = useState('diesel');
  const [emissao, setEmissao] = useState(null);
  const [isCalculable, setIsCalculable] = useState(false);

  useEffect(() => {
    // Verifica se os inputs são válidos e atualiza a habilitação do botão de cálculo
    const distanciaNum = parseFloat(distancia);
    const consumoNum = parseFloat(consumo);
    setIsCalculable(
      !isNaN(distanciaNum) && distanciaNum > 0 && distanciaNum <= MAX_DISTANCE &&
      !isNaN(consumoNum) && consumoNum > 0 && consumoNum <= MAX_CONSUMO
    );
  }, [distancia, consumo]);

  const validateInput = (type) => {
    const value = type === 'distancia' ? parseFloat(distancia) : parseFloat(consumo);
    if (isNaN(value) || value <= 0) return;

    if (type === 'distancia' && value > MAX_DISTANCE) {
      Alert.alert('Erro', `A distância não pode ser maior que ${MAX_DISTANCE} km.`);
    } else if (type === 'consumo' && value > MAX_CONSUMO) {
      Alert.alert('Erro', `O consumo não pode ser maior que ${MAX_CONSUMO} L/100 km.`);
    }
  };

  const calcularEmissao = () => {
    if (!isValidInput()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
      return;
    }

    const consumoDividido = parseFloat(consumo) / 100;
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

    const emissaoCalculada = (parseFloat(distancia) * consumoDividido * fatorEmissao).toFixed(2);
    setEmissao(emissaoCalculada);
    enviarDadosParaAPI(distancia, consumo, combustivel, emissaoCalculada);
  };

  const isValidInput = () => {
    const distanciaNum = parseFloat(distancia);
    const consumoNum = parseFloat(consumo);
    return (
      !isNaN(distanciaNum) && distanciaNum > 0 && distanciaNum <= MAX_DISTANCE &&
      !isNaN(consumoNum) && consumoNum > 0 && consumoNum <= MAX_CONSUMO
    );
  };

  const enviarDadosParaAPI = async (distancia, consumo, combustivel, emissao) => {
    try {
      await axios.post('https://sua-api.com/emissao', { consumo, emissao });
      await axios.post('https://sua-api.com/distancia', { distancia });
      await axios.post('https://sua-api.com/combustivel', { combustivel });
      Alert.alert('Sucesso', 'Dados enviados com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível enviar os dados.');
    }
  };

  const showHelp = () => {
    Alert.alert(
      'Instruções',
      '1. Informe a distância percorrida (em km).\n' +
      '2. Informe o consumo do veículo (em litros por Km).\n' +
      '3. Selecione o tipo de combustível.\n' +
      '4. Clique no botão de calcular para obter a emissão de CO2.',
      [{ text: 'OK' }]
    );
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#87CE57',
      underlineColor: '#87CE57',
      text: '#00000',
      placeholder: '#888',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Pressable onPress={() => { setAction('home'); }} style={styles.volt}>
            <Ionicons name="arrow-back" size={32} color="green" />
          </Pressable>
          <Image
            source={foto}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>Calculadora de Emissão</Text>
        </View>

        <View style={styles.calculatorContainer}>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.resultContainer}>
                <Button
                  icon="information"
                  onPress={showHelp}
                  style={styles.helpButton}
                  labelStyle={styles.helpButtonLabel}
                />
                <Text style={styles.result}>
                  {emissao !== null ? `Emissão: ${emissao} kg CO2` : 'Resultado aqui'}
                </Text>
              </View>

              <TextInput
                label="Distância (km)"
                value={distancia}
                onChangeText={setDistancia}
                onBlur={() => validateInput('distancia')}
                keyboardType="numeric"
                style={styles.input}
                activeUnderlineColor="#87CE57"
                selectionColor="#87CE57"
                mode="outlined"
              />

              <TextInput
                label="Consumo (p/km)"
                value={consumo}
                onChangeText={setConsumo}
                onBlur={() => validateInput('consumo')}
                keyboardType="numeric"
                style={styles.input}
                activeUnderlineColor="#87CE57"
                selectionColor="#87CE57"
                mode="outlined"
              />

              <Text style={styles.fuelLabel}>Combustível</Text>
              <View style={styles.buttonGroup}>
                <Button
                  mode={combustivel === 'diesel' ? 'contained' : 'outlined'}
                  onPress={() => setCombustivel('diesel')}
                  style={styles.fuelButton}
                >
                  Diesel
                </Button>
                <Button
                  mode={combustivel === 'gasolina' ? 'contained' : 'outlined'}
                  onPress={() => setCombustivel('gasolina')}
                  style={styles.fuelButton}
                >
                  Gasolina
                </Button>
                <Button
                  mode={combustivel === 'etanol' ? 'contained' : 'outlined'}
                  onPress={() => setCombustivel('etanol')}
                  style={styles.fuelButton}
                >
                  Etanol
                </Button>
              </View>

              <View style={styles.calcButtonContainer}>
                <Button
                  mode="contained"
                  onPress={calcularEmissao}
                  style={[styles.calcButton, { backgroundColor: isCalculable ? '#87CE57' : '#ccc', width: '100%' }]}
                  disabled={!isCalculable}
                >
                  <MaterialIcons name="assignment" size={20} color="#fff" />
                </Button>
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  headerContainer: {
    width: "100%",
    height: "40%",
    backgroundColor: "#87CE57",
    borderBottomRightRadius: 150,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
    position: 'relative',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 21,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 50,
    textAlign: 'center',
  },
  helpButton: {
    position: 'absolute',
    top: -20,
    left:-185,
    backgroundColor: 'white', // Cor de fundo com transparênci
    
    borderRadius: 10, // torna o botão circular
    justifyContent: 'center', // centraliza o texto verticalmente
    alignItems: 'center', // centraliza o texto horizontalmente
    shadowColor: '#000', // cor da sombra
    shadowOffset: { width: 0, height: 2 }, // deslocamento da sombra
    shadowOpacity: 0.3, // opacidade da sombra
    shadowRadius: 3, // suavização da sombra
    elevation: 5, // elevação para Android
   
  },
  helpButtonLabel: {
    color: "#87CE57", // Cor do texto do botão
    justifyContent: 'center', // centraliza o texto verticalmente
    alignItems: 'center', // centraliza o texto horizontalmente
    marginLeft:10
  },
  calculatorContainer: {
    width: "100%",
    height: "60%",
    justifyContent: 'flex-start',
    padding: 16,
    position: "absolute",
    bottom: 75,
  },
  card: {
    padding: 20,
    marginTop: 16,
    borderRadius: 20,
    elevation: 5,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  resultContainer: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#87CE57',
    marginBottom: 16,
    alignItems: 'flex-end',
    width: '50%',
    marginLeft: 150,
  },
  result: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#87CE57',
    textAlign: "center",
    paddingRight: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 8,
  },
  fuelLabel: {
    marginVertical: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  calcButtonContainer: {
    marginTop: 16,
    justifyContent: 'center',
  },
  calcButton: {
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 200, // Ajuste a altura conforme necessário
    resizeMode: 'cover', // Mantém a proporção da imagem
    position: "absolute",
    top: 50,
  },
  volt: {
    position: 'absolute', // Torna o posicionamento absoluto
    top: 45,              // Posiciona o Pressable 10 unidades abaixo do topo da tela
    left: 5,             // Posiciona o Pressable 10 unidades à direita da borda esquerda
    padding: 10,          // Adiciona preenchimento interno
    borderRadius: 5,
    zIndex: 1  // Bordas arredondadas
  },
});

export default CarbonEmissionCalculator;
