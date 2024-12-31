import { useEffect } from 'react'
import './MainPage.css'
import { Link, useNavigate } from "react-router-dom"

export default function MainPage(){

    let navigate = useNavigate()

    let user = localStorage.getItem("user")

    useEffect(() => {
        if (user){
            navigate('/map')
        }       
    })

    

    return(
        <section className="container-main">
            <div className="logo"></div>
            <div className="title-main-page">WELCOME!</div>
            <div className="buttons">
                <Link to='/login'><button className="login-button">Log In</button></Link>
                <Link to='/register'><button className="register-button">Sign In</button></Link>
            </div>
        </section>
    )
}