
const serviceRouter=require('express').Router()
const {connection} = require('../database/connection')
const {createServiceTable, getServiceDetailsBetweenTimeRange,insertIntoService, getServices, getAllServices, updateServiceStatus, getMaxRevenueByCity, getMaxRevenueByService} = require('../database/serviceQueries')

serviceRouter.post('/bookService',async (req,res)=>{
    const {name,username,make,model,year,licensePlate,mileage, city,
    lastServiceDate, cost, serviceType
    }=req.body;
    
    console.log(name,username,make,model,year,licensePlate,mileage, city,
        lastServiceDate, cost, serviceType)
    // if(!name||!username)
    // {
    //    return res.status(200).send({err:"All fields are required"});
    // }

    
       await createServiceTable()
       await insertIntoService(req.body)
    //     await insertIntoUser(name, username, passwordHash, "user")
        
   
        return res.end("User Created")
    
    
})

serviceRouter.get('/getServices',async(req,res)=>{
    const username = req.query.username;
    let services = await getServices(username)
    res.send({data:services})
    
})

serviceRouter.get('/getAllServices',async(req,res)=>{
    
    let services = await getAllServices()
    res.send({data:services})
    
})

serviceRouter.put('/updateStatus',async(req,res)=>{
    let id=req.query.id;
    let status=req.query.status
    let services = await updateServiceStatus(id,status)
    return res.send({data:services})
   
})

serviceRouter.get('/getServicesBetween',async(req,res)=>{
    let fromDate = req.query.startDate;
    let toDate = req.query.endDate;
    const resp=await getServiceDetailsBetweenTimeRange(fromDate, toDate);
    const cityRevenue = await getMaxRevenueByCity(fromDate, toDate)
    const serviceRevenue = await getMaxRevenueByService(fromDate,toDate)
    
    return res.send({
        data:resp,
        revenueByCity:cityRevenue,
        revenueByService: serviceRevenue
    })
})
let fun=async()=>{
 let x= await getAllServices()
 console.log(x)
}
//fun()







module.exports=serviceRouter