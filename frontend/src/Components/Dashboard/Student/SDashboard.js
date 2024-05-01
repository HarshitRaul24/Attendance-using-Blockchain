import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SSidebar from "./SSidebar"
import user from "./../../../assets/images/user.jpg"
import "./Student.css"


const SDashboard = () => {
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState({});

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         navigate('/'); // Redirect to student login page if token is missing
    //     } else {
    //         // Fetch student dashboard data
    //         axios.get('http://localhost:8000/student/dashboard', {
    //             headers: {
    //                 Authorization: token
    //             }
    //         })
    //         .then(response => {
    //             console.log(response.data)
    //             setStudentData(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching student dashboard data:', error);
    //             // Handle error (e.g., redirect to login page or show error message)
    //         });
    //     }
    // }, []);
    
    return (
        <>
        <div className='sdashboard-main'>
        <SSidebar/>
        <section className="sdashboard-container">
            <div className="dash-header">
                <img src={user} alt="" />
                <div className="header-dash-containt">
                <h1>Name</h1>
                <h1>Faculty</h1>
                </div>
            </div>
            <div className="dash-body">
                <h5>Name</h5>
            </div>
        </section>
        </div>
        </>
    )
}

export default SDashboard