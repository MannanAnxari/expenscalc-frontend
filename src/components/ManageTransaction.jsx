import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { useMutation, useQueryClient } from 'react-query';
import axios from "axios";
import { toast } from 'react-hot-toast';
import { AppContext } from '../context/AppContext';
import Chart from './Chart';

const createTransaction = async (dta) => {
    const { data } = await axios.post('http://localhost:5000/api/dashboard/make-transaction', dta);
    return data;
};

const ManageTransaction = () => {

    const { addUserData, dispatch, user, assets, addAssets } = useContext(AppContext);

    const [category, setCategory] = useState('');

    const [data, setData] = useState({ amount: 0, category: '', description: '', from: '', userid: user?.data?._id });

    const { mutate, isLoading } = useMutation(createTransaction, {
        onSuccess: (data) => {
            if (data.success) {
                dispatch(addUserData(data?.user));
                dispatch(addAssets(data?.asst));
                toast.success(data.message)
            }
        },
        onError: (err) => {
            toast.error(err.response?.data?.message);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(data);
    }
    
    return (
        <motion.div animate={{ opacity: 1, scale: 1, translateY: 0 }}
            initial={{ opacity: 0, scale: .8, translateY: 100 }}
            transition={{ ease: "easeOut", delay: .1 }} className='w-full' >

            {/* <Chart /> */}

            <div className='container px-4 my-12 mx-auto' onSubmit={handleSubmit}>
                <h1 class="text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl mb-12">Create Transactions</h1>

                <form className="md:w-3/5 mx-auto px-2">

                    <div className="flex flex-wrap -mx-3">
                        <div className="w-full md:w-full px-3 mb-6 md:mb-4">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Amount
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="Enter Amount" name='amount' onChange={(e) => setData({ ...data, amount: parseInt(e.target.value) })} />

                        </div>
                        <div className="w-full md:w-full px-3 mb-6 md:mb-4">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Expense Category
                            </label>
                            <select onChange={(e) => { setCategory(e.target.value); setData({ ...data, category: e.target.value === 'other' ? null : e.target.value }) }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" name={`${category === 'other' ? '' : 'category'}`} >
                                <option value="" selected hidden>Select Category</option>
                                {user?.data?.categories.map(item => <option value={`${item}`}>{item}</option>)}
                                <option value="other">Other</option>
                            </select>
                        </div>
                        {category === 'other' &&
                            <div className="w-full md:w-full px-3 mb-6 md:mb-4">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Enter Category
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Enter Category" name='category' onChange={(e) => setData({ ...data, category: e.target.value })} />
                            </div>
                        }
                        <div className="w-full md:w-full px-3 mb-6 md:mb-4">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Paid From
                            </label>
                            <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" name='from' onChange={(e) => setData({ ...data, from: e.target.value })} >
                                <option value="" selected hidden>Select Transaction Type</option>
                                <option value="cash">Cash</option>
                                <option value="savings">Savings</option>
                                <option value="bank">Bank Account</option>
                            </select>
                        </div>

                        <div className="w-full md:w-full px-3 mb-6 md:mb-4">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Enter Description
                            </label>
                            <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Enter Description" name='description' onChange={(e) => setData({ ...data, description: e.target.value })} ></textarea>

                        </div>


                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-4">
                            <motion.button disabled={isLoading} type='submit' className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none font-medium rounded-md text-sm px-4 py-2 transition-all"
                                whileTap={{ scale: 0.95 }}>
                                {isLoading ?
                                    'Loading...' :
                                    'Make Transaction'
                                }
                            </motion.button>
                        </div>
                    </div>
                </form>
            </div>
        </motion.div>
    )
}

export default ManageTransaction