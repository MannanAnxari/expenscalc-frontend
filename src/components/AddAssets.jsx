import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { useMutation, useQueryClient } from 'react-query';
import axios from "axios";
import { toast } from 'react-hot-toast';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const createUser = async (dta) => {
    const { data } = await axios.post('http://localhost:5000/api/dashboard/add-assets', dta);
    return data;
};

const AddAssets = ({ setData }) => {

    const { addUserData, dispatch, user } = useContext(AppContext);


    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation(createUser, {
        onSuccess: (data) => {
            if (data.success) {
                // dispatch(addUserData(data?.data));
                // navigate("/dashboard");
                setData({ status: data?.user?.isactive })
                dispatch(addUserData(data?.user));
                console.log(data);;
            }
        },
        onError: (err) => {
            toast.error(err.response?.data?.message);
        },
    });

    const handleSubmit = (e) => {


        e.preventDefault();
        let cash = e.target.elements['cash'].value, savings = e.target.elements['savings'].value, bank = e.target.elements['bank'].value;
        mutate({ cash, savings, bank, userid: user?.data?._id })

    }
    return (
        <motion.div animate={{ opacity: 1, scale: 1, translateY: 0 }}
            initial={{ opacity: 0, scale: .8, translateY: 100 }}
            transition={{ ease: "easeOut", delay: .2 }}
            className="bg-white my-8 p-8 rounded-lg" >
            <div className='container mx-auto my-12' onSubmit={handleSubmit}>
                <h1 class="text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl mb-12">Add Your Assets</h1>

                <form className="md:w-2/5 mx-auto px-2">

                    <div className="flex flex-wrap -mx-3">
                        <div className="w-full md:w-full px-3 mb-6 md:mb-4">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                How much cash you have
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="Enter Cash" name='cash' />

                        </div>
                        <div className="w-full md:w-full px-3 mb-6 md:mb-4">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                How much savings you have
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="Enter Savings Asset" name='savings' />


                        </div>
                        <div className="w-full md:w-full px-3 mb-6 md:mb-4">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                How much money in back account
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="Enter Bank Asset" name='bank' />

                        </div>

                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-4">
                            <motion.button disabled={isLoading} type='submit' className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none font-medium rounded-md text-sm px-4 py-2 transition-all"
                                whileTap={{ scale: 0.95 }}>
                                {isLoading ?
                                    'Creating...' :
                                    'Add Assets'
                                }
                            </motion.button>
                        </div>
                    </div>
                </form>
            </div>
        </motion.div>
    )
}

export default AddAssets