import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

import Inicial from '../Pages/Inicial';
import Registro from '../Pages/Registro'
import Sobre from '../Pages/Sobrenos'
import Cadastro from '../Pages/Cadastro'
import Login from '../Pages/Login';
import { Text } from 'react-native';




export default function Rotas() {


    

    const { logado,cadastro, action } = useContext(AuthContext);

   if (!logado && !cadastro) {
        return (<Login />)
    }
    /* if(!logado && cadastro){
        return(< Cadastro/>)
    }*/

    if( action == "home" ) {
        return( <Inicial /> )
    }


    if( action == "sobre" ) {
        return( < Sobre/> )
    }

        if(action == "registro"){
            return(< Registro/>)
        }
}