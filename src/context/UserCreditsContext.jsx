import { useAuth } from "@clerk/react";
import { createContext, useCallback, useEffect, useState } from "react";
import { getUserCredits } from "../services/UserService";

export const userCreditsContext = createContext();

export const UserCreditsProvider = ({children})=>{
    
    const[credits, setCredits] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const {getToken, isSignedIn} = useAuth();

    const fetchUserCredits =useCallback(async()=>{

        if(!isSignedIn) return;

        const token = await getToken();
        setIsLoading(true);

        try{
            const response = await getUserCredits(token);
            console.log(response.data.credits);

            setCredits(response.data.credits);
        }catch(error){
            console.error("Error fetching token.")
        }
        finally{
            setIsLoading(false);
        }
    },[getToken, isSignedIn]);

    useEffect(()=>{
        if(isSignedIn)
            fetchUserCredits();

    },[isSignedIn, fetchUserCredits])

    const contextValue = {
        credits,
        setCredits,
        fetchUserCredits
    }
    return (
        <userCreditsContext.Provider value={contextValue}>
            {children}
        </userCreditsContext.Provider>
    )
}