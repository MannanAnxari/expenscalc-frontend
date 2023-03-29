import React from 'react'
import Carousel from '../components/Carousel' 
import ProductCard from '../components/ProductCard'

const Home = () => {
    return (
        <>
            <Carousel />
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-6">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
                Home
            </div>
        </>
    )
}

export default Home