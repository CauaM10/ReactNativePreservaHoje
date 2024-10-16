import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../Context/AuthContext';

export default function Inserir() {

  const { setCadastro } = useContext (AuthContext)
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("")
  const [nome, setNome] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, seterro] = useState(false)
  const [sucesso, setsucesso] = useState(falso);

  async function Cadastro() {
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
  }

  return (
    <ScrollView contentContainerStyle={css.container}>
      {sucesso ?
        <>
          <Text style={css.text}> Obrigado por se cadastrar. Seu cadastro foi realizado com sucesso!!</Text>
          <Button title="Novo Usuario" onPress={() => setsucesso(false)} />
        </>
        :
        <>
          <TextInput
            inputMode="text"
            placeholder="name"
            style={css.input}
            value={nome}
            onChangeText={(digitado) => setNome(digitado)}
            placeholderTextColor="white"
          />
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
            placeholder="telefone"
            style={css.input}
            value={telefone}
            onChangeText={(digitado) => setTelefone(digitado)}
            placeholderTextColor="white"
          />
            <TextInput
            inputMode="password"
            placeholder="senha"
            style={css.input}
            value={senha}
            onChangeText={(digitado) => setSenha(digitado)}
            placeholderTextColor="white"
          />
          <TouchableOpacity style={css.btnCadastrar} onPress={Cadastro}>
            <Text style={css.btnCadastrarText}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCadastro( false ) } style={css.btnLogin}><Text style={css.btnLoginText}>VOLTAR PARA O LOGIN</Text></TouchableOpacity>
          {erro &&
            <View style={css.erro}>
              <Text style={css.erroText}>Revise os campos. Tente novamente!</Text>
            </View>
          }
        </>
      }
    </ScrollView>
  )
}

const css = StyleSheet.create({
  container: {
    backgroundColor: "#191919",
    flexGrow: 1,
    color: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white"
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
  btnCadastrar: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#0195fd"
  },
  btnCadastrarText: {
    color: "white",
    lineHeight: 45,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold"
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
  btnLogin: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
    backgroundColor: "#262626"
  },
  btnLoginText: {
    color: "white",
    lineHeight: 45,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold"
  },
})