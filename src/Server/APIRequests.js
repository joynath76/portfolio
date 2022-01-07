import Axios from "axios";

export const postCall = (routePath,Data,id) => {
    const token = localStorage.getItem("token");
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    return Axios.post(routePath, Data, {
        headers: headers
    })
    .then(res => {
        return id === 'projectId' ? res.data.projectId : 
               id === 'educationId' ? res.data.educationId :
               id === 'experienceId' ? res.data.experienceId :
               id === 'token' ? res.data.token :
               res.data ;
        
    })
}

export const getCall = (routePath) => {
   
    const token = localStorage.getItem("token");
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    return Axios.get(routePath,{
        headers
    })
    .then(res => {
        return res.data;
    })
    
}

export const uploadFile = (formData) => {
    const token = localStorage.getItem("token");
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
     return Axios.post('/upload/files',formData,{
        headers: headers
    })
    .then(res => {
        return res.data.fileUrl;
    })
    .catch(err => {
        console.error(err.response.data);
    });
}
export const deleteCall = (routePath) => {
    const token = localStorage.getItem("token");
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
     return Axios.delete(routePath,{
        headers: headers
    })
    .then(res => {
        return res.data.message;
    })
    .catch(err => {
        console.error(err.response.data);
    });
}
