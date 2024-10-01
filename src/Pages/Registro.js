import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';

// Componente para círculo de progresso com animação
const ProgressCircle = ({ isActive, isCompleted, label }) => {
  const animatedScale = new Animated.Value(1);

  const startAnimation = () => {
    Animated.spring(animatedScale, {
      toValue: isActive ? 1.2 : 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  if (isActive || isCompleted) {
    startAnimation();
  }

  return (
    <View style={styles.circleContainer}>
      <Animated.View style={[styles.circle, isCompleted && styles.circleCompleted, { transform: [{ scale: animatedScale }] }]}>
        {isCompleted && <Text style={styles.checkmark}>✓</Text>}
      </Animated.View>
      <Text style={[styles.circleLabel, isCompleted && styles.circleLabelCompleted]}>{label}</Text>
    </View>
  );
};

// Barra de progresso com transição suave
const ProgressBar = ({ progress }) => (
  <View style={styles.progressBarContainer}>
    {Array(4).fill(0).map((_, index) => (
      <React.Fragment key={index}>
        <ProgressCircle
          isActive={progress > index}
          isCompleted={progress >= index + 1}
          label={`Step ${index + 1}`}
        />
        {index < 3 && <View style={[styles.line, progress > index + 1 && styles.lineActive]} />}
      </React.Fragment>
    ))}
  </View>
);

export default function Registro() {
  const [name, setName] = useState('');
  const [progress, setProgress] = useState(1);

  const handleContinue = () => {
    if (name && progress < 4) {
      setProgress(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (progress > 1) {
      setProgress(prev => prev - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Barra de Progresso */}
      <ProgressBar progress={progress} />




      {progress == 1 &&
        <>
          {/* Rótulo do Formulário */}
          <Text style={styles.label}>Your Full Name</Text>

          {/* Campo de Entrada */}
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#A0A0A0"
          />

          {/* Botões Horizontais */}
          <View style={styles.buttonContainer}>
            {/* Botão Continuar */}
            <TouchableOpacity
              style={[styles.button, !name && styles.buttonDisabled]}
              onPress={handleContinue}
              disabled={!name}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            {/* Botão Voltar */}
            {progress > 1 && (
              <TouchableOpacity
                style={[styles.button, styles.backButton]}
                onPress={handleBack}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      }

      {progress == 2 &&
        <>
          {/* Rótulo do Formulário */}
          <Text style={styles.label}>Your Full Name</Text>

          {/* Campo de Entrada */}
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#A0A0A0"
          />
          {/* Campo de Entrada */}
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#A0A0A0"
          />

          {/* Botões Horizontais */}
          <View style={styles.buttonContainer}>
            {/* Botão Continuar */}
            <TouchableOpacity
              style={[styles.button, !name && styles.buttonDisabled]}
              onPress={handleContinue}
              disabled={!name}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            {/* Botão Voltar */}
            {progress > 1 && (
              <TouchableOpacity
                style={[styles.button, styles.backButton]}
                onPress={handleBack}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      }

      {progress == 3 &&
        <>
          {/* Rótulo do Formulário */}
          <Text style={styles.label}>Your Full Name</Text>

          {/* Campo de Entrada */}
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#A0A0A0"
          />
          {/* Campo de Entrada */}
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#A0A0A0"
          />
          {/* Campo de Entrada */}
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#A0A0A0"
          />

          {/* Botões Horizontais */}
          <View style={styles.buttonContainer}>
            {/* Botão Continuar */}
            <TouchableOpacity
              style={[styles.button, !name && styles.buttonDisabled]}
              onPress={handleContinue}
              disabled={!name}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            {/* Botão Voltar */}
            {progress > 1 && (
              <TouchableOpacity
                style={[styles.button, styles.backButton]}
                onPress={handleBack}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      }

      {progress == 4 &&
        <>
          {/* Rótulo do Formulário */}
          <Text style={styles.label}>Your Full Name</Text>

          {/* Campo de Entrada */}
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#A0A0A0"
          />
          {/* Campo de Entrada */}
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#A0A0A0"
          />
          {/* Campo de Entrada */}
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#A0A0A0"
          />
          {/* Campo de Entrada */}
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#A0A0A0"
          />

          {/* Botões Horizontais */}
          <View style={styles.buttonContainer}>
            {/* Botão Continuar */}
            <TouchableOpacity
              style={[styles.button, !name && styles.buttonDisabled]}
              onPress={handleContinue}
              disabled={!name}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            {/* Botão Voltar */}
            {progress > 1 && (
              <TouchableOpacity
                style={[styles.button, styles.backButton]}
                onPress={handleBack}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  circleContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
    borderWidth: 2,
    borderColor: '#D3D3D3',
  },
  circleCompleted: {
    backgroundColor: '#4CAF50', // Verde para círculos completados
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  line: {
    width: 40,
    height: 4,
    backgroundColor: '#D3D3D3',
    borderRadius: 2,
  },
  lineActive: {
    backgroundColor: '#4CAF50', // Verde para linha ativa
  },
  label: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 20,
    backgroundColor: '#F8F8F8',
    fontSize: 16,
    marginBottom: 30,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: 'green',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    backgroundColor: '#D3D3D3',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  circleLabel: {
    fontSize: 14,
    color: '#333',
  },
  circleLabelCompleted: {
    fontWeight: 'bold',
    color: '#4CAF50', // Verde para o rótulo de círculos completados
  },
});
