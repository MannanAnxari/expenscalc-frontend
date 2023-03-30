import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useMutation, useQueryClient } from 'react-query';
import axios from "axios";
import { toast } from 'react-hot-toast';
import { AppContext } from '../context/AppContext';


const editTransaction = async (dta) => {
    const { data } = await axios.post('https://expenscalc-server.vercel.app/api/dashboard/edit-transaction', dta);
    return data;
};


const EditModal = ({ setShowModal, showModal, editItem }) => {

    const { addUserData, dispatch, user, assets, addAssets } = useContext(AppContext);

    const [category, setCategory] = useState('');

    const [data, setData] = useState({ amount: editItem.amount, category: editItem.category, description: editItem.description, from: editItem.paid_from, transactionid: editItem._id, userid: user?.data?._id });

    useEffect(() => {
        setData({ amount: editItem.amount, category: editItem.category, description: editItem.description, from: editItem.paid_from, transactionid: editItem._id, userid: user?.data?._id });
    }, [editItem])


    const { mutate, isLoading } = useMutation(editTransaction, {
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
        <>

            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
                        <form onSubmit={handleSubmit} className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-center text-3xl font-medium leading-none tracking-tight text-gray-900">
                                        Edit Transaction
                                    </h3>
                                    <button type='button'
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            x
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <div className="w-full mx-auto px-4">

                                        <div className="flex flex-wrap -mx-3">
                                            <div className="w-full md:w-full px-3 mb-6 md:mb-4">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                    Amount
                                                </label>
                                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="Enter Amount" name='amount' value={data.amount} onChange={(e) => setData({ ...data, amount: parseInt(e.target.value) })} />

                                            </div>
                                            <div className="w-full md:w-full px-3 mb-6 md:mb-4">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                    Expense Category
                                                </label>
                                                <select onChange={(e) => { setCategory(e.target.value); setData({ ...data, category: e.target.value === 'other' ? null : e.target.value }) }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" name={`${category === 'other' ? '' : 'category'}`} >
                                                    {user?.data?.categories.map((item, i) => <option key={i} value={`${item}`} selected={data.category === item}>{item}</option>)}
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

                                                    <option value="cash" selected={data.from === 'cash' && true}>Cash</option>
                                                    <option value="savings" selected={data.from === 'savings' && true}>Savings</option>
                                                    <option value="bank" selected={data.from === 'bank' && true}>Bank Account</option>
                                                </select>
                                            </div>

                                            <div className="w-full md:w-full px-3 mb-6 md:mb-4">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                    Enter Description
                                                </label>
                                                <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Enter Description" name='description' value={`${data.description}`} onChange={(e) => setData({ ...data, description: e.target.value })}></textarea>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-black-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <motion.button disabled={isLoading}
                                        className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none font-medium rounded-md text-sm px-4 py-2 transition-all"
                                        type="submit"
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {isLoading
                                            ?
                                            'Loading...' :
                                            'Save Changes'
                                        }
                                    </motion.button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}

export default EditModal