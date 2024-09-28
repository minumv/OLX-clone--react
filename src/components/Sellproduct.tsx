import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../context/FirebaseContext'
import { AuthContext } from '../context/AuthContext'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection,Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

type errorType = {
    // name? : string,
    category? : string,
    price? : string,
    title? : string,
    description? : string,
    image? : string
} 

const Sellproduct = () => {
    // const [ name,setName ] = useState <string> ('')
    const [ category, setCategory ] = useState  <string> ('')
    const [ price, setPrice ] = useState  <number> (10)
    const [ title, setTitle ] = useState <any> ()
    const [ description, setDescription ] = useState <any> ()
    const [ image, setImage ] = useState <File> ()
    const [errors, setErrors] = useState <errorType> ({})

    const { db,storage } = useContext(FirebaseContext)
    const { user } = useContext(AuthContext)

    const navigate = useNavigate()

    const formValidate = () =>{
        const newErrors : errorType  = {}
        if(!title) newErrors.category = 'Title is required!'
        if(!category) newErrors.category = 'Category is required!'
        if(!description) newErrors.category = 'Description is required!'
        if(!price && price <= 0) newErrors.price = 'Price must be valid!'
        if (!image) newErrors.image = 'Image is required!';
        return newErrors;

    }

    const handleSubmit = async(e:any)=> {
       e.preventDefault()
        // const validationErrors  = formValidate();
        // setErrors(validationErrors);
        // if (Object.keys(validationErrors).length > 0) {
        //     return;
        // }
        try{           

            if ( image && user ){
                const imageRef = ref(storage, `images/${image.name}`);
                const snapshot = await uploadBytes(imageRef, image);
                const imageUrl = await getDownloadURL(snapshot.ref);

                await addDoc(collection(db, 'products'), {
                    title,
                    category,
                    price,                    
                    description,
                    imageUrl,
                    createdBy: user.uid,
                    createdAt:  Timestamp.fromDate(new Date()) 
                });

               navigate('/')

            } else {
                alert('Please upload an image');

            }

        } catch( error ){
            console.error('Error uploading data:', error);
        }

    }

  return (
    <div >
        <div className='border bottom-1 h-20 '>
            <Link to='/'>
                <p className='m-6 '>
                    <FaArrowLeft 
                        size={20}
                        className='text-gray-500 '
                    />
                </p>
            </Link>
        </div>
        <div className='flex justify-center items-center uppercase text-2xl shadow-slate-200 shadow-inner p-6'>            
            <h1 className='font-bold text-black/70'>Post your ad</h1>
        </div>
        <div className='border w-1/2 flex justify-center items-center mx-auto h-[550px] shadow-inner'>
            <form
                className='flex flex-col space-y-5 text-gray-900 '
            >
                
                 <input
                    type='text'
                    placeholder='Title' 
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    className="p-2 border rounded outline-none"                   
                />
                 {errors.title && <span className="text-red-600">{errors.title}</span>}
                 
                 <input
                    type='text'
                    placeholder='Category' 
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                    className="p-2 border rounded outline-none"                   
                />
                 {errors.category && <span className="text-red-600">{errors.category}</span>}

                 <input
                    type='text'
                    placeholder='Price'  
                    value={price}
                    onChange={(e)=>setPrice(parseFloat(e.target.value))}   
                    className="p-2 border rounded outline-none"               
                /> 
                 {errors.price && <span className="text-red-600">{errors.price}</span>}

                 

                 <textarea                    
                    placeholder='Description' 
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    className="p-2 border rounded outline-none"                   
                />
                 {errors.description && <span className="text-red-600">{errors.description}</span>}



                <br/>
                {image && (
                    <img
                        alt="Preview"
                        width="200px"
                        height="200px"
                        src={URL.createObjectURL(image)}
                    />
                )}
                <br/> 
                <input
                    type='file'
                    onChange={(e)=>{
                        const file = e.target?.files?.[0]
                        if(file){
                            setImage(file)
                        }
                    }}
                /> 
                 {errors.image && <span className="text-red-600">{errors.image}</span>}

                <button
                    type='submit'
                    onClick={handleSubmit}
                    className='bg-gray-700 text-white rounded h-10 uppercase'
                >
                 post now   
                </button>    

            </form>
        </div>

    </div>
  )
}

export default Sellproduct