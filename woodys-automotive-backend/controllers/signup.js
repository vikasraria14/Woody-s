const bcryptjs=require('bcryptjs');
const signUpRouter=require('express').Router()
const User=require('../models/user')
signUpRouter.get('/',(req,res)=>{
    res.end('Signup')
})
const {connection} = require('../database/connection')
const {createUserTable, insertIntoUser, searchUser} = require('../database/queries')
signUpRouter.post('/',async (req,res)=>{
    const {name,username,password}=req.body;
    
    if(!name||!username||!password)
    {
       return res.status(200).send({err:"All fields are required"});
    }

    const userExists=await searchUser(username)
    console.log(userExists)
    if(userExists[0]!==undefined)
    {
        
       return res.status(200).send({err:"User Already Exists"})
    }
        const saltRounds=10;
        const passwordHash=await bcryptjs.hash(password,saltRounds)
        console.log("here to register users")
        await createUserTable()
        await insertIntoUser(name, username, passwordHash, "user")
        
        const newUser=new User({name,username,password:passwordHash});
        await newUser.save();
        return res.end("User Created")
    
    
})




module.exports=signUpRouter