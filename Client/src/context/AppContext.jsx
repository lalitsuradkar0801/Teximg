import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {   // ✅ FIX 4: destructure children

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(0); 
  const navigate = useNavigate()
  const loadCreditsData= async() =>{
   try {
       const{data}= await axios.get(backendUrl + '/api/user/credits',{headers:{token}})

       if(data.success){
         setCredit(data.credits)
         setUser(data.user)
       }
   } catch (error) {
      console.log(error)
      toast.error(error.message)
   }
  }
  const loadUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: { token },
      });

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Failed to load user data"
      );
    }
  };

  const generateImage = async(prompt)=>{
   try {
   const {data} = await axios.post(backendUrl + '/api/image/generate-image',{prompt}, 
      {headers:{token}})

      if(data.success){
         loadCreditsData()
         return data.resultImage
      }else{
         toast.error(data.message)
         loadCreditsData()
         if(data.creditBalance===0){
           navigate('/buy') 
         }
      }
   } catch (error) {
      toast.error(error.message)
   }
  }

  // ✅ FIX 5: centralized logout — clears all auth state
  const logout = () => {
    localStorage.removeItem("token");
    setToken('');
    setUser('');
  };

  // ✅ FIX 2: re-fetch user data whenever token changes (on login or page refresh)
  useEffect(() => {
    if (token) {
      loadUserData();
    }
  }, [token]);

  useEffect(()=>{
      if(token){
         loadCreditsData()
      }
  },[token])
  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    token,
    setToken,
    credit,
    setCredit,
    backendUrl,
    loadUserData, // ✅ FIX 3: exposed so components can refresh credits
    logout,     // ✅ FIX 5: exposed for use in Navbar / profile menu
    loadCreditsData,
    generateImage
  };

  return (
    <AppContext.Provider value={value}>
      {children}  {/* ✅ FIX 4: use destructured children */}
    </AppContext.Provider>
  );
};

export default AppContextProvider;