import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import FSidebar from "./FSidebar"
import "./Faculty.css"
import user from "./../../../assets/images/user.jpg"


const FDashboard = () => {
    const navigate = useNavigate();
    const [facultyData, setFacultyData] = useState({});

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         navigate('/'); // Redirect to faculty login page if token is missing
    //     } else {
    //         // Fetch faculty dashboard data
    //         axios.get('http://localhost:8000/faculty/dashboard', {
    //             headers: {
    //                 Authorization: token
    //             }
    //         })
    //         .then(response => {
    //             console.log(response.data);
    //             if (response.data.designation === 'HOD') {
    //                 navigate('/hdashboard'); // Redirect to HOD dashboard if designation is HOD
    //             }
    //             setFacultyData(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching faculty dashboard data:', error);
    //         });
    //     }
    // }, []);

    return (
        <>
        <div className='flex'>
        <FSidebar/>
        <section className="faculty-dashboard-container">
            <div className="dash-header">
                <img src={user} height="200px" alt="" />
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

export default FDashboard