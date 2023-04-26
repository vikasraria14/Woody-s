import axios from 'axios';

//const url1="http://192.168.1.8:3001/";
//const url="http://192.168.1.8:3001/login"
//const url1="https://my-memories-app14.herokuapp.com/"
const url1 = "http://127.0.0.1:3007/"
export const getAll=async()=>{
    const res=await axios.get(url1)
    return res;
}

export const setLogin=async(data)=>{
    
    const url=url1+"login"
    console.log(url)
    const res=await axios.post(url,data);
    
    return res.data;
}

export const setSignUp=async(data)=>{

    const url=url1+"signup";
    console.log(url)
    const res=await axios.post(url,data);
    return res.data;
}

export const getPosts=async(token)=>{
    const url=url1+"posts";
    const res=await axios.get(url,{headers:{'Authorization':`Bearer ${token}`}})
    
    return res.data;
}

export const setPosts=async(data,token)=>{
    const url=url1+"posts";
    const res=await axios.post(url,data,{headers:{'Authorization':`Bearer ${token}`}})
    return res.data;
}

export const deletePost=async(id,token)=>{
    const url=url1+"posts/delete/"+id;
    const res=await axios.delete(url,{headers:{'Authorization':`Bearer ${token}`}})
    return res.data;
}

export const likePost=async(id)=>{
    const url=url1+"posts/like/"+id;
    
    const res=await axios.patch(url);
    
    return res.data;
}

