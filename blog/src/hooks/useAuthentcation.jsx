import { db } from '../firebase/config'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from 'firebase/auth'

import {useState, useEffect} from 'react'

export const useAuthentcation = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //cleanup
    //deal with memory leak
    const [canceled, setCancelad] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelad() {
        if (canceled) {
            return;        }
    }

    const createUser = async (data) => {
        checkIfIsCancelad()

        setLoading(true)
        setError(null)

        try {

            const {user} = createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            return user

        } catch (error) {

            console.log(error.message)
            console.log(typeof error.message);

            let systemErrorMessage;

            if(error.message.includes("Password")){
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres."
            }else if(error.message.includes("email-already")){
                systemErrorMessage = "E-mail já cadastrado"
            }else {
                systemErrorMessage = "Ocorreu um erro, por favor tente novamente mais tarde."
            }

            setError(systemErrorMessage)
        }

        setLoading(false)
    }

    useEffect(() => {
        return () => setCancelad(true);
    }, [])

    return {
        auth,
        createUser,
        error,
        loading,
    };
}