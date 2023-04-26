import axios from 'axios';

//const url1="http://192.168.1.8:3001/";
//const url="http://192.168.1.8:3001/login"
//const url1="https://my-memories-app14.herokuapp.com/"
const url1 = "http://127.0.0.1:3007/service/"

export const bookService=async(data)=>{
    
    const url=url1+"bookService"
    const res=await axios.post(url,data);    
    return res.data;
}
export const getServices=async(data)=>{    
    const url=url1+`getServices/?username=${data}`
    const res=await axios.get(url,data);    
    return res.data;
}

export const getAllServices= async(data)=>{
    const url=url1+"getAllServices"
    const res=await axios.get(url);    
    return res.data;
}

export const updateService= async(id,status)=>{
    const url=url1+`updateStatus?id=${id}&status=${status}`
    const res=await axios.put(url);    
    return res.data;
}

export const getServicesBetween= async(startDate,endDate)=>{
    const url=url1+`getServicesBetween?startDate=${startDate}&endDate=${endDate}`
    console.log(url)
    const res=await axios.get(url);    
    return res.data;
}






