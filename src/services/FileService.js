import toast from "react-hot-toast";
import api from "../api"

export const fetchFiles = async(token)=>{
    try{
        const response = await api.get("/files/my-files", {headers:{
            'Authorization': `Bearer ${token}`
        }});

        if(response.status==200){
            console.log(response);
    
            toast.success("Files fetched successfully")
            return response.data;
        }

    }catch(error){
        console.log("Error Fetching files: ", error.message);
        toast.error("Error fetching files. Please try again later")

    }
}

export const toggleView = async(token,fileId)=>{
    try{
        const response = await api.patch(`/files/${fileId}/toggle-public` , {}, {headers:{
            'Authorization': `Bearer ${token}`
        }});

        if(response.status==200){
            console.log(response);
            return response.data;
        }

    }catch(error){
        console.log("Error Toggling files: ", error.message);
        toast.error("Error Toggling files. Please try again later")

    }
}

export const DownloadFile = async(token,fileId)=>{
    try{
        const response = await api.get(`/files/download/${fileId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            responseType: 'blob'
        });

        console.log(response);
        return response.data;

    }catch(error){
        console.log("Error Downloading files: ", error.message);
        toast.error("Error Downloading files. Please try again later")

    }
}

export const DeleteFile = async(token,fileId)=>{
    try{
        const response = await api.delete(`/files/delete/${fileId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            responseType: 'blob'
        });

        if(response.status===204){
            toast.success("File Deleted Successfully")
        }
        else{
            toast.error("Error Deleting the file");
            return;
        }

        return response;

    }catch(error){
        console.log("Error Deleting the file: ", error.message);
        toast.error("Error Deleting the file. Please try again later")

    }
}