
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, TextInput, Provider as PaperProvider, Appbar, Text, Card, DefaultTheme } from 'react-native-paper';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';

const CarbonEmissionCalculator = () => {
  const [distancia, setDistancia] = useState('');
  const [consumo, setConsumo] = useState('');
  const [combustivel, setCombustivel] = useState('diesel');
  const [emissao, setEmissao] = useState(null);
  const [isCalculable, setIsCalculable] = useState(false);

  useEffect(() => {
    setIsCalculable(!!distancia && !!consumo);
  }, [distancia, consumo]);

  const calcularEmissao = () => {
    if (!distancia || !consumo) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const consumoDividido = consumo / 100;
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

    const emissaoCalculada = (distancia * consumoDividido * fatorEmissao).toFixed(2);
    setEmissao(emissaoCalculada);
    enviarDadosParaAPI(distancia, consumo, combustivel, emissaoCalculada);
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

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#87CE57',
      underlineColor: '#87CE57',
      text: '#000',
      placeholder: '#888',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Appbar.Header style={styles.header}>
          <Appbar.Content title="Calculadora de Emissão" />
          <Appbar.Action icon="information" onPress={() => Alert.alert('Ajuda', 'Informe a distância e o consumo para calcular a emissão de carbono.')} />
        </Appbar.Header>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.resultContainer}>
              <Text style={styles.result}>
                {emissao !== null ? `Emissão: ${emissao} kg CO2` : 'Resultado aqui'}
              </Text>
            </View>

            <TextInput
              label="Distância (km)"
              value={distancia}
              onChangeText={setDistancia}
              keyboardType="numeric"
              style={styles.input}
              activeUnderlineColor="#87CE57"
              selectionColor="#87CE57"
              mode="outlined"
            />

            <TextInput
              label="Consumo (L)"
              value={consumo}
              onChangeText={setConsumo}
              keyboardType="numeric"
              style={styles.input}
              activeUnderlineColor="#87CE57"
              selectionColor="#87CE57"
              mode="outlined"
            />

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

            <View style={[styles.calcButtonsContainer, { width: 60 , marginLeft:20 }]}>
              <View style={styles.row}>
                {/* Botões sem funcionalidade */}
                <Button mode="outlined" style={[styles.iconButton, { width: 60 }]}>
                  <MaterialIcons name="local-shipping" size={12} color="#87CE57" />
                </Button>
                <Button mode="outlined" style={[styles.iconButton, { width: 60 }]}>
                  <MaterialIcons name="eco" size={12} color="#87CE57" />
                </Button>

                {/* Botão de resultado */}
                <Button
                  mode={isCalculable ? 'contained' : 'outlined'}
                  onPress={isCalculable ? calcularEmissao : null}
                  style={[styles.calcButton, { backgroundColor: isCalculable ? '#87CE57' : '#ccc', width: 100 }]}
                  disabled={!isCalculable}
                >
                  <MaterialIcons name="assignment" size={20} color="#fff" />
                </Button>
              </View>
            </View>

          </Card.Content>
        </Card>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#87CE57',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#87CE57',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 8,
  },
  label: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  calcButtonsContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    borderRadius: 10,
    borderColor: '#87CE57',
    borderWidth: 1,
    backgroundColor: '#fff',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    marginRight: 8,
  },
  calcButton: {
    height: 90,
    borderRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  calcButtonText: {
    color: '#fff',
    marginLeft: 5,
  },
});

export default CarbonEmissionCalculator;
