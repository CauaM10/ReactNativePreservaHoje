import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';




export default function Login({}) {




    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const { Login, error, setCadastro } = useContext(AuthContext);

    function RealizaLogin() {
       Login(email, senha);
    }

    return (
        <ScrollView contentContainerStyle={css.container}>
  
        
            
            <TextInput
                inputMode="email"
                placeholder="Email"
                style={css.input}
                value={email}
                onChangeText={(digitado) => setEmail(digitado)}
                placeholderTextColor="white"
            />
            <TextInput
                inputMode="text"
                placeholder="Password"
                secureTextEntry={true}
                style={css.input}
                value={senha}
                onChangeText={(digitado) => setSenha(digitado)}
                placeholderTextColor="white"
            />
            <View style={css.forgot}>
                <Text style={css.forgotText}>Esqueceu a senha?</Text>
            </View>
            <TouchableOpacity style={css.btnLogin} onPress={RealizaLogin}>
                <Text style={css.btnLoginText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={css.btnCadastro} on={ () => setCadastro( true ) }>
                <Text style={css.btnCadastroText}>Cadastre-se</Text>
            </TouchableOpacity>
            {error &&
                <View style={css.error}>
                    <Text style={css.errorText}>Revise os campos. Tente novamente!</Text>
                </View>
            }
        </ScrollView>
    )
}

const css = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "#191919"
    },
    logo: {
        width: "60%",
        resizeMode: "contain"
    },
    input: {
        width: "90%",
        height: 50,
        borderRadius: 10,
        marginBottom: 15,
        padding: 15,
        backgroundColor: "#262626",
        color: "white"
    },
    forgot: {
        width: "90%",
        marginTop: 10,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    forgotText: {
        color: "#0195fd",
        fontWeight: "bold"
    },
    btnLogin: {
        width: "90%",
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 30,
        backgroundColor: "#0195fd"
    },
    btnLoginText: {
        color: "white",
        lineHeight: 45,
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold"
    },
    btnCadastro: {
        width: "90%",
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 15,
        backgroundColor: "#262626"
    },
    btnCadastroText: {
        color: "white",
        lineHeight: 45,
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold"
    },
    error: {
        width: "100%",
        height: 50,
        marginTop: 30
    },
    errorText: {
        color: "white",
        textAlign: "center"
    },
    image:{
        width: '100%', // Para que a imagem ocupe toda a largura disponível
        height: 150,   // Defina a altura da imagem
        marginBottom: 20, // Espaço abaixo da imagem
    }
});