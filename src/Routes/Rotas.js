import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

import Inicial from '../Pages/Inicial';
import Registro from '../Pages/Registro'

import Sobrenos from '../Pages/Sobrenos'
import TelaFrota from '../Pages/TelaFrota'
import RelatorioCaminhao from '../Pages/RelatorioCaminhao'


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

        return( < Sobrenos/> )

    }

        if(action == "registro"){
            return(< Registro/>)
        }

        if(action == "TelaFrota"){
            return(< TelaFrota/>)
        }

        if(action == "RelatorioCaminhao"){
            return(< RelatorioCaminhao/>)
        }
       
}