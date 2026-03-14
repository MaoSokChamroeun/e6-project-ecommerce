import axios from "axios"
import { useEffect, useState } from "react";

const useGetAllProduct = () => {
    const [productFront , setProductFront] = useState([]);
    const [loading , setLoading] = useState(false);
    const getAllProductFront = async() => {
        setLoading(true)
        try{
           
            const res = await axios.get('http://localhost:4000/api/product/client/public');
            if(res.data.success){
                setLoading(false)
                setProductFront(res.data.data)
            }else{
                console.log('Product fails');
            }
        }catch(error){
            console.log('Fetching fails' , error)
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getAllProductFront()
    },[])
    return {productFront , loading}
}

export default useGetAllProduct