import { createContext, useState } from "react";

interface ProductContextType {
    products: any,
    setProducts: React.Dispatch<React.SetStateAction<any>>
}

export const ProductContext = createContext <ProductContextType | any>(null)

export const ProductContextProvider = ({children}:any) => {
    const [ products, setProducts ] = useState('')
    return(
        <ProductContext.Provider value={{ products, setProducts}}>
            {children}
        </ProductContext.Provider>
    )
}