import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Pressable,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import React, { useContext, useState, useRef } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

export default function Cadastro() {
  const { setAction } = useContext(AuthContext);
  const [emailEmpresa, setEmail] = useState("");
  const [telefoneEmpresa, setTelefone] = useState("");
  const [cnpjEmpresa, setCnpj] = useState("");
  const [nomeEmpresa, setNome] = useState("");
  const [senhaEmpresa, setSenha] = useState("");
  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const top = useRef(new Animated.Value(15)).current;

  const subirLabel = () => {
    Animated.timing(top, {
      toValue: -12,
      duration: 200,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start();
  };

  const descerLabel = () => {
    Animated.timing(top, {
      toValue: 15,
      duration: 200,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start();
  };

  const validateInputs = () => {
    if (!nomeEmpresa || !emailEmpresa || !telefoneEmpresa || !cnpjEmpresa || !senhaEmpresa) {
      setErro("Todos os campos são obrigatórios.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailEmpresa)) {
      setErro("Email inválido.");
      return false;
    }
    if (senhaEmpresa.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return false;
    }
    
    /*
    const cnpjRegex = /^(\d{2})(\d{5})(\d{4})$/;
    if (!cnpjRegex.test(cnpj)) {
      setErro("CNPJ inválido. Use o formato xx.xxx.xxx/xxxx-xx");
      return false;
    }
    */
  };

  const checkPasswordStrength = (senhaEmpresa) => {
    const strongPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;
    const mediumPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}/;

    let strengthValue = 0;

    if (strongPassword.test(senhaEmpresa)) {
      strengthValue = 3; // Forte
    } else if (mediumPassword.test(senhaEmpresa)) {
      strengthValue = 2; // Média
    } else if (senhaEmpresa.length > 0) {
      strengthValue = 1; // Fraca
    }

    setStrength(strengthValue);
    animateStrengthBar(strengthValue);
  };

  const animateStrengthBar = (strengthValue) => {
    const width = strengthValue === 3 ? 100 : strengthValue === 2 ? 50 : strengthValue === 1 ? 33 : 0;
    Animated.timing(animatedWidth, {
      toValue: width,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const formatCNPJ = (text) => {
    // Remove tudo que não é dígito
    const onlyDigits = text.replace(/\D/g, '');
    // Aplica a formatação
    if (onlyDigits.length <= 14) {
      const formattedCNPJ = onlyDigits.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      setCnpj(formattedCNPJ);
    }
  };

  const formatTelefone = (text) => {
    // Remove tudo que não é dígito
    const onlyDigits = text.replace(/\D/g, '');
    // Aplica a formatação
    if (onlyDigits.length <= 11) {
      const formattedTelefone = onlyDigits.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      setTelefone(formattedTelefone);
    }
  };

  async function Cadastro() {


    await fetch('http://10.139.75.80:5001/api/CadastroEmpresa/CreateEmpresa', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        nomeEmpresa: nomeEmpresa,
        cnpjEmpresa: cnpjEmpresa,
        telefoneEmpresa: telefoneEmpresa,
        emailEmpresa: emailEmpresa,
        senhaEmpresa: senhaEmpresa
      })
    })
      .then(res => res.json())
      .then(json => {
        setSucesso(!!json.cadastroEmpresaId);
        setErro(!json.cadastroEmpresaId);
      })
      .catch(() => setErro("Erro ao cadastrar. Tente novamente."));
  }

  const renderStrengthCriteria = () => {
    const criteria = [
      { text: "8 caracteres", met: senhaEmpresa.length >= 8 },
      { text: "1 letra maiúscula", met: /[A-Z]/.test(senhaEmpresa) },
      { text: "1 letra minúscula", met: /[a-z]/.test(senhaEmpresa) },
      { text: "1 número", met: /\d/.test(senhaEmpresa) },
      { text: "1 caractere especial", met: /[@$!%*?&]/.test(senhaEmpresa) },
    ];
    
    return (
      <Text style={{ fontSize: 14, textAlign: 'center', marginVertical: 10 }}>
        {criteria.map((criterion, index) => (
          <Text
            key={index}
            style={{
              color: criterion.met ? 'green' : 'black',
              textDecorationLine: criterion.met ? 'line-through' : 'none',
            }}
          >
            {criterion.text}{index < criteria.length - 1 ? ', ' : ''}
          </Text>
        ))}
      </Text>
    );
  };

  const renderStrengthBar = () => {
    let backgroundColor;
    let width;

    if (strength === 3) {
      backgroundColor = 'green';
      width = '100%'; // Preencher toda a barra
    } else if (strength === 2) {
      backgroundColor = 'yellow';
      width = '50%'; // Preencher metade da barra
    } else if (strength === 1) {
      backgroundColor = 'red';
      width = '33%'; // Preencher um terço da barra
    } else {
      backgroundColor = 'orange';
      width = '0%'; // Sem preenchimento
    }

    return (
      <View style={css.strengthContainer}>
        <View style={[css.strengthBar, { width: '100%', backgroundColor: 'lightgrey' }]}>
          <Animated.View style={[css.filledBar, {
            width: animatedWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }), backgroundColor
          }]} />
        </View>
        <Text style={[css.strengthLabel, { color: strength === 3 ? 'green' : strength === 2 ? 'yellow' : strength === 1 ? 'red' : 'black' }]}>
          {strength === 3 ? "Forte" : strength === 2 ? "Média" : strength === 1 ? "Fraca" : "Muito Fraca"}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={css.header}>
            <Pressable onPress={() => setAction('home')} style={css.volt}>
              <Ionicons name="arrow-back" size={32} color="black" />
            </Pressable>
            <Text style={css.title}>Cadastro</Text>
          </View>
          <View style={css.container}>
            {sucesso ? (
              <>
              <Feather name="check-circle" size={130} color="#87CE57" />
              <Text style={{color:'#87CE57', fontWeight: 'bold', marginTop: 15, fontSize: 18}}>PARABÉNS!</Text>
                <Text style={{marginTop: 15}}>Cadastro realizado com sucesso!</Text>
                <Text style={{marginTop: 5}}>Aproveite todos os benefícios e recursos que oferecemos.</Text>
                <View>
                <TouchableOpacity style={{ backgroundColor:'#87CE57', marginTop: 20, width: 200, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', }}   onPress={() => setSucesso(false)} ><Text style={{color: '#fff' , fontWeight: 'bold', fontSize: 15}}>Fechar</Text></TouchableOpacity>
                </View>
              
              </>
            ) : (
              <>
                {/* Input Nome */}
                <View style={css.inputContainer(activeInput === 'nome')}>
                  <Animated.Text style={[css.label, { top: activeInput === "nome" || nomeEmpresa ? top : 15 }]}>Nome</Animated.Text>
                  <Ionicons name="person" size={20} color="black" style={css.icon} />
                  <TextInput
                    style={css.input}
                    TextInput={nomeEmpresa}
                    onChangeText={(text) => setNome(text)}
                    onFocus={() => { setActiveInput('nome'); subirLabel(); }}
                    onBlur={() => { setActiveInput(null); }}
                    onEndEditing={() => { if (!nomeEmpresa) descerLabel(); }}
                  />
                </View>

                {/* Input Email */}
                <View style={css.inputContainer(activeInput === 'email')}>
                  <Animated.Text style={[css.label, { top: activeInput === "email" || emailEmpresa ? top : 15 }]}>Email</Animated.Text>
                  <Ionicons name="mail" size={20} color="black" style={css.icon} />
                  <TextInput
                    style={css.input}
                    TextInput={emailEmpresa}
                    onChangeText={(text) => setEmail(text)}
                    onFocus={() => { setActiveInput('email'); subirLabel(); }}
                    onBlur={() => { setActiveInput(null); }}
                    onEndEditing={() => { if (!emailEmpresa) descerLabel(); }}
                    keyboardType="email-address"
                  />
                </View>

                {/* Input Telefone */}
                <View style={css.inputContainer(activeInput === 'telefone')}>
                  <Animated.Text style={[css.label, { top: activeInput === "telefone" || telefoneEmpresa ? top : 15 }]}>Telefone</Animated.Text>
                  <Ionicons name="call" size={20} color="black" style={css.icon} />
                  <TextInput
                    style={css.input}
                    TextInput={telefoneEmpresa}
                    onChangeText={formatTelefone}
                    onFocus={() => { setActiveInput('telefone'); subirLabel(); }}
                    onBlur={() => { setActiveInput(null); }}
                    onEndEditing={() => { if (!telefoneEmpresa) descerLabel(); }}
                    keyboardType="phone-pad"
                    maxLength={15} // Limitar a quantidade de caracteres
                  />
                </View>

                {/* Input CNPJ */}
                <View style={css.inputContainer(activeInput === 'cnpj')}>
                  <Animated.Text style={[css.label, { top: activeInput === "cnpj" || cnpjEmpresa ? top : 15 }]}>CNPJ</Animated.Text>
                  <Ionicons name="business" size={20} color="black" style={css.icon} />
                  <TextInput
                    style={css.input}
                    TextInput={cnpjEmpresa}
                    onChangeText={formatCNPJ}
                    onFocus={() => { setActiveInput('cnpj'); subirLabel(); }}
                    onBlur={() => { setActiveInput(null); }}
                    onEndEditing={() => { if (!cnpjEmpresa) descerLabel(); }}
                    maxLength={18} // Limitar a quantidade de caracteres
                  />
                </View>

                {/* Input Senha */}
                <View style={css.inputContainer(activeInput === 'senha')}>
                  <Animated.Text style={[css.label, { top: activeInput === "senha" || senhaEmpresa ? top : 15 }]}>Senha</Animated.Text>
                  <Ionicons name="lock-closed" size={20} color="black" style={css.icon} />
                  <TextInput
                    style={css.input}
                    TextInput={senhaEmpresa}
                    onChangeText={(text) => {
                      setSenha(text);
                      checkPasswordStrength(text);
                    }}
                    onFocus={() => { setActiveInput('senha'); subirLabel(); }}
                    onBlur={() => { setActiveInput(null); }}
                    onEndEditing={() => { if (!senhaEmpresa) descerLabel(); }}
                    secureTextEntry={!showPassword}
                  />
                  <Pressable onPress={() => setShowPassword(!showPassword)} style={css.eyeIcon}>
                    <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="black" />
                  </Pressable>
                </View>

                {/* Barra de Progresso */}
                {strength > 0 && renderStrengthBar()}
                {strength > 0 && renderStrengthCriteria()}

                <TouchableOpacity style={css.btnCadastrar} onPress={Cadastro}>
                  <Text style={css.btnCadastrarText}>Cadastrar</Text>
                </TouchableOpacity>

                {erro && (
                  <View style={css.erro}>
                    <Text style={css.erroText}>{erro}</Text>
                  </View>
                )}
              </>
            )}

          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const css = StyleSheet.create({
  header: {
    width: "100%",
    height: "45%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#87CE57",
    justifyContent: 'center',
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    position: "absolute",
    top: 50,
  },
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "85%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDFDFD",
    paddingHorizontal: 20,
    borderTopLeftRadius: 100,
  },
  inputContainer: (isActive) => ({
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: isActive ? "green" : "#E4E7EB",
    borderWidth: 1,
    paddingLeft: 28,
  }),
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 35,
    paddingHorizontal: 8,
  },
  icon: {
    position: "absolute",
    top: 15,
    left: 10,
  },
  input: {
    flex: 1,
    height: 50,
    padding: 15,
    borderRadius: 10,
    color: "black",
  },
  eyeIcon: {
    padding: 15,
  },
  btnCadastrar: {
    width: "90%",
    height: 45,
    marginTop: 10,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  btnCadastrarText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: "bold",
  },
  erro: {
    width: "100%",
    height: 50,
    marginTop: 30,
  },
  erroText: {
    color: "red",
    textAlign: "center",
  },
  volt: {
    position: 'absolute',
    top: 40,
    left: 0,
    padding: 10,
    borderRadius: 5,
  },
  strengthContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '90%',
    marginTop: 10,
  },
  strengthBar: {
    height: 10,
    borderRadius: 5,
    marginBottom: 5,
    width: 250, // Tamanho fixo da barra de progresso
    backgroundColor: 'lightgrey', // Cor da barra de fundo
  },
  filledBar: {
    height: '100%',
    borderRadius: 5,
  },
  strengthLabel: {
    fontWeight: 'bold',
  },
  criteriaContainer: {
    width: '90%',
    marginTop: 10,
  },
  criteriaText: {
    fontSize: 14,
  },
  metCriteria: {
    color: 'green',
  },
});
