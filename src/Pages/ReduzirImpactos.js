import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList} from 'react-native';
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";


const ReduzirImpactos = () => {

    const { setAction } = useContext(AuthContext);

    const places = [
        { id: 1, name: 'Reflorestamento', location: 'Pederneiras - SP', image: require('../../assets/Eucalipto.jpg'), pagina: "reflorestamento"},
        { id: 2, name: 'Reciclagem', location: 'Jáu - SP', image: require('../../assets/reciclagem.jpg') },
    ];

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Local" placeholderTextColor={'lightgray'}
            />
            <Text style={styles.headerText}>Popular Places</Text>

            <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterButtonText}>Most Viewed</Text>
            </TouchableOpacity>

            <View style={styles.placesContainer}>
                <FlatList
                    data={places}
                    horizontal
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            key={item.id}
                            style={styles.card}
                            
                           
                        >
                            <Image source={item.image} style={styles.image} />
                            <View style={styles.cardTextContainer}>
                                <Text style={styles.cardTitle}>{item.name}</Text>
                                <Text style={styles.cardLocation}>{item.location}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    contentContainerStyle={{ gap: 5 }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        top: 10,
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderRadius: 25,
        borderColor: "black",
        padding: 15,
        marginTop: 30,
        color: 'white'
    },
    headerText: {
        fontSize: 22,
        padding: 9,
        top: 30,
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
    filterButtonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    placesContainer: {
        width: "100%",
        top: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 20
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
    },

    image: {
        width: '100%',
        height: '100%',
        resizeMode: "cover",
        zIndex: -1
    },
    cardTextContainer: {
        width: "90%",
        position: "absolute",
        bottom: 15,
        left: 10,
        padding: 10,
        borderRadius: 5,
        zIndex: 1,
        backgroundColor: "black",
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    cardLocation: {
        fontSize: 14,
        color: '#666',
    },
});

export default ReduzirImpactos;
