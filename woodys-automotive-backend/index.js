const express=require('express')
const cors=require('cors')
const bodyParser = require('body-parser')
//require('dotenv').config({path:'./.env'})
const dotenv=require('dotenv')
app = express();
const postRouter=require('./controllers/posts')
const loginRouter=require('./controllers/login')
const signUpRouter=require('./controllers/signup')
const serviceRouter= require('./controllers/service')
const mongoose=require('mongoose')
const User=require('./models/user')
//app.use(bodyParser)
dotenv.config()
app.use(cors())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use('/login',loginRouter)
app.use('/signup',signUpRouter)
app.use('/service',serviceRouter)


const PORT = process.env.PORT || 3007;

//MONGODB_URI="mongodb+srv://vikas_raria:raria123@cluster0.7lq1c.mongodb.net/Memories?retryWrites=true&w=majority"
mongoose.Memories=mongoose.connect('mongodb://localhost:27017/woodysDB')
.then(()=>{
    console.log("Connected to MongoDB")
    })
app.get('/',(req,res)=>{
    res.end("Working")
})

app.listen(PORT, ()=>{
    console.log("server is running on port ", PORT)
})
