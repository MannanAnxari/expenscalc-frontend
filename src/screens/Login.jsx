import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { useMutation } from 'react-query';
import axios from "axios";
import { toast } from 'react-hot-toast';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';



const authUser = async (json) => {
  const { data } = await axios.post('https://expenscalc-server.vercel.app/api/login', json);
  return data;
};

const Login = () => {

  const { addUserData, dispatch } = useContext(AppContext);

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(authUser, {
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Logged in Successfully!');
        dispatch(addUserData(data?.data));
        navigate("/dashboard");
      }
    },
    onError: (err) => {

      if (err.response.status === 401) {
        setErrors(err.response?.data?.errors || []);
      }
      else {
        toast.error(err.response?.data?.message);
        setErrors([]);
      }
    },
  });

  const handleSubmit = (e) => {

    e.preventDefault();
    let email = e.target.elements['email'].value, password = e.target.elements['password'].value;
    mutate({ email, password });

  }

  return (
    <div className='container mx-auto my-12' onSubmit={handleSubmit}>
      <form className="md:w-3/5 mx-auto px-2">

        <div className="flex flex-wrap -mx-3">

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
              Email
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="email" placeholder="example@domain.com" name='email' />
            <p className="mt-2 text-sm text-red-600 dark:text-red-500 capitalize">{errors.length ? errors.filter(item => item.param === 'email')[0]?.msg : ''}</p>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
              Password
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="********" name='password' />
            {errors.length ?
              <p className="mt-2 text-sm text-red-600 dark:text-red-500 capitalize">{errors?.filter(item => item.param === 'password')[0]?.msg}</p>
              :
              ''
            }
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-4">
            <motion.button disabled={isLoading} type='submit' className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none font-medium rounded-md text-sm px-4 py-2 transition-all"
              whileTap={{ scale: 0.95 }}>
              {isLoading ? 'Loading...' : 'Login'}
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login