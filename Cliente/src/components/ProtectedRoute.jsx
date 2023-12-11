import { Navigate, Outlet } from "react-router"
import { useAuth } from "../context/AuthContext"

function ProtectedRoute(){
    const { loading, isAuthenticated } = useAuth()
    console.log(loading, isAuthenticated)

    if(loading) return <h1>Loading...</h1>

    if(!loading && !isAuthenticated) return <Navigate to ='/login' replace />

    return <Outlet/>    // Sigue a la ruta que está contenida
}

export default ProtectedRoute