import { useEffect } from "react";
import Nav from "../Navbar/Nav";
import './AboutUs.css'
import { useNavigate } from "react-router-dom";

export default function AboutUs(){
    
    let navigate = useNavigate()
    let user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    })

    return(
        <div className="container-aboutUs">
            <Nav />
            <div className="cards">
                <div className="first-block-container">
                    <div className="importance">
                        <div className="card-title">Importance</div>
                        <div className="card">OilSaver-is a cutting-edge project aimed at tackling global environmental challenges through advanced satellite technology. By enabling precise and continuous monitoring of air, water, and soil conditions, Ecosat supports sustainable development, early disaster detection, and effective resource management. Our mission is to provide actionable insights for a cleaner, greener future.</div>                
                    </div>
                    <div className="future">
                        <div className="card-title">Future</div>
                        <div className="card">In the future, Ecosat plans to collaborate with companies and organizations worldwide to provide advanced environmental monitoring solutions. We aim to expand the network of connected satellites, increasing data accuracy and coverage. These efforts will enhance our ability to address global environmental challenges and support sustainable development initiatives.</div>
                    </div>
                </div>
                <div className="second-block-container">
                    <div className="how-work">
                        <div className="card-title">How does it work ?</div>
                        <div className="card how-work">•	Satellites equipped with infrared sensors detect oil pollution by analyzing infrared wavelengths, allowing them to identify and track contamination on water surfaces. <br /> <br /> <br />
	•	Artificial Intelligence processes the collected data, forecasts the spread of the pollution, classifies its type, scale, and impact, and provides detailed insights into the situation. <br /> <br /> <br />
	•	Once the pollution is identified, the information is transmitted to relevant organizations, companies, governmental bodies, and other stakeholders for immediate action and decision-making.</div> 
                    </div>
                </div>
            </div>
        </div>
    )
}