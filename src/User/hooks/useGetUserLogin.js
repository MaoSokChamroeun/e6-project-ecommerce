// import axios from "axios"
// import { useState } from "react"

// const useGetUserLogin = () => {
//     const [userClientEmail , setUserClientEmail] = useState("")
//     try{
//         const token = sessionStorage.getItem("token")
//         const res = await axios.get(`http://localhost:4000/api/user/client/user-profile`,{
//             headers : {
//                 Authorization : `Bearer ${token}`
//             }
//         })
//         if(res.data.success){
//             const email = 
//         }
//     }catch(error){
//         console.log('Fetching fails' , error)
//     }
//     return {}
// }

// export default useGetUserLogin