import {createContext, useCallback, useEffect, useState} from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const[user, setUser] = useState(null);
    const[registerError, setRegisterError] = useState(null);
    const[isRegisterLoading, setIsRegisterLoading] = useState(false);
    const[loginError, setLoginError] = useState(null);
    const[isLoginLoading, setIsLoginLoading] = useState(false);
    const[registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    })
    const[loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })
  
    console.log("User", user);
    console.log("loginInfo", loginInfo);

    useEffect(()=>{
        const user = localStorage.getItem("User")
        setUser(JSON.parse(user))
    }, [])


    //update RegisterIngo
    const updateRegisterInfo = useCallback((info)=>{
        setRegisterInfo(info)
    }, []);

    //Update LoginInfo
    const updateLoginInfo = useCallback((info)=>{
        setLoginInfo(info)
    }, []);


    //Register
    const registerUser = useCallback(async(e)=>{
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null)

       const response = await postRequest(
        `${baseUrl}/user/register`,
         JSON.stringify(registerInfo));

       setIsRegisterLoading(false);
       if(response.error){
        return setRegisterError(response);
       }
       localStorage.setItem("User", JSON.stringify(response))
       setUser(response)
    }, [registerInfo])


    //login
    const loginUser = useCallback(async(e)=>{
        e.preventDefault();
        setIsLoginLoading(true);
        setLoginError(null);

        const response = await postRequest(
            `${baseUrl}/user/login`,
             JSON.stringify(loginInfo));

            setIsLoginLoading(false);
             
             if(response.error){
                return setLoginError(response);
               }
    
       localStorage.setItem("User", JSON.stringify(response))
       setUser(response)
    },[loginInfo])


    //Logout
    const logoutUser = useCallback(()=>{
        localStorage.removeItem("User")
        setUser(null);
    })

    return <AuthContext.Provider 
    value={{
    user,
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
    logoutUser,
    loginUser,
    loginInfo,
    updateLoginInfo, 
    isLoginLoading, 
    loginError}}>
    {children}
    </AuthContext.Provider>
}