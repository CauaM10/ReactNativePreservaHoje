import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import Icone from '@expo/vector-icons/Ionicons';
import { AuthContext } from "../Context/AuthContext";
import Ionicons from '@expo/vector-icons/Ionicons';


const LugarDetalhes = ({ id }) => {
  const { setAction } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lugares, setLugares] = useState([]);

  const getLugar = async () => {
    try {

      const response = await fetch('http://10.139.75.80:5001/api/Lugar/GetLugarId/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      setLugares(json);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLugar();
  }, [getLugar]);

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  if (error) {
    return <Text>Erro: {error}</Text>;
  }

  const item = lugares;

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Pressable onPress={() => setAction('reduzirimpactos')} style={styles.volt}>
          <Icone name="arrow-back" size={32} color="green" />
        </Pressable>
        <View
          style={styles.card}
           
        >
          {item.foto ? (
            <Image source={{ uri: item.foto }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}><Text>No Image</Text></View>
          )}
          <View style={styles.placeInfo}>

            {item.objetivoLugar && <Text style={styles.placeObjective}> {item.objetivoLugar}</Text>}
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 3 }}>
              <Ionicons name="location-outline" style={styles.iconeLocalizacao} size={24} color="gray" />
              {item.endereçoLugar && <Text style={styles.placeLocation}>  {item.endereçoLugar}</Text>}
            </View>
          </View>
        </View>
        <View style={{top: 55}}>
          <Text style={{left: 38, fontWeight: "bold"}}>Detalhes</Text>
          <Text style={{left: 30, textAlign:"justify", width: "85%", top: 30}}>{item.detalhesLugar}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.botao}><Text style={{color: "white", fontWeight: "bold"}}>Ajude o Projeto</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  
  volt: {
    marginLeft: 5,
    marginTop: 30
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: "cover",
  }, 
  iconeLocalizacao:{
    left: 10,
    top: 5
  },
  placeInfo: {
    position: 'absolute', // Adiciona esta propriedade
    left: 17,
    height: '23%',
    bottom: 40,
    right: 0,
    padding: 10,
    width: '90%',
    backgroundColor: "rgba(19, 19, 19, 0.82)",
    borderRadius: 15
  },
  placeLocation: {
    fontSize: 16,
    marginTop: 8,
    left: 5,
    fontWeight: 'bold',
    color: 'gray',
  },
  placeObjective: {
    fontSize: 17,
    marginTop: 13,
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    width: 355,
    height: 440,
    left: 28,
    top: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    position: 'relative', // Para que o 'placeInfo' possa ser posicionado relativamente a este contêiner
  },
  botao:{
    width: "86%",
    height: 55,
    top: 90,
    left: 25,
    backgroundColor: '#87CE57',
    borderRadius: 10,
    marginTop: 100,
    alignItems: "center",
    padding: 20
  }
});

export default LugarDetalhes;
