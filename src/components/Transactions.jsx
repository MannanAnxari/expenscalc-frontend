import axios from 'axios';
import { motion } from 'framer-motion'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import { AppContext } from '../context/AppContext';
import DeleteTransaction from './DeleteTransaction';
import EditModal from './EditModal';
import Spinner from './Spinner';

const getTransactions = async (json) => {
    const { data } = await axios.post('http://localhost:5000/api/dashboard/get-transactions', json);
    return data;
};

const Transactions = () => {
    const { user } = useContext(AppContext);
    const [data, setData] = useState([]);
    const [editItem, setEditItem] = useState([]);
    const [id, setId] = useState('');
    const [showModal, setShowModal] = React.useState(false);
    const [toggle, setToggle] = useState(false);

    const { mutate, isLoading } = useMutation(getTransactions, {
        onSuccess: (json) => {
            if (json.success) {
                setData(json?.data);
            }
        },
        onError: (err) => {
            toast.error(err.response?.data?.message);
        },
    });

    useEffect(() => {

        mutate({ userid: user?.data?._id });

    }, []);




    const deletePostFunc = useMutation(
        async (id) => await axios.post('http://localhost:5000/api/dashboard/delete-transaction', { data: id }),
        {
            onError: (error) => {
                console.log(error);
                toast.error('Something went wrong!!');
            },
            onSuccess: (json) => {
                setData(data.filter(item => item._id != json?.data?.id));
                toast.success('Transaction Deleted Successfully!');
            }
        }
    )

    const deletePost = () => {

        deletePostFunc.mutate(id);

    }


    return (

        <motion.div animate={{ opacity: 1, scale: 1, translateY: 0 }}
            initial={{ opacity: 0, scale: .8, translateY: 100 }}
            transition={{ ease: "easeOut", delay: .1 }} className='w-full' >
            <EditModal showModal={showModal} setShowModal={setShowModal} editItem={editItem} />
            <div class="w-3/4 mx-auto">
                <h1 class="text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl my-12">Transactions History</h1>
                <table class="w-full text-sm text-left text-gray-500 relative overflow-x-auto shadow-md">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Account
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ?
                            <td colSpan={6}>
                                <Spinner />
                            </td>
                            :
                            data.length ?
                                data?.map((item) => {
                                    return <motion.tr animate={{ opacity: 1, scale: 1, translateY: 0 }}
                                        initial={{ opacity: 0, scale: .8, translateY: 10 }}
                                        transition={{ ease: "easeOut", delay: .2 }} className='bg-white border-b hover:bg-gray-50' >
                                        <th scope="row" class="capitalize px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.paid_from === 'savings' ? 'Savings' : item.paid_from === 'bank' ? 'Bank Account' : 'Cash'}
                                        </th>
                                        <td class="px-6 py-4 capitalize">
                                            {item.amount}
                                        </td>
                                        <td class="px-6 py-4 capitalize">
                                            {item.category}
                                        </td>
                                        <td class="px-6 py-4 capitalize">
                                            {item.description}
                                        </td>

                                        <td class="px-6 py-4 capitalize">
                                            {new Date(item.createdAt).getDate() + '/' + new Date(item.createdAt).getMonth() + '/' + new Date(item.createdAt).getFullYear()}
                                        </td>
                                        <td class="flex items-center px-6 py-4 space-x-3">
                                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => { setShowModal(true); setEditItem(item); }}>Edit</a>
                                            <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => { setId(item._id); setToggle(true) }}>Remove</a>
                                        </td>
                                    </motion.tr>
                                })
                                : <td colSpan={6}>
                                    <p className="text-center text-gray-500 py-6">No Transactions found!</p>
                                </td>
                        }
                    </tbody>
                </table>
            </div>
            {toggle && <DeleteTransaction deletePost={deletePost} setToggle={setToggle} />}
        </motion.div>
    )
}

export default Transactions 