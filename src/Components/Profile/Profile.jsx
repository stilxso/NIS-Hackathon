import { useEffect, useState } from "react";
import NavBar from "../Navbar/Nav";
import './Profile.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
    let navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem("user"));
    const [data, setData] = useState(user);

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const logout = () => {
        localStorage.removeItem("user");
        navigate('/');
    };

    const oppositeCity = user.city === 'California' ? 'NewYork' : 'California';

    const handleCity = async () => {
        try {
            const response = await axios.patch(`http://localhost:8080/users/${user.id}`, { city: oppositeCity });
            const updatedUser = { ...user, city: oppositeCity };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setData(updatedUser);
            console.log('City updated:', updatedUser);
        } catch (error) {
            console.error('Error updating city:', error);
        }
    };

    return (
        <div className="profile-container">
            <NavBar />
            <div className="profile">
                <div className="logo logo-profile"></div>
                <div className="title">OIL SAVER</div>
                {data && (
                    <>
                        <div className="name">User Name: {data.email}</div>
                        <div className="city">Your City: {data.city}</div>
                    </>
                )}
            </div>
            <button className="btn btn-danger" onClick={logout}>Log Out</button>
            <button className="change-city" onClick={handleCity}>Change City to {oppositeCity}</button>
        </div>
    );
}
