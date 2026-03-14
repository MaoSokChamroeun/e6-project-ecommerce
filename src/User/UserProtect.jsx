import { Navigate } from "react-router-dom"

const UserProtect = ({children}) => {
    const token = sessionStorage.getItem("token")
    if(!token){
        return <Navigate to={'/user/signin'} replace />
    }

    return children
}

export default UserProtect