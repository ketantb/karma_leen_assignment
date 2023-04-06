import { useEffect, useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import './pastsignin.css'
import { FiEdit } from 'react-icons/fi';

const PastSignin = () => {
    const [userData, setUserData] = useState()

    const fetchUserData = async () => {
        try {
            axios.get(`http://localhost:3000/users?userEmail=${localStorage.userEmail}`)
                .then((data) => {
                    setUserData(data.data)
                })
        }
        catch (err) {
            console.log(err)
        }
    }

    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userEmail')
        navigate('/')
    }
    const [updateData, setUpdateData] = useState("")
    const [key, setKey] = useState('')
    const handleUpdate = (e, y) => {
        setKey(y)
        console.log(key)
        setUpdateData(userData[key])
        console.log(userData[key])
    }

    const handleEditData = () => {
        setUserData({ ...userData, [key]: updateData })
    }

    const updateDetails = async () => {
        try {
            await axios.put(`http://localhost:3000/update/${userData._id}`, userData)
                .then((data) => {
                    console.log(data.data.message)
                    if (data.data.message === 'updation successful!') {
                        fetchUserData()
                        setUpdateData("")
                    }
                })
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchUserData();
    }, [])

    // console.log(userData)
    if (!userData) {
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <>
            <section className='pastsignin-container'>
                <section>
                    <div>
                        <input className='edit-ip' type='text' value={updateData} onChange={(e) => setUpdateData(e.target.value)} />
                        <button id="update-btn" onClick={() => handleEditData()}>update</button>
                    </div>
                    <div>
                        <button id="update-details-btn" onClick={() => updateDetails()}>
                            Update Details
                        </button>
                    </div>
                </section>
                <table className='userData-list'>
                    <tbody>

                        <tr>
                            <td>First Name </td> <td>{userData?.firstName} </td>
                            <td className='edit-user-details' onClick={() => handleUpdate(userData?.firstName, "firstName")}><FiEdit /></td>
                        </tr>
                        <tr>
                            <td>Last Name </td> <td>{userData?.lastName}</td>
                            <td className='edit-user-details' onClick={() => handleUpdate(userData?.lastName, "lastName")}><FiEdit /></td>
                        </tr>
                        <tr>
                            <td>Mobile </td> <td> {userData?.mobile}</td>
                            <td className='edit-user-details' onClick={() => handleUpdate(userData?.mobile, "mobile")}><FiEdit /></td>
                        </tr>
                        <tr>
                            <td>Email </td> <td> {userData?.email}</td>
                            <td className='edit-user-details' onClick={() => handleUpdate(userData?.email, "email")}><FiEdit /></td>
                        </tr>
                        <tr>
                            <td>DOB </td> <td> {userData?.DOB}</td>
                            <td className='edit-user-details' onClick={() => handleUpdate(userData?.DOB, "DOB")}><FiEdit /></td>
                        </tr>
                        <tr>
                            <td>address1 </td> <td> {userData?.address1}</td >
                            <td className='edit-user-details' onClick={() => handleUpdate(userData?.address1, "address1")}><FiEdit /></td>
                        </tr>
                        {userData.address2 ?
                            <tr> <td>address2</td> <td>{userData?.address2}</td>
                                <td className='edit-user-details' onClick={() => handleUpdate(userData?.address2, "address2")}><FiEdit /></td></tr>
                            : null}
                        {userData.address3 ?
                            <tr> <td>address3</td> <td>{userData?.address3}</td>
                                <td className='edit-user-details' onClick={() => handleUpdate(userData?.address3, "address3")}><FiEdit /></td></tr>
                            : null}
                        {userData.address4 ?
                            <tr> <td>address4</td> <td>{userData?.address4}</td>
                                <td className='edit-user-details' onClick={() => handleUpdate(userData?.address4, "address4")}><FiEdit /></td></tr>
                            : null}
                        {userData.address5 ?
                            <tr> <td>address5</td> <td>{userData?.address5}</td>
                                <td className='edit-user-details' onClick={() => handleUpdate(userData?.address5, "address5")}><FiEdit /></td></tr>
                            : null}
                    </tbody>
                </table>
                <section>
                    <button id='logout-btn' onClick={logout}>
                        Logout
                    </button>
                </section>
                {/* {console.log(userData)} */}
            </section>
        </>
    )
}

export default PastSignin;