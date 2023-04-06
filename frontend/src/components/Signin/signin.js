import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signin.css'
import { IoIosArrowBack } from 'react-icons/io';

const Signin = () => {
    const navigate = useNavigate()
    const [signInData, setSignInData] = useState({ email: "", password: "" })
    const [error, setError] = useState({ email: null, password: null, both: null })
    const handleSignInForm = (params) => (e) => {
        setSignInData({ ...signInData, [params]: e.target.value })
        error.email = null
        error.password = null
        error.both = null
        // console.log(e.target.value)
    }

    const handleSignIn = async (e) => {
        e.preventDefault()
        if(!signInData.email || !signInData.password){
           return toast.error("All the fields are mandatory!")
        }
        await axios.post('http://localhost:3000/signin', signInData)
            .then((res) => {
                // setSignSuccess(res)
                // console.log(res.data.data.token);
                // console.log(res.data.data.userEmail);
                localStorage.setItem("token", res.data.data.token)
                localStorage.setItem('userEmail', res.data.data.userEmail)
                toast("Signin Successful!")
                navigate('/pastsignin')
            })
            .catch((err) => {
                console.log(err.response.data);
                if (err.response.data == "Invalid Email or Password") { { setError({ both: "Email or Password Invalid" }) } }
                else if (err.response.data == "Invalid Email") { setError({ email: "Please enter a valid email/phone number" }) }
                else if (err.response.data == "Invalid Password") { setError({ password: "Password Invalid" }) }
            });
    }

    return (
        <>
            <div className='signin-form-container'>
                <div>
                <h2 id='bck-to-register-pg-btn' onClick={() => navigate("/")} style={{ cursor: 'pointer' }}><IoIosArrowBack /></h2>
                <h2>Sign in</h2>
                </div>
                <form>
                    <div>
                        <input className='signin-inputs' placeholder="email" type="email" onChange={handleSignInForm("email")} />
                    </div>
                    <div>
                        <input className='signin-inputs' placeholder="password" type="password" onChange={handleSignInForm("password")} />
                    </div>
                    <div className="input-error" style={{fontSize: '13', fontWeight: 500, color: 'red'}}>{error.password}</div>
                    <div id="both-input-error" style={{fontSize: '13', fontWeight: 500, color: 'red'}}>{error.both}</div>
                    <div>
                        <button id='signin-btn' onClick={handleSignIn}>
                            Sigin
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer 
                position={'top-center'}
                autoClose= {2000}
                hideProgressBar= {false}
                closeOnClick= {true}
                pauseOnHove= {true}
                draggable= {true}
                progress= {undefined}
            />
        </>
    )
}
export default Signin;