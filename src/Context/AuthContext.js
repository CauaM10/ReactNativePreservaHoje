import { createContext, useState } from "react";

export const AuthContext = createContext(0);

function AuthProvider({ children }) {
    const [logado, setLogado] = useState(true);
    const [error, setError] = useState(false);
    const [action, setAction ] = useState("home");
    const [globalId, setGlobalId ] = useState();
    const [localizacaoId, setLugarId ] = useState();

    const [cadastro, setCadastro] = useState(false);
    const [usuarioId, setUsuarioId] = useState(0);


    async function Login(email, senha) {      
        console.log(email,senha); 
        if (email != "" && senha != "") {
           
            await fetch('http://10.139.75.80:5001/api/CadastroEmpresa/Login/' + email + "/" + senha, {
                method: 'GET',
                headers: { 'content-type': 'application/json' }
            })
            .then(res => res.json())
            .then(json => {
                if(json.usuarioId != 0){
                    setLogado(true);
                    setUsuarioId(json.usuarioId);
                }                
            })
            .catch(err=> console.log(err))
        } else {
            setError(true);
        }
    }

    return (
        <AuthContext.Provider value={{  cadastro: cadastro,usuarioId:usuarioId, setCadastro, logado: logado, setLogado: setLogado, Login, error: error, action: action, setAction: setAction, globalId: globalId, setGlobalId: setGlobalId, localizacaoId: localizacaoId, setLugarId: setLugarId }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;