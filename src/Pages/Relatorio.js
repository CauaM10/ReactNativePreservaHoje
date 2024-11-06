import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import Icone from '@expo/vector-icons/Ionicons';
import { AuthContext } from "../Context/AuthContext";
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';



const LineChartExample = () => {
    const { setAction } = useContext(AuthContext);
  return (
    <View >
      <Pressable onPress={() => setAction('home')} style={styles.volt}>
          <Icone name="arrow-back" size={32} color="green" />
    </Pressable>
    <Image
          source={require('../../assets/logorelatorio.png')}
          style={{marginLeft: 235, bottom:38, }}
        />
      <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [20, 45, 28, 80, 99, 43],
              strokeWidth: 2, // optional
            },
          ],
        }}
        
        width={Dimensions.get('window').width - 25} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        chartConfig={{
          backgroundColor: '#8ED45F',
          backgroundGradientFrom: '#8ED45F',
          backgroundGradientTo: '#98E28B',
          decimalPlaces: 2, 
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: 'green',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          marginTop: 20,
          padding:9,
          left: 3
        }}
      />
      <View  style={{width: "50%",  borderWidth: 1.5, borderRadius: 10, borderColor: "#87CE57" ,width: "93%", marginLeft: 13, height: 150, alignItems: "center"}}>
        <Text style={{top: 15}}>Porcentagem de Emissão por combustível</Text>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 8, top: 30 }}>
          <View style={{paddingRight: 40}}>
            <Text style={{fontSize: 30, fontWeight: "500", fontStyle: "italic"}}>30%</Text>
            <Text style={{top: 8}}>Gasolina</Text>
          </View>
          <View style={{paddingLeft: 15}}>
            <Text style={{fontSize: 30, fontWeight: "500", fontStyle: "italic"}}>25%</Text>
            <Text style={{top: 8}}>Etanol</Text>
          </View>
          <View style={{paddingLeft: 50 }}>
            <Text style={{fontSize: 30, fontWeight: "500", fontStyle: "italic"}}>45%</Text>
            <Text style={{top: 8}}>Diesel</Text>
          </View>
        </View>
      </View>
      <Text style={{padding:40, fontWeight:500, fontSize: 15}}>Detalhes</Text>
      <View style={{paddingLeft: 40, gap: 10}}>
        <Text>Distância Percorrida:</Text>
        <Text>Quantidade de CO₂ Emitido:</Text>
        <Text>Nome do Motorista:</Text>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
    volt: {
        marginLeft: 10,
        marginTop: 55
      },
    
});

export default LineChartExample;