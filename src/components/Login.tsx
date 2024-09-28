import { signInWithPopup } from 'firebase/auth';
import google from '../assets/google.png';
import phone from '../assets/mobile.png';
import { auth, googleProvider } from '../firebase/setup';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext'
import { useContext } from 'react';
import { FirebaseContext } from '../context/FirebaseContext'
import { addDoc, collection, getDocs } from 'firebase/firestore';

type popupProp = {
    setLoginPop: any
}

interface User {
    id: string;
    uid: string;
    username: string;
    email: string;
    phone?: string; // Optional if phone number might not be available
}

const Login = ( props: popupProp ) => {
    const {setUser} = useContext(AuthContext);
    const { db } = useContext(FirebaseContext)
    const navigate = useNavigate();

    const googleSignin = async () => {
        try{
            const result = await signInWithPopup(auth, googleProvider)
            const usersCollection = collection(db, 'users'); 
            const usersSnapshot = await getDocs(usersCollection);
            const usersList: User[] = usersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as User[];
            
            const existingUser = usersList.find(usr => usr.email === result.user.email);
            console.log("user"+result)
            props?.setLoginPop(false);

            if (!existingUser) {
                await addDoc(collection(db, 'users'), {
                    uid: result.user.uid,
                    username: result.user.displayName,
                    email: result.user.email,
                    phone: result.user.phoneNumber,
                });
            }
            setUser(result.user)
            navigate('/')
        } catch(error){
            console.log(error)
        }
    }

  return (
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

          <div className="fixed inset-0 bg-zinc-950 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                  <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  sm:w-96 sm:max-w-lg">
                      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                          
                          <h1 
                            className='cursor-pointer font-semibold text-3xl'
                            onClick={() => props?.setLoginPop(false)}
                          >
                                X
                          </h1>

                          <div className="sm:flex sm:items-start">

                              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                  <div className="mt-2">
                                        <img 
                                            src="https://statics.olx.in/external/base/img/loginEntryPointPost.png"
                                            alt=""
                                            className="w-20 h-20 ml-32"
                                        />
                                      <p className="text-base font-medium mt-5 text-center">Help us become one of the safest places <br/> to buy and sell</p>
                                        <div className='flex border-2 border-black p-2 rounded-md mt-12'>
                                            <img src={phone} className='w-6 h-6' />
                                            <h1 className='font-semibold ml-3'>Continue with phone</h1>
                                        </div>

                                        <div onClick={googleSignin} className='flex border border-gray-300 p-2 rounded-md mt-12'>
                                            <img src={google} className='w-6 h-6' />
                                            <h1 className='font-semibold ml-12'>Continue with Google</h1>
                                        </div>

                                        <h1 className='text-center mt-4'>OR</h1>
                                        <h1 className='text-center mt-4 underline cursor-pointer'>Login with Email</h1>
                                        <h1 className='text-center mt-36 text-gray-600 text-xs'>All your personal details are safe with us.</h1>
                                        <h1 className='text-center mt-2 mb-8 text-gray-600 text-xs'>If you continue, you are accepting <span className='text-blue-700'>OLX Terms and Conditions and Privacy Policy</span></h1>
                                  
                                  </div>
                              </div>
                          </div>
                      </div>

                  </div>
              </div>
          </div>
      </div>

  )
}

export default Login