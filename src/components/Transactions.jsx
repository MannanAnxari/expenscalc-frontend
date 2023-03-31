import axios from 'axios';
import { motion } from 'framer-motion'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import { AppContext } from '../context/AppContext';
import DateCalendar from './DateCalendar';
import DeleteTransaction from './DeleteTransaction';
import EditModal from './EditModal';
import Spinner from './Spinner';

const getTransactions = async (json) => {
    const { data } = await axios.post('https://expenscalc-server.vercel.app/api/dashboard/get-transactions', json);
    return data;
};

const Transactions = () => {
    const { dispatch, user, addAssets } = useContext(AppContext);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [editItem, setEditItem] = useState([]);
    const [id, setId] = useState('');
    const [showModal, setShowModal] = React.useState(false);
    const [toggle, setToggle] = useState(false);
    const [toggleDate, setToggleDate] = useState(false);

    const { mutate, isLoading } = useMutation(getTransactions, {
        onSuccess: (json) => {
            if (json.success) {
                setData(json?.data);
                setFilteredData(json?.data);
            }
        },
        onError: (err) => {
            toast.error(err.response?.data?.message);
        },
    });

    useEffect(() => {

        mutate({ userid: user?.data?._id });

    }, []);

    const deleteTransactionFunc = useMutation(
        async (id) => await axios.post('https://expenscalc-server.vercel.app/api/dashboard/delete-transaction', { data: id, userid: user?.data?._id }),
        {
            onError: (error) => {
                console.log(error);
                toast.error('Something went wrong!!');
            },
            onSuccess: (json) => {
                setData(data.filter(item => item._id != json?.data?.id));
                setFilteredData(data.filter(item => item._id != json?.data?.id));
                toast.success('Transaction Deleted Successfully!');
                dispatch(addAssets(json?.data?.asset));
            }
        }
    )

    const deleteTransaction = () => {

        deleteTransactionFunc.mutate(id);

    }

    const [dates, setDates] = useState({ startDate: new Date(), endDate: new Date() })

    const handleSelect = ({ selection }) => {

        setDates({ startDate: selection.startDate, endDate: selection.endDate });

        let filtered = data.filter(item => new Date(item.createdAt) >= dates.startDate && new Date(item.createdAt) <= dates.endDate);

        setFilteredData(filtered);

    }

    return (

        <motion.div animate={{ opacity: 1, scale: 1, translateY: 0 }}
            initial={{ opacity: 0, scale: .8, translateY: 100 }}
            transition={{ ease: "easeOut", delay: .1 }} className='w-full' >
            <EditModal showModal={showModal} setShowModal={setShowModal} editItem={editItem} />
            <div className="sm:w-3/4 w-5/6 mx-auto">
                <h1 className="text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl my-12">Transactions History</h1>
                <div className="flex gap-6 mb-6 justify-between">
                    <motion.button
                        className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none font-medium rounded-md text-sm px-4 py-2 transition-all"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setToggleDate(true)}
                    >
                        Set Filter
                    </motion.button>
                    <motion.button
                        className="text-white bg-red-500 hover:bg-red-600 focus:outline-none font-medium rounded-md text-sm px-4 py-2 transition-all"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilteredData(data)}
                    >
                        Remove Filter
                    </motion.button>
                </div>
                <table className="text-sm text-left text-gray-500 relative overflow-x-auto table-auto shadow-md">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th className="md:px-6 sm:text-sm px-2 text-[6px] py-3">
                                Account
                            </th>
                            <th className="md:px-6 sm:text-sm px-2 text-[6px] py-3">
                                Amount
                            </th>
                            <th className="md:px-6 sm:text-sm px-2 text-[6px] py-3">
                                Category
                            </th>
                            <th className="md:px-6 sm:text-sm px-2 text-[6px] py-3">
                                Description
                            </th>
                            <th className="md:px-6 sm:text-sm px-2 text-[6px] py-3">
                                Date
                            </th>
                            <th className="md:px-6 sm:text-sm px-2 text-[6px] py-3">
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
                            filteredData.length ?
                                filteredData?.map((item, i) => {
                                    return <motion.tr key={i} animate={{ opacity: 1, scale: 1, translateY: 0 }}
                                        initial={{ opacity: 0, scale: .8, translateY: 10 }}
                                        transition={{ ease: "easeOut", delay: .2 }} className='bg-white border-b hover:bg-gray-50' >
                                        <th className="capitalize md:px-6 sm:text-sm px-2 text-[6px] leading-normal py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.paid_from === 'savings' ? 'Savings' : item.paid_from === 'bank' ? 'Bank Account' : 'Cash'}
                                        </th>
                                        <td className="md:px-6 sm:text-sm px-2 text-[6px] leading-normal py-4 capitalize">
                                            {item.amount}
                                        </td>
                                        <td className="md:px-6 sm:text-sm px-2 text-[6px] leading-normal py-4 capitalize">
                                            {item.category}
                                        </td>
                                        <td className="md:px-6 sm:text-sm px-2 text-[6px] leading-normal py-4 capitalize">
                                            {item.description}
                                        </td>

                                        <td className="md:px-6 sm:text-sm px-2 text-[6px] leading-normal py-4 capitalize">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="flex items-center md:px-6 sm:text-sm px-2 text-[6px] leading-normal py-4 space-x-3">
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => { setShowModal(true); setEditItem(item); }}>Edit</a>
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => { setId(item._id); setToggle(true) }}>Remove</a>
                                        </td>
                                    </motion.tr>
                                })
                                : <td colSpan={6}>
                                    <p className="text-center text-gray-500 py-6 md:px-6 sm:text-sm text-[6px] ">No Transactions found!</p>
                                </td>
                        }
                    </tbody>
                </table>
            </div>

            {toggle && <DeleteTransaction deleteTransactions={deleteTransaction} setToggle={setToggle} />}

            {toggleDate && <DateCalendar handleSelect={handleSelect} dates={dates} setToggleDate={setToggleDate} />}
        </motion.div>
    )
}

export default Transactions 