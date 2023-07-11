import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem('user')) : null
        const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null

        setUser(user)
        setToken(token)
    }, [])

    const handleRegister = async (e, name, email, password) => {
        console.log(name);
        const userData = { name, email, password }
        console.log(userData, 'send');
        e.preventDefault()
        try {
            const { data } = await axios.post('http://localhost:3030/register', userData)
            setUser(data.others)
            setToken(data.token)
            localStorage.setItem("user", JSON.stringify(data.others))
            localStorage.setItem("token", JSON.stringify(data.token))
            router.push('/')

        } catch (error) {
            console.log(error.message)
        }
    }

    const handleLogin = async (e,email, password) => {
        const userData ={email, password}

        e.preventDefault()
        try {
            const { data } = await axios.post('http://localhost:3030/login', userData)
            console.log(data, 'LOGIN')
            setUser(data.others)
            setToken(data.token)
            localStorage.setItem("user", JSON.stringify(data.others))
            localStorage.setItem("token", JSON.stringify(data.token))
            router.push('/')

        } catch (error) {
            console.log(error.message)
        }
    }

    const handleLogout = async (user) => {
        try {
            console.log(user);
            await axios.post('http://localhost:3030/logout', user)
            localStorage.removeItem('user'); 
            localStorage.removeItem('token'); 
            setUser(null)
        } catch (error) {
           console.log(error.message)
        }
    }

    return <authContext.Provider value={{
        user,
        token,
        handleRegister,
        handleLogin,
        handleLogout
    }}>
        {children}
    </authContext.Provider>
}

export function useAuthContext() {
    return useContext(authContext)
}