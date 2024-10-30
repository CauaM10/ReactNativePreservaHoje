import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Inicial from '../Pages/Inicial';
import Registro from '../Pages/Registro'
import TelaFrota from '../Pages/TelaFrota'
import RelatorioCaminhao from '../Pages/RelatorioCaminhao'
import Calculo from '../Pages/CalculoManual'
import Cadastro from '../Pages/Cadastro'
import ReduzirImpactos from '../Pages/ReduzirImpactos'
import DetalhesLugares from '../Pages/DetalhesLugares'
import TodosLugares from '../Pages/TodosLugares'



import Sobre from '../Pages/Sobrenos'

/*import Cadastro from '../Pages/Cadastro'*/
import Login from '../Pages/Login';


export default function Rotas() {

    const { logado, cadastro, action, globalId, localizacaoId } = useContext(AuthContext);

    if (!logado && action == "home") {
        return (<Login />)
    }
    if (!logado && action == "cadastro") {
        return (< Cadastro />)
    }

    if (action == "home") {
        return (<Inicial />)
    }


    if (action == "sobre") {


        return (< Sobre />)

    }

    if (action == "registro") {
        return (< Registro />)
    }
    



    if (action == "RelatorioCaminhao") {
        return (< RelatorioCaminhao id={globalId} />)
    }

    if (action == "TelaFrota") {
        return (< TelaFrota />)
    }

    if (action == "reduzirimpactos") {
        return (< ReduzirImpactos Id={localizacaoId}/>)
    }

    if (action == "DetalhesLugares") {
        return (< DetalhesLugares id={globalId} />)
    }

    if (action == "calculo") {
        return (< Calculo />)
    }
   
    if (action == "TodosLugares") {
        return (< TodosLugares />)
    }

    if (action == "cadastro") {
        return (< Cadastro />)
    }



}