import arrow from '../assets/arrow.png';

type menuProp = {
  setMenu:any
}

const Menubar = (props:menuProp) => {
  return (
    <div className="flex shadow-sm h-10 p-2">
        <h1 className="ml-40 uppercase cursor-pointer font-bold text-md">All Categories</h1>
        <img src={arrow} className="w-6 h-7 cursor-pointer" />
        <h1 onClick={()=> props?.setMenu("Shirt")} className="ml-5 cursor-pointer hover:text-cyan-600">Shirt</h1>
        <h1 onClick={()=> props?.setMenu("Jacket")}  className="ml-5 cursor-pointer hover:text-cyan-600">Jacket</h1>
        <h1 onClick={()=> props?.setMenu("phones")}  className="ml-5 cursor-pointer hover:text-cyan-600">Mobile Phones</h1>
        <h1 onClick={()=> props?.setMenu("house")}  className="ml-5 cursor-pointer hover:text-cyan-600">For Sale: Houses & Apartments</h1>
        <h1 onClick={()=> props?.setMenu("jewellery")} className="ml-5 cursor-pointer hover:text-cyan-600">Jewellery</h1>
        <h1 onClick={()=> props?.setMenu("vehicles")} className="ml-5 cursor-pointer hover:text-cyan-600">Commercial & Other Vehicles</h1>
        <h1 onClick={()=> props?.setMenu("apartments")} className="ml-5 cursor-pointer hover:text-cyan-600">For Rent: Houses & Apartments</h1>
    </div>
  )
}

export default Menubar