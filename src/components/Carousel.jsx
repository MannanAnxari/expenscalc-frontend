import React from 'react'
import { motion } from 'framer-motion'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: (
            <button type="button" className="absolute before:hidden top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg aria-hidden="true" className="w-6 h-6 text-white dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
        ),
        nextArrow: (
            <button type="button" className="absolute before:hidden top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg aria-hidden="true" className="w-6 h-6 text-white dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        ),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (

        <div className="relative w-full mb-8">
            <Slider {...settings} className="relative h-96">
                <div className="duration-700 ease-in-out">
                    <img src="https://source.unsplash.com/random/900x300/?kawasaki" alt="carousel item" className='w-full h-96 object-cover' />
                </div>
                <div className="duration-700 ease-in-out">
                    <img src="https://source.unsplash.com/random/900x300/?kawasaki" alt="carousel item" className='w-full h-96 object-cover' />
                </div>
                <div className="duration-700 ease-in-out">
                    <img src="https://source.unsplash.com/random/900x300/?kawasaki" alt="carousel item" className='w-full h-96 object-cover' />
                </div>
                <div className="duration-700 ease-in-out">
                    <img src="https://source.unsplash.com/random/900x300/?kawasaki" alt="carousel item" className='w-full h-96 object-cover' />
                </div>
                <div className="duration-700 ease-in-out">
                    <img src="https://source.unsplash.com/random/900x300/?kawasaki" alt="carousel item" className='w-full h-96 object-cover' />
                </div>
                <div className="duration-700 ease-in-out">
                    <img src="https://source.unsplash.com/random/900x300/?kawasaki" alt="carousel item" className='w-full h-96 object-cover' />
                </div>
            </Slider>

            <motion.div animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: .8 }}
                transition={{ ease: "easeOut", delay: .2 }}
            >


                {/* <form className='absolute bottom-6 left-6 right-6'> */}
                <form className='m-4'>
                    <div className="w-full">
                        <label for="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input type="search" id="search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                            <motion.button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-md text-sm px-4 py-2 " whileTap={{ scale: 0.95 }}>Search</motion.button>
                        </div>
                    </div>
                </form>
            </motion.div>

        </div>

    )
}

export default Carousel