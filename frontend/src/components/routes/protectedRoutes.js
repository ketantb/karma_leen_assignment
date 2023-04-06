import { Outlet, Navigate } from 'react-router-dom'

function ProtectedRoute() {
    const userEmail = localStorage.getItem('userEmail')
    const token = localStorage.getItem('token')
    //console.log(userData)
    if (userEmail || token) {
        return (<Outlet />)
    }
    else {
        return (
            <Navigate to='/' />
        )
    }
}
export default ProtectedRoute;