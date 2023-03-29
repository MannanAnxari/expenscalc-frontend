import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { useMutation, useQueryClient } from 'react-query';
import axios from "axios";
import { toast } from 'react-hot-toast';
import { AppContext } from '../context/AppContext';
import Chart from './Chart';
import { useNavigate } from 'react-router-dom';

const createUser = async (dta) => {
    const { data } = await axios.post('http://localhost:5000/api/dashboard/edit-assets', dta);
    return data;
};

const ManageAssets = () => {

    const { addUserData, dispatch, user, assets, addAssets } = useContext(AppContext);

    const [editAssets, setEditAssets] = useState({ cash: assets?.cash || 0, savings: assets?.savings || 0, bank: assets?.bank || 0, userid: user?.data?._id })

    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation(createUser, {
        onSuccess: (data) => {
            if (data.success) {
                dispatch(addAssets(data?.data));
                toast.success(data.message)
            }
        },
        onError: (err) => {
            toast.error(err.response?.data?.message);
        },
    });

    const handleSubmit = (e) => {


        e.preventDefault();
        mutate(editAssets)

    }

    return (
        <motion.div animate={{ opacity: 1, scale: 1, translateY: 0 }}
            initial={{ opacity: 0, scale: .8, translateY: 100 }}
            transition={{ ease: "easeOut", delay: .1 }} className='w-full' >

            {/* <Chart /> */}

            <div className='container px-4 my-12 mx-auto' onSubmit={handleSubmit}>
                <h1 class="text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl mb-12">Edit Your Assets</h1>

                <form className="md:w-3/5 mx-auto px-2">

                    <div className="flex flex-wrap -mx-3">
                        <div className="w-full md:w-full px-3 mb-6 md:mb-4">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                How much cash you have
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="Enter Cash" name='cash' onChange={(e) => setEditAssets({ ...editAssets, cash: parseInt(e.target.value) })} value={editAssets.cash} />

                        </div>
                        <div className="w-full md:w-full px-3 mb-6 md:mb-4">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                How much savings you have
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="Enter Savings Asset" name='savings' onChange={(e) => setEditAssets({ ...editAssets, savings: parseInt(e.target.value) })} value={editAssets.savings} />


                        </div>
                        <div className="w-full md:w-full px-3 mb-6 md:mb-4">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                How much money in back account
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="Enter Bank Asset" name='bank' onChange={(e) => setEditAssets({ ...editAssets, bank: parseInt(e.target.value) })} value={editAssets.bank} />

                        </div>

                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-4">
                            <motion.button disabled={isLoading} type='submit' className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none font-medium rounded-md text-sm px-4 py-2 transition-all"
                                whileTap={{ scale: 0.95 }}>
                                {isLoading ?
                                    'Loading...' :
                                    'Edit Assets'
                                }
                            </motion.button>
                        </div>
                    </div>
                </form>
            </div>
        </motion.div>
    )
}

export default ManageAssets