import { motion } from 'framer-motion'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Home = () => {
    const { user } = useContext(AppContext);

    return (
        <>

            <div id="wrapper" class="grid grid-cols-1 xl:grid-cols-2 xl:h-screen">
                <div id="col-1" class="bg-gray-900 px-12 pt-32 pb-40 md:px-32 xl:py-64 xl:px-32">
                    <h1 class="text-blue-500 font-extrabold text-4xl md:text-6xl">The <br />
                        ExpenZ
                    </h1>
                    <p class="text-white text-normal md:text-3xl pt-3 md:pt-6 font-medium">Don't you understand where the money goes?</p>
                </div>
                <div id="col-2" class="px-3 md:px-20 xl:py-64 xl:px-12">

                    <div id="cards" class="rounded-lg flex border py-5 px-6 md:py-8 md:px-16 -mt-6 bg-white xl:-ml-24 xl:pl-8 xl:rounded-xl shadow-xl">
                        <div id="circle" class="w-8 h-8 bg-gray-500 md:w-16 md:h-16 rounded-full"></div>
                        <p class="pl-4 md:pl-12 text-base pt-1 font-semibold md:text-2xl md:pt-4">“It’s truly awesome, man!”</p>
                    </div>

                    <div id="cards" class="rounded-lg flex border items-center py-5 px-6 md:py-8 md:px-6 mt-6 md:mt-12 shadow-xl bg-white xl:rounded-xl justify-between">
                        <div className='flex items-center'>
                            <div id="circle" class="w-8 h-8 bg-gray-500 md:w-16 md:h-16 rounded-full"></div>
                            <p class="pl-4 md:pl-6 text-base font-semibold md:text-2xl">{user?.data ? "Goto Dashboard..." : "Don't have an account?"}</p>
                        </div>
                        <Link to={`${user?.data ? '/dashboard' : '/register'}`}>
                            <motion.button
                                className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none font-medium rounded-md text-sm px-4 py-2 transition-all"
                                whileTap={{ scale: 0.95 }}
                            >
                                {user?.data ? 'Dashboard' : 'Register'}
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home