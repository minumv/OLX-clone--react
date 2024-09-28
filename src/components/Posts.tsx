import empty from '../assets/no-publications.webp'
import { useContext, useState } from "react";
import Footer from "./Footer"
import { ProductContext } from "../context/ProductsContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


// type productsProp = {    
//     search:any,
//     menu:any
// }
const Posts = () => {
    // const [search,setSearch] = useState("");
    // const [menu,setMenu] = useState("")
    const { products } = useContext(ProductContext)
    const { user } = useContext(AuthContext)

    const productList = Array.isArray(products) ? products : []
    console.log("lists",productList)
    const userPosts = productList.filter((pdts)=>pdts.createdBy === user.uid)
    console.log("post",userPosts)

  return (
    <div>
        {/* <Navbar setSearch={setSearch}/>
        <Menubar setMenu={setMenu}/> */}
        <div className="flex justify-center items-center">
            <h1 className="font-bold text-black/75 text-3xl">My Posts</h1>
        </div>
        <div className=" grid grid-cols-4 p-5">
        {userPosts.length > 0 ?
            (userPosts
                // .filter((data:any)=>data?.title?.toLowerCase().includes(props?.search?.toLowerCase() ||  props?.menu?.toLowerCase()))
                .map((data:any)=>{
                    return <Link key={data.id} to='/details' state={{data:data}}>
                        <div className="border border-spacing-1 p-2 ml-3 mt-3">
                        <img src={data?.imageUrl} className="w-60 h-48" />
                        <h1 className="font-bold text-xl">₹{data?.price}</h1>
                        <h1>{data?.title}</h1>
                        <h1>{data?.category}</h1>
                    </div>
                    </Link>
                })
            ):(
                <div className='flex justify-center items-center w-[1490px] h-[640px] shadow-inner shadow-slate-300 ml-0'>
                    <div className='flex flex-col items-center'>
                        <img src={empty} className="w-50 h-30 " />
                        <h1 className="text-center text-lg font-bold mt-10 text-gray-800">You haven't listed anything yet</h1>
                        <p className='text-gray-600'>Let go of what you don't use anymore</p>
                        <Link to='/'>
                            <button
                                className='rounded border border-gray-800 lowercase text-gray-900 p-4 mt-4'
                            >
                                start selling
                            </button>
                        </Link>
                    </div>
                </div>    
                
            )
        }
    </div>
              
        <Footer />
    </div>
  )
}

export default Posts