import { Link } from "@react-navigation/native";
import { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from "../Context/AuthContext";


export default function Inicial({navigation}) {

    const { setAction } = useContext(AuthContext);

    const data = [
        { id: '1', title: 'Sobre Nós', icon: 'arrow-up-bold-circle-outline', pagina: "sobre"},
        { id: '2', title: 'Relatório', icon: 'file-chart' },
        { id: '3', title: 'Frota', icon: 'truck-delivery',pagina: "TelaFrota" },
        { id: '4', title: 'Reduzir impactos', icon: 'cart-outline' },
        { id: '5', title: 'Registrar Veículo', icon: 'book-open-page-variant' , pagina: "registro"},
        { id: '6', title: 'Calculo Manual', icon: 'calculator' },
    ];

    return (
        <View style={{ flex: 1, }}>
            <View style={style.header}>
                <Text style={style.headerText}> PreservaHoje </Text>
            </View>
            <View style={style.container}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={style.item} onPress={() => setAction( item.pagina )  }>
                            <View style={style.iconContainer}>
                                <Icon name={item.icon} size={30} color="#4CAF50" />
                            </View>
                            <Text style={style.itemTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    numColumns={2}
                />
            </View>
        </View>
    )
}

const style = StyleSheet.create({

    header: {
        width: "100%",
        height: 230,
        position: "absolute",
        top: 0,
        padding: 10,
        backgroundColor: "#87CE57",
        justifyContent: 'space-around',
        borderBottomEndRadius: 15,
        borderBottomLeftRadius: 15,
        zIndex: -1
    },

    headerText: {
        color: "black",
        textAlign: "left",
        marginLeft: "20px",
        marginTop: "30px"

    },
    container: {
        position: "absolute",
        width: "100%",
        height: "80%",
        bottom: 0,
        padding: 20,
        zIndex: 1

    },
    item: {
        flex: 1,
        margin: 20,
        padding: 25,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },


    itemTitle: {
        fontSize: 16,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },

    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,

    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"



    }





})