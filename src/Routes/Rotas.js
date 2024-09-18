import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

import Inicial from '../Pages/Inicial';

import Cadastro from '../Pages/Cadastro'
import Login from '../Pages/Login';


const Tab = createBottomTabNavigator();

export default function Rotas() {

    const { logado,cadastro } = useContext(AuthContext);

   /* if (!logado && !cadastro) {
        return (<Login />)
    }
    if(!logado && cadastro){
        return(< Cadastro/>)
    }*/

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: '#191919',
                    },
                    tabBarActiveTintColor: "white"
                }}
            >
                <Tab.Screen
                    name="Inicial"
                    component={Inicial}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                    }}
                />
              
           


           
            </Tab.Navigator>
        </NavigationContainer>
    )
}