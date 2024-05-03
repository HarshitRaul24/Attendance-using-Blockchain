import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import HSidebar from "./HSidebar"
import user from "./../../../assets/images/user.jpg"
import "./HOD.css"


const HDashboard = () => {
    const navigate = useNavigate();
    const [facultyData, setFacultyData] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/'); // Redirect to faculty login page if token is missing
        } else {
            // Fetch faculty dashboard data
            axios.get('http://localhost:8000/faculty/dashboard', {
                headers: {
                    Authorization: token
                }
            })
            .then(response => {
                console.log(response.data);
                setFacultyData(response.data);
            })
            .catch(error => {
                console.error('Error fetching faculty dashboard data:', error);
            });
        }
    }, []);
    return (
        <>
        <div className='hdashboard-main'>
        <HSidebar/>
        <section className="hod-dashboard-container">
        <div className="dash-header">
                        <img src={user} alt="" />
                        <div className="header-dash-containt">
                            <h1>{facultyData.name}</h1>
                            <h1>{facultyData.designation}</h1>
                        </div>
                    </div>
                    <div className="dash-body">
                        <h5>Name : {facultyData.name}</h5>
                        <h5>Designation : {facultyData.designation} </h5>
                        <h5>Faculty ID : {facultyData.facId}</h5>
                        <h5>Subject : {facultyData.subject}</h5>
                        <h5>Mobile No. : {facultyData.phone}</h5>
                        <h5>email ID : {facultyData.email}</h5>
                    </div>
        </section>
        </div>
        </>
    )
}

export default HDashboard