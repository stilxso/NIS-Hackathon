import { useEffect, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import './Register.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
    let navigate = useNavigate();

    const [view, setView] = useState('password');
    let [newUser, setNewUser] = useState({
        username: '',
        password: '',
        email: '',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlTp2SmRke8LbnDs4hmZqqavC64YYwVkQK-A&s',
        city: 'California',
    });

    let [error, setError] = useState({
        passwordError: '',
        emailError: '',
        usernameError: '',
        generalError: '',
    });

    let [getData, setGetData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users');
                setGetData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    let handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:8080/register', newUser);
            console.log(response.data);
            navigate('/login');
        } catch (error) {
            if (error.response.data.includes('Password' || 'password')) {
                setError({ ...error, passwordError: error.response.data });
            } else if (error.response.data.includes('Email' || 'email')) {
                setError({ ...error, emailError: error.response.data });
            } else if (getData.filter((user) => user.username === newUser.username) !== '' || null) {
                setError({ ...error, usernameError: 'Username already exists' });
            } else {
                setError({ ...error, generalError: 'An unexpected error occurred' });
            }
        }
    };

    let user = localStorage.getItem("user")

    useEffect(() => {
        if (user){
            navigate('/map')
        }       
    })

    return (
        <div className="register-container">
            <div className="form">
                <div className="name">
                    <div className="text">
                        <div className="input-title">Name</div>
                        <div className="error">{error.usernameError}</div>
                    </div>
                    <input type="text" placeholder="Name" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
                </div>
                <div className="email">
                    <div className="text">
                        <div className="input-title">Email</div>
                        <div className="error">{error.emailError}</div>
                    </div>
                    <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                </div>
                <div className="password">
                    <div className="text">
                        <div className="input-title">Password</div>
                        <div className="error">{error.passwordError}</div>
                    </div>
                    <input type={view} placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                    <div className="eye" onClick={() => setView(view === 'password' ? 'text' : 'password')}>
                        {view === 'password' ? <BsEye /> : <BsEyeSlash />}
                    </div>
                </div>
                <div className="city">
                    <div>
                        <input type="radio" id="California" name="city" value="California" checked={newUser.city === 'California'} onChange={(e) => setNewUser({ ...newUser, city: e.target.value })} />
                        <label htmlFor="California">California</label>
                    </div>
                    <div>
                        <input type="radio" id="NewYork" name="city" value="NewYork" checked={newUser.city === 'NewYork'} onChange={(e) => setNewUser({ ...newUser, city: e.target.value })} />
                        <label htmlFor="NewYork">New York</label>
                    </div>
                </div>
            </div>
            <button className="submit" onClick={handleRegister}>Submit</button>
        </div>
    );
}
