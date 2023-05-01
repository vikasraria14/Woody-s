const express=require('express')
const cors=require('cors')
const bodyParser = require('body-parser')
//require('dotenv').config({path:'./.env'})
const dotenv=require('dotenv')
app = express();

const loginRouter=require('./controllers/login')
const signUpRouter=require('./controllers/signup')
const serviceRouter= require('./controllers/service')


//app.use(bodyParser)
dotenv.config()
app.use(cors())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use('/login',loginRouter)
app.use('/signup',signUpRouter)
app.use('/service',serviceRouter)


const PORT = process.env.PORT || 3007;



app.listen(PORT, ()=>{
    console.log("server is running on port ", PORT)
})
