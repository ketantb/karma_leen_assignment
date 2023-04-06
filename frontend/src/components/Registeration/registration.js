import { useState } from 'react';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import './registartion.css'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiOutlineMinusCircle } from 'react-icons/ai';

const Register = () => {
    const navigate = useNavigate()
    const [regFormData, setRegFormData] = useState({
        firstName: "", lastName: "", password: "", DOB: "", email: "", mobile: "",
        address1: "", address2: "", address3: "", address4: "", address5: ""
    })
    const [err, setErr] = useState({ AllFields: "", Email: "" })
    const handleRegFormData = (params) => (e) => {
        setRegFormData({ ...regFormData, [params]: e.target.value })
        setErr({ AllFields: "", Email: "" })
    }

    const postRegForm = async (e) => {
        e.preventDefault()
        console.log(regFormData)
        await axios.post('https://karmaln-backend-ketan.onrender.com/register', regFormData)
            .then((res) => {
                console.log(res.data)
                navigate('/signin')
            //setRegFormData({Name: "", Email: "", Phone: "", State: "", District: "", Address: "", Pincode: "", Password: "", ConfirmPassword: "" , TermsNConditions: ""})
            })
            .catch((err) => {
                if (err.response.data == "please fill all field") {
                    setErr({ AllFields: "All the Fields are Mandatory" })
                }
                if (err.response.data == "Email Already in Use") {
                    setErr({ Email: "Email Already in Use" })
                }
            })
        // console.log(regFormData)
        //setRegFormData({Name: "", Email: "", Phone: "", State: "", District: "", Address: "", Pincode: "", Password: "", ConfirmPassword: "" , TermsNConditions: ""})
    }
    return (
        <>
            <div className='regForm-container'>
                <h2>Registration</h2>
                <form>
                    <div>
                        <div>
                        <label htmlFor='fname'>Name</label>
                        </div>
                        <section>
                        <input className="regForm-inputs-names" placeholder='First Name' id="fname" type="text" onChange={handleRegFormData('firstName')} value={regFormData.Name} />
                        <input className="regForm-inputs-names" placeholder='Last Name' id="lname" type="text" onChange={handleRegFormData('lastName')} value={regFormData.Name} />
                        </section>
                    </div>
                    <div>
                        <div>
                        <label htmlFor='email'>Email</label>
                        </div>
                        <section>
                        <input className="regForm-inputs" placeholder='email' id="email" type="email" onChange={handleRegFormData('email')} value={regFormData.Name} />
                        </section>
                    </div>
                    <div>
                        <div>
                        <label htmlFor='mobile'>Mobile</label>
                        </div>
                        <section>
                        <input className="regForm-inputs" placeholder='mobile' id="mobile" type="number" onChange={handleRegFormData('mobile')} value={regFormData.Name} />
                        </section>
                    </div>
                    <div>
                        <div>
                        <label htmlFor='password'>Password</label>
                        </div>
                        <section>
                        <input className="regForm-inputs" placeholder='password' id="password" type="password" onChange={handleRegFormData('password')} value={regFormData.Name} />
                        </section>
                    </div>
                    <div>
                        <div>
                        <label htmlFor='DOB'>Date of Birth</label>
                        </div>
                        <section>
                        <input className="regForm-inputs" placeholder='DOB' id="DOB" type="date" onChange={handleRegFormData('DOB')} value={regFormData.Name} />
                        </section>
                    </div>
                    <div>
                        <div>
                        <label htmlFor='address1'>Address</label>
                        </div>
                        <section>
                        <input className="regForm-inputs address-ips" placeholder='Address-1' id="address1" type="text" onChange={handleRegFormData('address1')} value={regFormData.Name} />  
                        {/* <span id="address-add-btn"><AiOutlinePlusCircle/></span>
                        <span id="address-add-btn"><AiOutlineMinusCircle/></span> */}
                        </section>
                    </div>
                    <div>
                        <input className="regForm-inputs" placeholder='Address-2' id="address2" type="text" onChange={handleRegFormData('address2')} value={regFormData.Name} />
                    </div>
                    <div>
                        <input className="regForm-inputs" placeholder='Address-3' id="address3" type="text" onChange={handleRegFormData('address3')} value={regFormData.Name} />
                    </div>
                    <div>
                        <input className="regForm-inputs" placeholder='Address-4' id="address4" type="text" onChange={handleRegFormData('address4')} value={regFormData.Name} />
                    </div>
                    <div>
                        <input className="regForm-inputs" placeholder='Address-5' id="address5" type="text" onChange={handleRegFormData('address5')} value={regFormData.Name} />
                    </div>
                    <div>
                        <button type="submit" onClick={postRegForm} id="regForm-Btn">Register</button>
                    </div>
                </form>
                <div id="validationErr" style={{ color: 'red' }}>
                    {<p className="confirmPasswordErr">{err.AllFields || err.Email || err.Phone || err.Password || err.TnC}</p>}
                </div>
                <div>
                    Already have an Account? &nbsp;
                    <span onClick={() => navigate('/signin')} style={{ color: 'red', cursor:"pointer"}}>
                        Signin
                    </span>
                </div>
            </div>
        </>
    )
}

export default Register;