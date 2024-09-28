import { useContext } from "react"
import { Link } from "react-router-dom"
import { ProductContext } from "../context/ProductsContext"

type productsProp = {
    // products:any,
    search:any,
    menu:any
}

const Home = ( props:productsProp ) => {

  const { products } = useContext(ProductContext)
  const productList = Array.isArray(products) ? products : [];
  
  return (
    <div className=" grid grid-cols-4 p-5">
        {productList?.filter((data:any)=>data?.title?.toLowerCase().includes(props?.search?.toLowerCase()||props?.menu?.toLowerCase()))
        // filter((data:any)=>data?.title?.includes(props?.search ?( props?.search) :( props?.menu)))
        .map((data:any)=>{
            return <Link key={data.id} to='/details' state={{data:data}}>
                <div className="border border-spacing-1 p-2 ml-3 mt-3">
                <img src={data?.imageUrl} className="w-60 h-48" />
                <h1 className="font-bold text-xl">₹{data?.price}</h1>
                <h1>{data?.title}</h1>
                <h1>{data?.category}</h1>
            </div>
            </Link>
        })}
    </div>
  )
}

export default Home