const express = require('express')
const connectDB = require('./config/db')
const app = express()

//Connecting DB
connectDB()

app.get('/',(req,res) => res.send('API Running'))

const PORT = process.env.ROOT || 6000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))
