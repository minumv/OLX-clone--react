import { useContext, useEffect, useState } from "react"
import Menubar from "./Menubar"
import Navbar from "./Navbar"
import Home from "./Home";
import Footer from "./Footer";
import { db } from "../firebase/setup";
import { ProductContext } from "../context/ProductsContext";
import { collection, getDocs } from "firebase/firestore";

const Main = () => {

    const [prod, setProd ] = useState([]);
    const [search,setSearch] = useState("");
    const [menu,setMenu] = useState("")

    const { setProducts } = useContext(ProductContext)

    useEffect(() => {

      const getProducts = async () => {
        
        try {
          const fetctprod = ()=>{
            fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>setProd(json))
          }
          fetctprod()
          console.log(prod)
          const productsCollection = collection(db, 'products'); 
          const productsSnapshot = await getDocs(productsCollection);
          const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); 
          setProducts(productsList);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    
    }
        getProducts();
    },[db])

  return (
    <div>
        <Navbar setSearch={setSearch}/>
        <Menubar setMenu={setMenu}/>
        <Home  search={search} menu={menu}/>        
        <Footer />
    </div>
  )
}

export default Main