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
    Keyboard,
    Image
} from 'react-native';
import React, { useContext, useState, useRef } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import foto from '..//../assets/PreservaHj-risco.png';

export default function Login({ navigation }) {
    const { Login, setAction } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setErro] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [activeInput, setActiveInput] = useState(null);

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
        if (!email || !senha) {
            setErro("Todos os campos são obrigatórios.");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErro("Email inválido.");
            return false;
        }
        if (senha.length < 6) {
            setErro("A senha deve ter pelo menos 6 caracteres.");
            return false;
        }
        return true;
    };

    function RealizaLogin() {
        Login(email, senha);
    }

    return (

        <>

            <View style={css.header}>
                <Image
                    source={foto} // Substitua pela URL da sua imagem
                    style={css.image}
                    resizeMode="contain"
                />
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={0}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1 }}>

                        <View style={css.container}>
                            <Text style={css.title}>Login</Text>
                            <View style={css.inputContainer(activeInput === 'email')}>
                                <Animated.Text style={[css.label, { top: activeInput === "email" || email ? top : 15 }]}>Email</Animated.Text>
                                <Ionicons name="mail" size={20} color="black" style={css.icon} />
                                <TextInput
                                    style={css.input}
                                    value={email}
                                    onChangeText={setEmail}
                                    onFocus={() => { setActiveInput('email'); subirLabel(); }}
                                    onBlur={() => { setActiveInput(null); }}
                                    onEndEditing={() => { if (!email) descerLabel(); }}
                                    keyboardType="email-address"
                                />
                            </View>

                            <View style={css.inputContainer(activeInput === 'senha')}>
                                <Animated.Text style={[css.label, { top: activeInput === "senha" || senha ? top : 15 }]}>Senha</Animated.Text>
                                <Ionicons name="lock-closed" size={20} color="black" style={css.icon} />
                                <TextInput
                                    style={css.input}
                                    value={senha}
                                    onChangeText={setSenha}
                                    onFocus={() => { setActiveInput('senha'); subirLabel(); }}
                                    onBlur={() => { setActiveInput(null); }}
                                    onEndEditing={() => { if (!senha) descerLabel(); }}
                                    secureTextEntry={!showPassword}
                                />
                                <Pressable onPress={() => setShowPassword(!showPassword)} style={css.eyeIcon}>
                                    <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="black" />
                                </Pressable>
                            </View>

                            <TouchableOpacity style={css.btnLogin} onPress={RealizaLogin}>
                                <Text style={css.btnLoginText}>Login</Text>
                            </TouchableOpacity>
                            {error && (
                                <View style={css.error}>
                                    <Text style={css.errorText}>Revise os campos. Tente novamente!</Text>
                                </View>
                            )}
                            <View style={css.signupContainer}>
                                <Text style={css.signupText}>Não tem uma conta ainda? </Text>
                                <TouchableOpacity >
                                    <Pressable onPress={() => setAction('cadastro')}><Text style={css.signupLink} >Cadastre-se</Text></Pressable>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        </>
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
        fontSize: 24, // Tamanho do texto do título
        color: "black", // Cor do texto
        marginBottom: 40, // Espaçamento abaixo do título
        textAlign: 'center', // Centraliza o texto
    },
    container: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "70%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FDFDFD",
        paddingHorizontal: 20,
        borderTopLeftRadius: 80,
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
    image: {
        width: '100%',
        height: 300, // Ajuste a altura conforme necessário
        resizeMode: 'cover', // Mantém a proporção da imagem
        marginBottom: 20, // Espaço entre a imagem e o título
        marginTop: 30, // Adiciona mais espaço acima da imagem
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
    btnLogin: {
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
    btnLoginText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: "bold",
    },
    error: {
        width: "100%",
        height: 50,
        marginTop: 30,
    },
    errorText: {
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
    signupContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },

    signupText: {
        color: "black",
    },

    signupLink: {
        color: "#4CAF50",
        fontWeight: "bold",
    },
});

