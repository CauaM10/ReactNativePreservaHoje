import { ScrollView, TextInput, StyleSheet, TouchableOpacity, Text, View, KeyboardAvoidingView, Button, } from "react-native";
import React, { useContext, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';

export default function Registro() {



    const [odometro, setOdometro] = useState("");
    const [marcaveiculo, setMarcaVeiculo] = useState("");
    const [modeloveiculo, setModeloVeiculo] = useState("");
    const [combustivel, setCombustivel] = useState("");
    const [pesocarga, setPesoCarga] = useState("");
    const [nomecondutor, setNomeCondutor] = useState("");

    /*  async function Cadastro() {
          await fetch( 'http://10.139.75.32:5251/api/Usuarios/CreateUsuario', {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              usuarioNome: nome,
              usuarioEmail: email,
              usuarioTelefone: telefone,
              usuarioSenha: senha
            })
          })
            .then(res => res.json())
            .then(json => {
              setsucesso((json.usuarioId) ? true : false);
              seterro((json.usuarioId) ? false : true);
            })
            .catch(err => seterro(true))
        }*/

    return (
        <>
            <View style={css.header}>
                <Text style={css.headerText}> PreservaHoje </Text>

                <Text style={css.headerText2}> Registrar Veiculos</Text>



            </View>
            <ScrollView style={css.container} contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
                <KeyboardAvoidingView behavior="padding" style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                    <TextInput
                        inputMode="text"
                        placeholder="Odometro(Atual)"
                        style={css.input}
                        value={odometro}
                        onChangeText={(digitado) => setOdometro(digitado)}
                        placeholderTextColor="black"
                    />
                    <TextInput
                        inputMode="text"
                        placeholder="Marca do Veiculo"
                        style={css.input}
                        value={marcaveiculo}
                        onChangeText={(digitado) => setMarcaVeiculo(digitado)}
                        placeholderTextColor="black"
                    />
                    <TextInput
                        inputMode="text"
                        placeholder="Modelo do Veiculo"
                        style={css.input}
                        value={modeloveiculo}
                        onChangeText={(digitado) => setModeloVeiculo(digitado)}
                        placeholderTextColor="black"
                    />
                    <TextInput
                        inputMode="text"
                        placeholder="Combustivel"
                        style={css.input}
                        value={combustivel}
                        onChangeText={(digitado) => setCombustivel(digitado)}
                        placeholderTextColor="black"
                    />
                    <TextInput
                        inputMode="text"
                        placeholder="Peso Maximo de Carga"
                        style={css.input}
                        value={pesocarga}
                        onChangeText={(digitado) => setPesoCarga(digitado)}
                        placeholderTextColor="black"
                    />
                    <TextInput
                        inputMode="text"
                        placeholder="Nome do Condutor"
                        style={css.input}
                        value={nomecondutor}
                        onChangeText={(digitado) => setNomeCondutor(digitado)}
                        placeholderTextColor="black"
                    />
                    <LinearGradient  colors={['#87CE57', '#98E28B']} style={css.btnCadastrar} /*onPress={Cadastro}*/>
                        <Text style={css.btnCadastrarText}>Finalizar</Text>
                    </LinearGradient>
                </KeyboardAvoidingView>

        
            </ScrollView>
        </>
    )
}


const css = StyleSheet.create({
    header: {
        width: "100%",
        height: "30%",
        backgroundColor: "white",
        justifyContent: "center",
        top: 0,
        position: "absolute",
        zIndex: 1
    },
    headerText: {
        color: "black",
        fontSize: 20,
        textAlign:"right",
        marginRight:10,
    },
    headerText2: {
        color: "black",
        fontSize: 20,
        marginLeft:20
     
    },
    container: {
        width: "100%",
        height: "80%",
        position: "absolute",
        backgroundColor: "white",
        paddingVertical: 25,
        color: "black",
        bottom: 0,
        zIndex: 2
    },
    text: {
        color: "black"
    },
    input: {
        width: "90%",
        height: 50,
        borderBottomWidth: 1, // define a largura da borda na parte inferior
        borderBottomColor: 'black', // define a cor da borda
        marginBottom: 20,
        padding: 15,
        backgroundColor: "white",
        color: "black",

    },

    btnCadastrar: {
        width: "90%",
        height: 55,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 5,
        backgroundColor: "#0195fd"
    },
    btnCadastrarText: {
        color: "white",
        lineHeight: 45,
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold",
        marginTop:3
    },


    erro: {
        width: "100%",
        height: 50,
        marginTop: 30
    },
    erroText: {
        color: "white",
        textAlign: "center"
    },




})