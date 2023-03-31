import React from 'react'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { motion } from 'framer-motion'

const DateCalendar = ({ handleSelect, dates, setToggleDate }) => {
    const selectionRange = {
        startDate: dates.startDate,
        endDate: dates.endDate,
        key: 'selection',
    }
    return (
        <div className="fixed bg-black/50 w-full h-full z-20 left-0 top-0" >
            <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6" >
                <motion.button whileTap={{ scale: 0.95 }} className="absolute bg-red-500 hover:bg-red-600 active:bg-red-800 transition-all top-2 right-2 transform text-white p-1 rounded-lg flex flex-col gap-6" onClick={() => setToggleDate(false)}>
                    <svg className="h-6 w-6 " fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </motion.button>
                <DateRangePicker
                    onClick={() => setToggleDate(true)}
                    controls={['calendar', 'time']}
                    ranges={[selectionRange]}
                    maxDate={new Date()}
                    onChange={handleSelect}
                />

                {/* <Datepicker
                    value={dates} 
                    useRange={true}
                    onChange={(date) => console.log(date)}
                /> */}

            </div>
        </div >
    )
}

export default DateCalendar