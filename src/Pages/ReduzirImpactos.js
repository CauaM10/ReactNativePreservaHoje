import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, FlatList, Pressable } from 'react-native';
import { AuthContext } from "../Context/AuthContext";
import Icone from '@expo/vector-icons/Ionicons';
import Ionicons from '@expo/vector-icons/Ionicons';


const ReduzirImpactos = () => {
    const { setAction, setGlobalId } = useContext(AuthContext);
    const [lugares, setLugares] = useState([]);
    const [loading, setLoading] = useState(true);

    const getLugar = async () => {
        try {
            const response = await fetch('http://10.139.75.86:5001/api/Lugar/GetAllLugar', {
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
        getLugar();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => setAction('home')} style={styles.volt}>
                    <Icone name="arrow-back" size={42} color="green" />
                </Pressable>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Local" placeholderTextColor={'lightgray'}
            />
            <Text style={styles.headerText}>Projetos Sustentáveis</Text>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.filterButtonText}>Mais Vistos</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setAction('TodosLugares'); }} style={styles.filterButton2}>
                    <Text style={styles.filterButtonText}>Ver Todos</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.placesContainer}>
                <FlatList
                    data={lugares}
                    horizontal
                    keyExtractor={(item) => item.lugarId.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => { setGlobalId( item.lugarId ); setAction('DetalhesLugares'); }}
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
                    contentContainerStyle={{ gap: 5 }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    volt: {
        marginTop: 30,
    },
    iconeLocalizacao:{
        marginTop: 4,
        marginLeft: 9
    },

    input: {
        width: "100%",
        height: 50,
        
        borderWidth: 1,
        borderRadius: 25,
        borderColor: "black",
        padding: 15,
        marginTop: 25,
        color: 'white',
    },
    headerText: {
        fontSize: 22,
        padding: 9,
        top: 20,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 40,
    },
    filterButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginBottom: 15,
    },    
    filterButton2: {
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginLeft: 10,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginBottom: 15,
    },
    filterButtonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    placesContainer: {
        width: "100%",
        top: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 20,
    },
    card: {
        width: 250,
        height: 450,
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
});

export default ReduzirImpactos;
