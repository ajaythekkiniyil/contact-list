const express = require('express')
const app = express()
const mongoose = require('mongoose')
const contactRouter = require('./routes/contact')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()
app.use(bodyParser.json())
app.use(cors())

app.use('/api', contactRouter)

// mongodb connection and server listening
const port =  process.env.PORT || 3002;
mongoose.connect(process.env.mongoUrl)
.then(()=>{
    app.listen(port, ()=> console.log(`Conneted to database & Server listening on port ${port}.`))
})
.catch(err=> console.log('Mongodb connection error'))

