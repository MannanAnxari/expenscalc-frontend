const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://Mnan:Mannan.1@cluster0.wgz54f5.mongodb.net/expensapp';

const connectDB = async () => {
    try {
        // mongoose.set('strictQuery', false)
        mongoose.connect(MONGO_URI, { useNewUrlParser: true })

        // const dta = await mongoose.connection.db.collection("food_items");

        // dta.find({}).toArray((err, data) => {
        //     if (err) {
        //         console.log('err');
        //     }
        //     else {
        //         console.log(data);
        //     }
        // })

        // dd.connection.db.collection('food_items', function (err, collection) {
        //     const ddt = collection.find({})
        //     console.log(ddt);
        // });
        // console.log(dta);
        // console.log(dd);
        console.log('Connected!');
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

module.exports = connectDB;