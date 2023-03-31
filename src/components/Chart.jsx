
import Chartt from "react-apexcharts";
import { motion } from 'framer-motion'

function Chart({ chartData }) {
    return (
        <motion.div animate={{ opacity: 1, scale: 1, rotate: 0 }}
            initial={{ opacity: 0, scale: .8, rotate: -60 }}
            transition={{ ease: "easeOut", delay: .2 }} className="relative md:order-first order-2 ">
            <Chartt
                type="pie"

                series={chartData}

                options={
                    {
                        stroke: {
                            colors: ['#eee'],
                            width: 2
                        },
                        colors: ['rgb(255, 195, 0)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
                        labels: ['Cash', 'Savings', 'Bank Account'],
                        noData: { text: "Empty Data" },
                    }}
            >
            </Chartt>
        </motion.div>
    )
}



export default Chart