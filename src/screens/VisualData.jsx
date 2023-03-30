import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import Chart from '../components/Chart';
import Spinner from '../components/Spinner';
import TransactionItem from '../components/TransactionItem';
import { AppContext } from '../context/AppContext';

const getTransactions = async (json) => {
    const { data } = await axios.post('https://expenscalc-server.vercel.app/api/dashboard/get-transactions', json);
    return data;
};

const VisualData = () => {
    const { user } = useContext(AppContext);
    const [openTab, setOpenTab] = useState(1);
    const [chartList, setChartList] = useState([])

    // const [data, setData] = useState([]);
    const [data, setData] = useState({ savings: [], bank: [], cash: [] });

    const { mutate, isLoading } = useMutation(getTransactions, {
        onSuccess: (json) => {
            if (json.success) {
                // setData(json?.data);
                let itm = { savings: [], bank: [], cash: [] };

                json?.data?.map((item) => {
                    itm[item.paid_from].push(item);
                })

                setData(itm);

                function calculateSum(array, property, itm) {
                    let sum = 0;
                    array.forEach(element => {
                        sum += element.paid_from === itm ? parseInt(element[property]) : 0
                    });
                    return sum;
                }
                setChartList([calculateSum(json?.data, 'amount', 'cash'), calculateSum(json?.data, 'amount', 'savings'), calculateSum(json?.data, 'amount', 'bank')])
            }
        },
        onError: (err) => {
            toast.error(err.response?.data?.message);
        },
    });

    useEffect(() => {

        mutate({ userid: user?.data?._id });

    }, []);




    return (
        isLoading ?
            <div className="w-full">
                <Spinner />
            </div>
            :
            <div className="w-full grid md:grid-cols-2">
                <Chart chartData={chartList} />
                <div className='p-4'>
                    <div className="flex flex-wrap">
                        <div className="w-full">
                            <ul className="grid grid-cols-3 mb-0 list-none  pt-3 pb-4 flex-row" role="tablist"  >
                                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center ">
                                    <a
                                        className={"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal "}
                                        style={
                                            openTab === 1
                                                ?
                                                {
                                                    background: 'rgba(255, 195, 0, 1)',
                                                    color: 'white'
                                                } :
                                                {
                                                    background: 'white'
                                                }
                                        }
                                        onClick={e => {
                                            e.preventDefault();
                                            setOpenTab(1);
                                        }}
                                        data-toggle="tab"
                                        href="#link1"
                                        role="tablist"
                                    >
                                        Cash
                                    </a>
                                </li>
                                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                    <a
                                        className={"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal "}
                                        style={
                                            openTab === 2
                                                ?
                                                {
                                                    background: 'rgba(255, 99, 132, 1)  ',
                                                    color: 'white'
                                                } :
                                                {
                                                    background: 'white'
                                                }
                                        }
                                        onClick={e => {
                                            e.preventDefault();
                                            setOpenTab(2);
                                        }}
                                        data-toggle="tab"
                                        href="#link2"
                                        role="tablist"
                                    >
                                        Savings
                                    </a>
                                </li>
                                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                    <a
                                        className={"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal "}
                                        style={
                                            openTab === 3
                                                ?
                                                {
                                                    background: 'rgba(54, 162, 235, 1)',
                                                    color: 'white'
                                                } :
                                                {
                                                    background: 'white'
                                                }
                                        }
                                        onClick={e => {
                                            e.preventDefault();
                                            setOpenTab(3);
                                        }}
                                        data-toggle="tab"
                                        href="#link3"
                                        role="tablist"
                                    >
                                        Bank Account
                                    </a>
                                </li>
                            </ul>
                            <div >
                                <div className="  flex-auto">
                                    <div className="tab-content tab-space">
                                        <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                            {data?.cash.length
                                                ?
                                                data?.cash?.map((item, i) => <TransactionItem key={i} item={item} />)
                                                :
                                                <div className="px-6 py-3 max-w-full mx-0 bg-white hover:bg-gray-50 transition-all cursor-pointer rounded-md my-2 shadow-lg flex items-center flex-col">
                                                    <div className=''>
                                                        <p className="text-sm font-medium text-black">No Transactions found!</p>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                            {data?.savings.length
                                                ?
                                                data?.savings?.map((item, i) => <TransactionItem key={i} item={item} />)
                                                :
                                                <div className="px-6 py-3 max-w-full mx-0 bg-white hover:bg-gray-50 transition-all cursor-pointer rounded-md my-2 shadow-lg flex items-center flex-col">
                                                    <div className=''>
                                                        <p className="text-sm font-medium text-black">No Transactions found!</p>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                            {data?.bank.length
                                                ?
                                                data?.bank?.map((item, i) => <TransactionItem key={i} item={item} />)
                                                :
                                                <div className="px-6 py-3 max-w-full mx-0 bg-white hover:bg-gray-50 transition-all cursor-pointer rounded-md my-2 shadow-lg flex items-center flex-col">
                                                    <div className=''>
                                                        <p className="text-sm font-medium text-black">No Transactions found!</p>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
            </div>

    )
}

export default VisualData