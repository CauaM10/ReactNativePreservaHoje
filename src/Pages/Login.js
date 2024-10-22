import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,Pressable } from 'react-native';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import foto from '..//../assets/PreservaHj-risco.png';

// Componente Input com Ícone
const InputWithIcon = ({ iconName, placeholder, secureTextEntry, value, onChangeText, onIconPress, icon }) => {
    const [isFocused, setIsFocused] = useState(false); // Estado para o foco

    return (
        <View style={[styles.inputContainer, isFocused ? styles.inputContainerFocused : null]}>
            <Icon name={iconName} size={20} style={styles.icon} />
            <TextInput
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="black"
                style={styles.input}
                onFocus={() => setIsFocused(true)} // Quando o input é focado
                onBlur={() => setIsFocused(false)} // Quando o input perde foco
            />
            {icon && (
                <TouchableOpacity onPress={onIconPress}>
                    <Icon name={icon} size={20} style={styles.icon} />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default function Login({ navigation }) { // Recebe a prop de navegação
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/esconder a senha

    const { Login, error, setAction } = useContext(AuthContext);

    function RealizaLogin() {
        Login(email, senha);
    }
    
    return (
        <>
            <View style={styles.header}>
                <Image 
                    source={foto} // Substitua pela URL da sua imagem
                    style={styles.image}
                    resizeMode="contain" 
                />
            </View>
            <View style={styles.container}>
                {/* Título Criativo */}
                <Text style={styles.title}>Login</Text>
                <InputWithIcon
                    iconName="email"
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <InputWithIcon
                    iconName="lock"
                    placeholder="Password"
                    secureTextEntry={!showPassword} // Alterna entre ocultar e mostrar a senha
                    value={senha}
                    onChangeText={setSenha}
                    onIconPress={() => setShowPassword(!showPassword)} // Alterna o estado de exibição da senha
                    icon={showPassword ? "eye-off" : "eye"} // Altera o ícone baseado no estado
                />
                <View style={styles.forgot}>
                    <Text style={styles.forgotText}>Esqueceu a senha?</Text>
                </View>
                <TouchableOpacity style={styles.btnLogin} onPress={RealizaLogin}>
                    <Text style={styles.btnLoginText}>Login</Text>
                </TouchableOpacity>
                {error && (
                    <View style={styles.error}>
                        <Text style={styles.errorText}>Revise os campos. Tente novamente!</Text>
                    </View>
                )}
                {/* Mensagem de cadastro */}
                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Não tem uma conta ainda? </Text>
                    <TouchableOpacity >
                    <Pressable onPress={() => setAction('cadastro')}><Text style = {styles.signupLink} >Cadastre-se</Text></Pressable>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: "45%",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "#87CE57",
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 24, // Tamanho do texto do título
        color: "black", // Cor do texto
        marginBottom: 20, // Espaçamento abaixo do título
        textAlign: 'center', // Centraliza o texto
    },

    container: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "65%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FDFDFD",
        paddingHorizontal: 20,
        borderTopLeftRadius: 100,
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "90%",
        height: 50,
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
        marginTop: 20,
        paddingHorizontal: 10,
        borderColor: "#E4E7EB",
        borderWidth: 1,
    },

    inputContainerFocused: {
        borderColor: "#4CAF50", // Cor da borda quando o input está focado
    },

    input: {
        flex: 1,
        color: "black",
        fontSize: 18,
        paddingLeft: 10, // Espaciamento do texto
    },

    icon: {
        color: "black",
        marginRight: 10, // Espaçamento entre ícone e input
    },

    forgot: {
        width: "90%",
        marginTop: 10,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },

    forgotText: {
        color: "#4CAF50",
        fontWeight: "bold",
    },

    btnLogin: {
        width: "90%",
        height: "8%",
        marginTop: 10,
        backgroundColor: '#4CAF50', // Cor de fundo do botão
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopRightRadius: 0, // Arredondamento no canto superior direito
        borderBottomRightRadius: 10, // Arredondamento no canto inferior direito
        borderTopLeftRadius: 10, // Sem arredondamento no canto superior esquerdo
        borderBottomLeftRadius: 10, // Sem arredondamento no canto inferior esquerdo
        elevation: 3, // Sombra no Android
        shadowColor: '#000', // Sombra no iOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },

    btnLoginText: {
        color: 'white', // Cor do texto
        fontSize: 16, // Tamanho da fonte
        textAlign: 'center', // Alinhamento do texto
        fontWeight: "bold",
    },

    error: {
        width: "100%",
        height: 50,
        marginTop: 30,
    },

    errorText: {
        color: "white",
        textAlign: "center",
    },

    image: {
        width: '100%',
        height: 300, // Ajuste a altura conforme necessário
        resizeMode: 'cover', // Mantém a proporção da imagem
        marginBottom: 20, // Espaço entre a imagem e o título
        marginTop: 30, // Adiciona mais espaço acima da imagem
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
