import React from 'react'
import { Link } from 'react-router-dom'
import "./Faculty.css"


const FSidebar = () => {
    return (
        <>
            <section className='sidebar-container'>
                <div className='sidebar-content'>
                    <ul>
                        <li><Link to="/fdashboard">Dashboard</Link></li>
                        <li><Link to="/fcreateattendance">Create Attendance</Link></li>
                        {/* <li><Link to="/fvalidatestudent">Validate Student</Link></li> */}
                        <li><Link to="/fviewattendance">View Attendance</Link></li>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default FSidebar