import { createContext, useState } from "react";

export const AuthContext = createContext(0);

function AuthProvider({ children }) {
    const [logado, setLogado] = useState(false);
    const [error, setError] = useState(false);
    const [action, setAction ] = useState("home");

    async function Login(email, senha) {

        if (email != "" && senha != "") {
            await fetch('https://fakestoreapi.com/auth/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: email,
                    password: senha
                })
            })
                .then(res => (res.ok == true) ? res.json() : false)
                .then(json => {
                    setLogado((json.token) ? true : false);
                    setError((json.token) ? false : true);
                }
                )
                .catch(err => setError(true))
        } else {
            setError(true)
        }
    }

    return (
        <AuthContext.Provider value={{ logado: logado, setLogado: setLogado, Login, error: error, action: action, setAction: setAction }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;