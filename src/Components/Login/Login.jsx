import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

export default function Login() {

    let navigate = useNavigate();

    let [newUser, setNewUser] = useState({
        email: '',
        password: '',
    });

    let [error, setError] = useState()

    let [eyes, setEyes] = useState(false);

    let handleLogin = async () => {

        try {
            const response = await axios.post('http://localhost:8080/login', newUser);
            let data = response.data;
            let user = {
                username: data.user.username,
                email: data.user.email,
                id: data.user.id,
                city: data.user.city,
            };

            localStorage.setItem("user", JSON.stringify(user));
            navigate('/map');
        } catch (error) {
            setError(error.response.data)
            console.error('Error', error);
        }
    };

    let user = localStorage.getItem("user")

    useEffect(() => {
        if (user){
            navigate('/map')
        }       
    })

    return (
        <>
            <section className="register-container">
                <div className="form">
                    <div className="error" style={{ color: "red" }}>{error}</div>
                    <div className="email-container">
                        <div className="input-title">Email</div>
                        <input
                            type="email"
                            className="email-input"
                            placeholder="Enter your email address"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                    </div>
                    <div className="password">
                        <div className="input-title">Password</div>
                        <input
                            type={eyes ? 'text' : 'password'}
                            className="password-input"
                            placeholder="Enter your password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        />
                        <div className="eye" onClick={() => setEyes(!eyes)}>
                            {eyes ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    </div>
                </div>
                <button className="submit" onClick={handleLogin}>Login</button>
                <div className="login-reNavigate">Doesn't have an account? <Link to="/register">Register</Link></div>
            </section>
        </>
    );
}
