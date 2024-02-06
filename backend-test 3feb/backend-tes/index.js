import express from 'express'
import AllRoutes from './Routers/index.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'


const app=express()
app.use(express.json())
dotenv.config()
app.use(cors())

app.get('/',(req,res)=>{
    res.send('welcome...')
})

app.use('/api/v1',AllRoutes)

mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("DataBASE CONNECTED")
})
app.listen(8000,()=>{
    console.log("port runing on 8000")
})

