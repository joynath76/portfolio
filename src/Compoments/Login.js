import React,{ useState } from 'react';
import '../Styles/Login.css'
import { Link, useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { postCall } from '../Server/APIRequests';

function Login() {
    let history = useHistory();
    const [Data, setData] = useState({
        email: "",
        password: "",
        loading: false,
        errors: {

        }
    });
    const handleLogin = (event) => {
        event.preventDefault();
        setData({...Data, loading: true});
        const userData = {
            email: Data.email,
            password: Data.password
        }
        postCall('/login',userData,'token')
        .then(token => {
            localStorage.setItem('token', token);
            history.push('/profile');
        })
        .catch(err => setData({...Data, errors: err.response.data}));
    }
    const handleChange = (event) => {
        setData({...Data,[event.target.name] : event.target.value});
    }
    return (
        <div className="login">
            <form noValidate>
                <div>
                    <label 
                    className={ Data.email.trim() !== '' ? "place_label" : ""}
                    >Email</label>
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
                <div>
                    <label 
                    className="error_label"
                    >{Data.errors.general}</label>
                </div>
                <div>
                    <button type="submit" onClick={handleLogin} disabled={Data.loading}>LOGIN</button>
                    {Data.loading && <CircularProgress size={25} 
                        style={{
                            position: "absolute",
                            top: "20px",
                            left: "50%"
                        }} 
                    />}
                    <Link to="/signup" className="links">SIGNUP</Link>
                </div>
            </form>
        </div>
    )
}

export default Login;