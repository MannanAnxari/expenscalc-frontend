const express = require('express')
const connectDB = require('./db');
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')

connectDB();

app.use(cors());
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// })
app.use(express.json());

app.get('/', (req, res) => {
    res.status(400).send('Hello World!')
})

app.use('/api', require('./Routes/authUser'))
app.use('/api/dashboard', require('./Routes/dashboard'))


if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/', (req, res) => {
        app.use(express.static(path.resolve(__dirname, 'build')));
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });

    app.get('/world', (req, res) => {
        res.json({
            hello: 'World'
        })
    })
}
else {

}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

