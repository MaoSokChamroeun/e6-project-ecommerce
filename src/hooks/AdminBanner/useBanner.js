import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const useBanner = () => {
  const [banner, setBanner] = useState([]);
  const [loading , setLoading] = useState(false)
  const getAllBanner = async () => {
    setLoading(true)
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/banner`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      if(res.data.success){
        setLoading(false)
        setBanner(res.data.data);
      }
    } catch (error) {
        console.log('Fetching fails' , error)
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getAllBanner()
  },[])
  return {banner , loading};
};

export default useBanner;
