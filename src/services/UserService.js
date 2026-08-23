import api from "../api";

export const getUserCredits = async(token)=>{

    try{
        const response = await api.get("/credits/get-credits", {headers:{
            'Authorization': `Bearer ${token}`
        }});

        if(response.status===200){
            console.log(response);
            return response.data;
        }

    }catch(error){
        console.log("Error Fetching Credits: ", error.message);
        toast.error("Error Fetching Credits. Please try again later")

    }
}