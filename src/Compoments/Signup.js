import React, { useState } from 'react';
import '../Styles/Signup.css';
import { useHistory } from 'react-router-dom';
import { postCall } from '../Server/APIRequests';


function Signup() {
    
    const history = useHistory();
    const [Data, setData] = useState({
        email: "",
        password : "",
        confirmPass : "",
        handle : "",
        fullname : "",
        errors: {
            
        }
    })
    const handleChange = (event) => {
        setData({...Data,[event.target.name] : event.target.value});
    }
    const handleSignup = (event) => {
        event.preventDefault();
        const userData = {
            email: Data.email,
            password: Data.password,
            confirmPassword: Data.confirmPass,
            handle: Data.handle,
            fullname: Data.fullname
        }
        postCall('/signup',userData,'token')
        .then(token => {
            localStorage.setItem('token', token);
            history.push('/profile');
        })
        .catch(err => setData({...Data, errors: err.response.data}));
    }
    return (
        <div className="signup">
            <form>
                {/* Email */}
                <div>
                    <label 
                    className={ Data.email.trim() !== '' ? "place_label" : ""}
                    >email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={Data.email}
                        onChange={handleChange}
                    />
                    <label 
                    className="error_label"
                    >{Data.errors.email}</label>
                </div>
                {/* Password */}
                <div>
                    <label 
                    className={Data.password.trim() !== '' ? "place_label" : ""}
                    >Password</label>
                    <input 
                        type="password" 
                        name="password"
                        value={Data.password}
                        onChange={handleChange} 
                    />
                    <label 
                    className="error_label"
                    >{Data.errors.password}</label>
                </div>
                {/* Confirm password */}
                <div>
                    <label 
                    className={Data.confirmPass.trim() !== '' ? "place_label" : ""}
                    >Confirm Password</label>
                    <input 
                        type="password" 
                        name="confirmPass"
                        value={Data.confirmPass}
                        onChange={handleChange} 
                    />
                    <label 
                    className="error_label"
                    >{Data.errors.confirmPass}</label>
                </div>
                {/* Username */}
                <div>
                    <label 
                    className={Data.handle.trim() !== '' ? "place_label" : ""}
                    >Username</label>
                    <input 
                        type="text" 
                        name="handle"
                        value={Data.handle}
                        onChange={handleChange} 
                    />
                    <label 
                    className="error_label"
                    >{Data.errors.handle}</label>
                </div>
                {/* Full Name */}
                <div>
                    <label 
                    className={Data.fullname.trim() !== '' ? "place_label" : ""}
                    >Full Name</label>
                    <input 
                        type="text" 
                        name="fullname"
                        value={Data.fullname}
                        onChange={handleChange} 
                    />
                    <label 
                    className="error_label"
                    >{Data.errors.fullname}</label>
                </div>
                <div>
                    <button type="submit" onClick={handleSignup}>SIGNUP</button>
                </div>
            </form>
        </div>
    )
}

export default Signup
