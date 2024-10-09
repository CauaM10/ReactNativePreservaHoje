import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

import Inicial from '../Pages/Inicial';
import Registro from '../Pages/Registro'
<<<<<<< HEAD
import Sobrenos from '../Pages/Sobrenos'

=======
import Sobre from '../Pages/Sobrenos'
>>>>>>> 14f3e1f78f93ce69f7fb64668ef105177a7c5bdf
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
<<<<<<< HEAD
        return( < Sobrenos/> )
=======
        return( < Sobre/> )
>>>>>>> 14f3e1f78f93ce69f7fb64668ef105177a7c5bdf
    }

        if(action == "registro"){
            return(< Registro/>)
        }

       
}