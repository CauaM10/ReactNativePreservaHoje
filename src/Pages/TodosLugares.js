import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Pressable } from 'react-native';
import { AuthContext } from "../Context/AuthContext";
import Icone from '@expo/vector-icons/Ionicons';

import Ionicons from '@expo/vector-icons/Ionicons';

const ImpactReduction = () => {
    const { setAction} = useContext(AuthContext);
    const [lugares, setLugares] = useState([]); 
    const [loading, setLoading] = useState(true);


    const fetchsetLugares = async () => { 
        try {
            const response = await fetch('http://10.139.75.61:5001/api/Lugar/GetAllLugar', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            setLugares(json);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchsetLugares();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
        <Pressable onPress={() => setAction('reduzirimpactos')} style={styles.volt}>
          <Icone name="arrow-back" size={32} color="green" />
        </Pressable>
        <FlatList
                    data={lugares}
                    
                    keyExtractor={(item) => item.lugarId.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            
                        >
                            {item.foto ? (
                                <Image source={{ uri: item.foto }} style={styles.image} />
                            ) : (
                                <View style={styles.imagePlaceholder}><Text>No Image</Text></View>
                            )}
                            <View style={styles.placeInfo}>
                                
                            {item.objetivoLugar && <Text style={styles.placeObjective}> {item.objetivoLugar}</Text>}
                            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 3}}>
                            <Ionicons name="location-outline" style={styles.iconeLocalizacao} size={24} color="gray" />
                            {item.endereçoLugar && <Text style={styles.placeLocation}>  {item.endereçoLugar}</Text>}
                            </View>
                           
                                
                            </View>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={{ gap:10 }}
                />

        
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    locationIcon:{ 
        marginTop: 4,
        marginLeft: 9
    },
    iconeLocalizacao:{
        marginTop: 4,
        marginLeft: 9
    },
    placeInfo: {
        position: 'absolute',
        bottom: 0,
        left: 10,
        height: '20%',
        bottom: 40,
        right: 0,
        padding: 10,
        width: '90%',
        backgroundColor: "rgba(19, 19, 19, 0.82)",
        borderRadius: 15
    },
    placeLocation: {
        fontSize: 16,
        marginTop: 5,
        fontWeight: 'bold',
        color: 'gray',
    },
    placeObjective: {
        fontSize: 17,
        marginTop: 5,
        marginLeft: 10,
        fontWeight: 'bold',
        color: '#fff',
    },
    volt: {
        marginTop: 30
    },
    card: {
        top: 50,
        width: "100%",
        height: 250,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        position: 'relative', // Para que o 'placeInfo' possa ser posicionado relativamente a este contêiner
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: "cover",
    },
    imagePlaceholder: {
        width: '100%',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
    },
    placeInfo: {
        position: 'absolute', // Adiciona esta propriedade
        bottom: 0, // Para posicionar na parte inferior do cartão
        left: 10,
        height: '40%',
        bottom: 40,
        right: 0,
        padding: 10,
        width: '90%',
        backgroundColor: "rgba(19, 19, 19, 0.82)",
        borderRadius: 15
    },
    placeLocation: {
        fontSize: 16,
        marginTop: 5,
        fontWeight: 'bold',
        color: 'gray',
    },
    placeObjective: {
        fontSize: 17,
        marginTop: 5,
        marginLeft: 10,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default ImpactReduction; 
