const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose');
const productRouter = require('./routers/product')
const categoryRouter = require('./routers/category')
const userRouter = require('./routers/user')
const orderRouter = require('./routers/order')


dotenv.config()
const app = express()

const api = process.env.API_URL 


app.use(express.json())
app.use(morgan('tiny'))

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL,   {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName:'MyStore',
  })
.then(()=>{
    console.log('database connection established')
})
.catch(err=>{
    console.log('error connecting to database')
})


app.use(`${api}/products`,productRouter)
app.use(`${api}/users`,userRouter)
app.use(`${api}/categories`,categoryRouter)
app.use(`${api}/orders`,orderRouter)


app.listen(3000,()=>{
    console.log('listening on port 3000')
})


module.exports = app