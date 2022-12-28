const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')

dotenv.config()
const app = express()

const api = process.env.API_URL 


app.use(express.json())
app.use(morgan('tiny'))


app.get(`${api}/products`, (req, res) => {
    res.send('hello world')
})

app.listen(3000,()=>{
    console.log(api)
    console.log('listening on port 3000')
})


module.exports = app