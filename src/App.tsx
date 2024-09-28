import { Route, Routes } from "react-router-dom"
import Main from "./components/Main"
import Details from "./components/Details"
import Posts from "./components/Posts"
import Sellproduct from './components/Sellproduct'
import { UserContextProvider } from "./context/AuthContext"
import { FirebaseContextProvider } from "./context/FirebaseContext"
import { ProductContextProvider } from "./context/ProductsContext"


const App = () => {
  return <>
  <ProductContextProvider>
    <UserContextProvider>
      <FirebaseContextProvider>
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/details' element={<Details />} />
            <Route path='/sellproduct' element={<Sellproduct />} />
            <Route path='/myposts' element={<Posts />} />
        </Routes>
        </FirebaseContextProvider>
    </UserContextProvider>    
  </ProductContextProvider>  
  </>
}

export default App