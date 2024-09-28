import olx from "../assets/OLX-Symbol.png";
import lens from '../assets/search.png';
import arrow from '../assets/arrow.png';
import search from '../assets/serch-black.png';
import Login from "./Login";
import { FaSignOutAlt } from 'react-icons/fa';
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";


type searchProp = {
    setSearch:any    
}

const Navbar = (props:searchProp) => {
    const [ loginPop, setLoginPop ] = useState( false )
    const {user,logOut} = useContext(AuthContext);
    const navigate = useNavigate();

    // const  user = authContext ? authContext.user : null;

    return (
        <>
            <div className="flex p-4 bg-slate-100 shadow-md">
                <Link to='/'><img src={olx} className="w-11 h-9 cursor-pointer" /></Link>
                <div className="flex border-2 rounded border-spacing-1  w-64 p-2 border-cyan-950 ml-5 bg-white">
                    <img src={lens} className="w-5 h-5" />
                    <input placeholder="location" className="outline-none"/>
                    <img src={arrow} className="w-8 h-7 cursor-pointer" />
                </div>

                <div className="flex border-2 rounded w-[850px] h-12 ml-4 border-cyan-950 bg-white">
                    <input onChange={(e)=> props?.setSearch(e.target.value)} placeholder="Find Cars, Mobile phones and more..." className="ml-3 w-[100%] outline-none" />
                    <img src={search} className="cursor-pointer" />
                </div>

                <div className="flex h-12 p-3 ml-10">
                    <h1 className="uppercase font-semibold cursor-pointer">English</h1>
                    <img src={arrow} className="w-8 h-7 cursor-pointer" />
                </div>
                {
                    user?.email ? (
                        <div className = "p-3 flex items-center justify-center">
                            <Link to='/myposts'>
                                 <h1 className = "font-bold hover:underline cursor-pointer">{user.displayName}</h1>
                            </Link>
                            <p
                               onClick={ ()=> {
                                logOut()
                                navigate('/')
                                }
                             }
                               className='cursor-pointer '
                            >
                                <FaSignOutAlt
                                    size = {20}
                                    className=' text-gray-500'
                                />
                            </p>
                        </div >                        

                    ):
                    (
                        <div onClick = { ()=> setLoginPop(!loginPop) } className = "p-3">
                            <h1 className = "font-bold hover:underline cursor-pointer">Login</h1>
                        </div >
                    )
                }
        
                
                {
                    user?.email? (
                        <div>
                            <Link to='/sellproduct'>
                                <button                         
                                    className="uppercase border-2 border-emerald-500 rounded-full w-20 h-12 p-3 text-black font-semibold"
                                >
                                    + sell
                                </button>
                            </Link>
                        </div>
                    ):(
                        <div>                        
                            <button 
                            onClick={()=>alert("Please Login!!")}                        
                                className="uppercase border-2 border-emerald-500 rounded-full w-20 h-12 p-3 text-black font-semibold"
                            >
                                + sell
                            </button>                       
                        </div>
                    )
                }

               
            </div>
            { loginPop && <Login setLoginPop={setLoginPop} />}
    </>
  )
}

export default Navbar