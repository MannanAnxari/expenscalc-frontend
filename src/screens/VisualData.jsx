import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import Chart from '../components/Chart';
import Spinner from '../components/Spinner';
import TransactionItem from '../components/TransactionItem';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion'
import DateCalendar from '../components/DateCalendar';

const getTransactions = async (json) => {
    const { data } = await axios.post('https://expenscalc-server.vercel.app/api/dashboard/get-transactions', json);
    return data;
};

function calculateSum(array, property, itm) {
    let sum = 0;

    array.forEach(element => {
        sum += element.paid_from === itm ? parseInt(element[property]) : 0
    });
    return sum;
}

const VisualData = () => {
    const { user } = useContext(AppContext);
    const [openTab, setOpenTab] = useState(1);
    const [chartList, setChartList] = useState([]);
    const [flatData, setFlatData] = useState([]);
    const [dta, setDta] = useState([]);
    const [toggleDate, setToggleDate] = useState(false);
    const [filteredData, setFilteredData] = useState({ savings: [], bank: [], cash: [] });

    // const [data, setData] = useState([]);
    const [data, setData] = useState({ savings: [], bank: [], cash: [] });

    const { mutate, isLoading } = useMutation(getTransactions, {
        onSuccess: (json) => {
            if (json.success) {
                // setData(json?.data);
                let itm = { savings: [], bank: [], cash: [] };
                setDta(json?.data)
                json?.data?.map((item) => {
                    itm[item.paid_from].push(item);
                })

                setData(itm);
                setFilteredData(itm);

                setFlatData(json?.data);

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


    const [dates, setDates] = useState({ startDate: new Date(), endDate: new Date() })


    const handleSelect = ({ selection }) => {


        setDates({ startDate: selection.startDate, endDate: selection.endDate });

        let itm = { savings: [], bank: [], cash: [] };

        dta?.map((item) => {

            if (new Date(item.createdAt) >= dates.startDate && new Date(item.createdAt) <= dates.endDate) {
                itm[item.paid_from].push(item);
            }

        })

        setFilteredData(itm);


        // console.log({ st: selection.startDate, ed: selection.endDate, acDt: new Date('2023-03-31T12:47:00.313+00:00') });

        let filtered = dta.filter(item => new Date(item.createdAt) >= dates.startDate && new Date(item.createdAt) <= dates.endDate);


        // setFilteredData(filtered.length === 0 ? { savings: [], bank: [], cash: [] } : filtered);

        setChartList([calculateSum(itm.cash, 'amount', 'cash'), calculateSum(itm.savings, 'amount', 'savings'), calculateSum(itm.bank, 'amount', 'bank')])

    }


    return (
        <>
            {isLoading ?
                <div className="w-full">
                    <Spinner />
                </div>
                :
                <div className="w-full grid md:grid-cols-2">
                    <Chart chartData={chartList} />
                    <div className='p-4'>
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
                                onClick={() => {
                                    setFilteredData(data);
                                    setChartList([calculateSum(flatData, 'amount', 'cash'), calculateSum(flatData, 'amount', 'savings'), calculateSum(flatData, 'amount', 'bank')])
                                }}
                            >
                                Remove Filter
                            </motion.button>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="w-full">
                                <ul className="grid grid-cols-3 mb-0 list-none  pt-3 pb-4 flex-row" role="tablist">
                                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center ">
                                        <a
                                            className={"sm:text-xs text-[8px] font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal "}
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
                                            className={"sm:text-xs text-[8px] font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal "}
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
                                            className={"sm:text-xs text-[8px] font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal "}
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
                                                {filteredData?.cash.length
                                                    ?
                                                    filteredData?.cash?.map((item, i) => <TransactionItem key={i} item={item} />)
                                                    :
                                                    <div className="px-6 py-3 max-w-full mx-0 bg-white hover:bg-gray-50 transition-all cursor-pointer rounded-md my-2 shadow-lg flex items-center flex-col">
                                                        <div className=''>
                                                            <p className="text-sm font-medium text-black">No Transactions found!</p>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                                {filteredData?.savings.length
                                                    ?
                                                    filteredData?.savings?.map((item, i) => <TransactionItem key={i} item={item} />)
                                                    :
                                                    <div className="px-6 py-3 max-w-full mx-0 bg-white hover:bg-gray-50 transition-all cursor-pointer rounded-md my-2 shadow-lg flex items-center flex-col">
                                                        <div className=''>
                                                            <p className="text-sm font-medium text-black">No Transactions found!</p>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                                {filteredData?.bank.length
                                                    ?
                                                    filteredData?.bank?.map((item, i) => <TransactionItem key={i} item={item} />)
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
                </div>}
            {toggleDate && <DateCalendar handleSelect={handleSelect} dates={dates} setToggleDate={setToggleDate} />}
        </>
    )
}

export default VisualData