import React, { useState, useEffect, useRef, useContext } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Animated, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Image, 
  Pressable
} from 'react-native';

import foto from '..//../assets/maoflor.png'
import { AuthContext } from '../Context/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';

// Componente de Seletor Independente
const DropdownSelector = ({ title, apiUrl, selectedOption, onSelect }) => {
  const [options, setOptions] = useState([]);
  const [marcaveiculo, setMarcaveiculo] = useState( " " )
  const [modeloVeiculo, setModeloVeiculo] = useState( " " )
  const [tipoCombustivel, setTipoCombustivel] = useState( " " )
  const [consumo, setConsumo] = useState( " " )
  const [hodometro, setHodometro] = useState( " " )
  const [motorista, setMotorista] = useState( " " )
  const [cpf, setCpf] = useState( "" );
  const [loading, setLoading] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownHeight = useRef(new Animated.Value(0)).current;
  const dropdownOpacity = useRef(new Animated.Value(0)).current;

  // Buscar opções da API quando o componente for montado
  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error('Erro ao buscar opções:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, [apiUrl]);

  // Função para mostrar/esconder o dropdown
  const toggleDropdown = () => {
    if (dropdownVisible) {
      Animated.parallel([
        Animated.timing(dropdownHeight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(dropdownOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start(() => setDropdownVisible(false));
    } else {
      setDropdownVisible(true);
      Animated.parallel([
        Animated.timing(dropdownHeight, {
          toValue: 150,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(dropdownOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.selectorTitle}>{title}</Text>
      <TouchableOpacity onPress={toggleDropdown} style={styles.inputField}>
        <Text style={styles.inputText}>
          {selectedOption 
            ? options.find(option => option.id === selectedOption)?.name || 
              options.find(option => option.id === selectedOption)?.title || 
              options.find(option => option.id === selectedOption)?.body
            : "Clique para selecionar uma opção"}
        </Text>
      </TouchableOpacity>
      {dropdownVisible && (
        <Animated.View style={[styles.dropdown, { height: dropdownHeight, opacity: dropdownOpacity }]}>
          <ScrollView>
            {options.map(option => (
              <TouchableOpacity 
                key={option.id} 
                style={[styles.optionButton, selectedOption === option.id && styles.optionButtonSelected]}
                onPress={() => {
                  onSelect(option.id);
                  toggleDropdown();
                }}
              >
                <Text style={styles.optionButtonText}>
                  {option.name || option.title || option.body}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
};

// Componente da Barra de Progresso
const ProgressCircle = ({ isActive, isCompleted, label }) => {
  return (
    <View style={styles.circleContainer}>
      <View style={[styles.circle, isCompleted ? styles.circleCompleted : (isActive ? styles.circleActive : styles.circleInactive)]}>
        {isCompleted && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={[styles.circleLabel, isCompleted && styles.circleLabelCompleted]}>
        {label}
      </Text>
    </View>
  );
};

const ProgressBar = ({ progress }) => (
  <View style={styles.progressBarContainer}>
    {['Veículo', 'Odômetro', 'Combustível', 'Motorista'].map((label, index) => (
      <React.Fragment key={index}>
        <ProgressCircle 
          isActive={progress > index} 
          isCompleted={progress >= index + 1} 
          label={label} 
        />
        {index < 3 && <View style={[styles.line, progress > index + 1 && styles.lineActive]} />}
      </React.Fragment>
    ))}
  </View>
);

// Tela do Formulário Principal
const FormScreen = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    step1: [null, null],
    step2: [null, null],
    step3: [null],
    step4: [null, null],
  });
  const [progress, setProgress] = useState(1);

  // Função para selecionar uma opção e atualizar o estado
  const handleSelect = (step, index, optionId) => {
    setSelectedOptions(prevState => {
      const newStepOptions = [...prevState[`step${step}`]];
      newStepOptions[index] = optionId;
      return { ...prevState, [`step${step}`]: newStepOptions };
    });
  };

  const handleContinue = () => {
    if (progress < 4) setProgress(prev => prev + 1);
  };

  const handleBack = () => {
    if (progress > 1) setProgress(prev => prev - 1);
  };


  const allOptionsSelected = selectedOptions[`step${progress}`].every(option => option !== null);
  const { setAction } = useContext(AuthContext);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
      <Pressable onPress={() => setAction('home')} style = {styles.volt}><Ionicons name="arrow-back" size={32} color="green" /></Pressable>
        {/* Título no topo */}
        <Text style={styles.headerTitle}>Registro de Veículo</Text>

        {/* Imagem no topo */}
        <Image 
          source={foto} // Substitua pela URL da sua imagem
          style={styles.image}
          resizeMode="contain" 
        />

        {/* Barra de Progresso - Centralizada */}
        <View style={styles.progressBarWrapper}>
          <ProgressBar progress={progress} />
        </View>

        {/* Seletor de cada etapa */}
        {progress === 1 && (
          <>
            <DropdownSelector
              title="Selecione a marca do  Veículo"
              apiUrl="https://jsonplaceholder.typicode.com/users"
              selectedOption={selectedOptions.step1[0]}
              onSelect={(id) => handleSelect(1, 0, id)}
            />
            <DropdownSelector
              title="Selecione o modelo "
              apiUrl="https://jsonplaceholder.typicode.com/users"
              selectedOption={selectedOptions.step1[1]}
              onSelect={(id) => handleSelect(1, 1, id)}
            />
          </>
        )}

        {progress === 2 && (
          <>
            <DropdownSelector
              title="tipo combustivel"
              apiUrl="https://jsonplaceholder.typicode.com/users"
              selectedOption={selectedOptions.step2[0]}
              onSelect={(id) => handleSelect(2, 0, id)}
            />
            <DropdownSelector
              title="Selecione o consumo"
              apiUrl="https://jsonplaceholder.typicode.com/users"
              selectedOption={selectedOptions.step2[1]}
              onSelect={(id) => handleSelect(2, 1, id)}
            />
          </>
        )}

        {progress === 3 && (
          <DropdownSelector
            title="Selecione o Odometro"
            apiUrl="https://jsonplaceholder.typicode.com/users"
            selectedOption={selectedOptions.step3[0]}
            onSelect={(id) => handleSelect(3, 0, id)}
          />
        )}

        {progress === 4 && (
          <>
            <DropdownSelector
              title="Selecione o Motorista"
              apiUrl="https://jsonplaceholder.typicode.com/users"
              selectedOption={selectedOptions.step4[0]}
              onSelect={(id) => handleSelect(4, 0, id)}
            />
            <DropdownSelector
              title="Selecione o cpf "
              apiUrl="https://jsonplaceholder.typicode.com/users"
              selectedOption={selectedOptions.step4[1]}
              onSelect={(id) => handleSelect(4, 1, id)}
            />
          </>
        )}

        {/* Botões de Navegação */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.continueButton, !allOptionsSelected && styles.continueButtonDisabled]} 
            onPress={handleContinue}
            disabled={!allOptionsSelected}
          >
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.backButton]} 
            onPress={handleBack}
            disabled={progress === 1}
          >
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'flex-start', // Alinha o conteúdo ao topo
    marginTop:50,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20, // Espaço vertical para o título
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 150, // Ajuste a altura conforme necessário
    resizeMode: 'cover', // Mantém a proporção da imagem
    marginBottom: 20, // Espaço entre a imagem e o título
    marginTop: 30, // Adiciona mais espaço acima da imagem
  },
  dropdownContainer: {
    marginBottom: 15,
  },
  selectorTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginTop: 5,
  },
  inputText: {
    fontSize: 16,
  },
  dropdown: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  optionButton: {
    padding: 10,
  },
  optionButtonSelected: {
    backgroundColor: '#ddd',
  },
  optionButtonText: {
    fontSize: 16,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centraliza a barra de progresso
    marginBottom: 20, // Aumenta o espaço na parte inferior da barra de progresso
  },
  progressBarWrapper: {
    alignItems: 'center', // Centraliza a barra de progresso
    width: '100%',
  },
  circleContainer: {
    alignItems: 'center',
  },
  circle: {
    width: 30, // Tamanho do círculo reduzido
    height: 30, // Tamanho do círculo reduzido
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleActive: {
    borderColor: '#28a745', // Verde
  },
  circleCompleted: {
    backgroundColor: '#28a745', // Verde
    borderColor: '#28a745', // Verde
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  circleLabel: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  circleLabelCompleted: {
    color: '#28a745', // Verde
  },
  line: {
    flex:1,
    width: 20, // Tamanho da linha ajustado
    height: 2,
    backgroundColor: '#ccc',
    marginBottom:10,
    marginHorizontal:2,
  },
  lineActive: {
    backgroundColor: '#28a745', // Verde
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40, // Aumenta o espaço entre os botões e os seletores
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1, // Ocupa igual espaço entre os botões
    marginHorizontal: 5, // Margem horizontal entre os botões
  },
  backButton: {
    backgroundColor: '#ccc',
  },
  continueButton: {
    backgroundColor: '#28a745', // Verde
  },
  continueButtonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    width: '100%', // Para que a imagem ocupe toda a largura disponível
    height: 150,   // Defina a altura da imagem
    marginBottom: 20, // Espaço abaixo da imagem
  },
  volt: {
    position: 'absolute', // Torna o posicionamento absoluto
    top: 10,              // Posiciona o Pressable 10 unidades abaixo do topo da tela
    left: 0,             // Posiciona o Pressable 10 unidades à direita da borda esquerda
    padding: 10,          // Adiciona preenchimento interno
    borderRadius: 5,      // Bordas arredondadas
  },
});

export default FormScreen;
