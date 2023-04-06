import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function PublicRoute() {
    const userEmail = localStorage.getItem('userEmail')
    const token=localStorage.getItem('token')
    //console.log(userData)
    if ((!userEmail) || (!token)) {
        return (<Outlet />)
    }
    else {
        return (
            <Navigate to='/pastsignin'/>
        )
    }
}
export default PublicRoute;