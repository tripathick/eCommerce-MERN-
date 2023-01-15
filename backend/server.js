// const express = require('express')
// const dotenv = require('dotenv')
// const products = require('./data/products')

import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import { notFound , errorHandler } from './middleware/errorMiddleware.js'
// import products from './data/products.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'


dotenv.config()

connectDB()

// const app = express()
// app.use((req,res,next) => {
//     console.log(req.originalUrl)
//     next()
// })

const app = express()
// var cors = require('cors');
import cors from 'cors'

// use it before all route definitions
app.use(cors({origin: 'http://localhost:3000'}));

app.use(express.json())

app.get('/' , (req,res) => {
    res.send('Api Is Running on root Route.....');
})

app.use('/api/products' , productRoutes)
app.use('/api/users' , userRoutes)

app.use(notFound)

app.use(errorHandler)

// app.get('/api/products' , (req,res) => {
//     res.json(products);
// })

// // route for particular product by id
// app.get('/api/products/:id' , (req,res) => {
//     const product = products.find((p) => p._id === req.params.id)
//     res.json(product)
// })

const PORT = process.env.PORT || 5000
app.listen(PORT , console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))
