import React from 'react'
import { motion } from 'framer-motion'

const TransactionItem = ({ item }) => {
    return (
        <motion.div animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: .8 }}
            transition={{ ease: "easeOut", delay: .2 }}
        >

            <div className="px-6 py-3 max-w-full mx-0 bg-white hover:bg-gray-50 transition-all cursor-pointer rounded-md my-2 shadow-lg flex items-center flex-col">
                <div className='w-full flex justify-between items-center'>
                    <p className="sm:text-xl text-md font-medium text-black">Amount: {item.amount}</p>
                    <p className="sm:text-md text-xs text-black">Category: {item.category}</p>
                </div>
                <div className="w-full flex justify-between items-center">
                    <p className="text-slate-500 sm:text-sm text-xs">{item.description}</p>
                    <p className="text-slate-500 text-xs">{new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
            </div>

        </motion.div>
    )
}

export default TransactionItem