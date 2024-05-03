import React from 'react'
import { Link } from 'react-router-dom'
import "./HOD.css"


const HSidebar = () => {
    return (
        <section className='sidebar-container'>
                <div className='sidebar-content'>
                    <ul>
                        <li><Link to="/hdashboard">Dashboard</Link></li>
                        <li><Link to="/hcreateattendance">Create Attendance</Link></li>
                        {/* <li><Link to="/hvalidatestudent">Validate Student</Link></li> */}
                        {/* <li><Link to="/hvalidatefaculty">Validate Faculty</Link></li> */}
                        <li><Link to="/hvalidateattendance">Validate Attendance</Link></li>
                        <li><Link to="/hviewattendance">View Attendance</Link></li>
                    </ul>
                </div>
            </section>
    )
}

export default HSidebar