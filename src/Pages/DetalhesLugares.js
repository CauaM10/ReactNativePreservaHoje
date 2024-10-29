import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Pressable, Image } from 'react-native';
import { AuthContext } from "../Context/AuthContext";
import Ionicons from '@expo/vector-icons/Ionicons';

function DetalhesLugares(id) {

  const { setAction } = useContext(AuthContext);
  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getLugar = async () => {
    try {
      const response = await fetch('http://10.139.75.61:5251/api/Lugar/GetLugarId/' + id, {
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
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const item = lugares;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
        </TouchableOpacity>
        <Pressable onPress={() => setAction('reduzirimpactos')} style={styles.volt}>
          <Ionicons name="arrow-back" size={32} color="green" />
        </Pressable>
        <Image source={item.image} style={styles.image} />
      </View>
    </View>
  )};
 
const styles = StyleSheet.create({
    
});

export default DetalhesLugares;