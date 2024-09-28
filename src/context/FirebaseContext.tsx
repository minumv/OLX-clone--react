import { createContext } from "react";
import { auth,db,storage } from '../firebase/setup'

interface FirebaseContextType {
    auth: any; 
    storage: any; 
    db:any;
}

export const FirebaseContext = createContext< FirebaseContextType | any >(null)
export const FirebaseContextProvider = ({children} : any) =>{
   return ( 
        <FirebaseContext.Provider value = {{auth,db,storage}}>
            {children}
        </FirebaseContext.Provider>
   )
}