import {useState, useEffect,createContext} from 'react'
import {onAuthStateChanged, signOut} from 'firebase/auth'
import {auth} from '../firebase/setup'

interface AuthContextType {
    user: any; 
    setUser: React.Dispatch<React.SetStateAction<any>>; 
}

export const AuthContext = createContext <AuthContextType  | any>(null)

export const UserContextProvider = ({children} : any) => {
    const [user,setUser] = useState < any | null>(null)

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser:any)=>{
            setUser(currentUser)
        })
        return () => unsubscribe()
    },[])

    function logOut() {
        signOut( auth );        
    }

    return (
        <AuthContext.Provider value ={{user,setUser,logOut}}>
            {children}
        </AuthContext.Provider>
    )
}