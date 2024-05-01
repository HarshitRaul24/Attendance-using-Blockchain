import React from 'react'
import { Link } from 'react-router-dom'
import "./Student.css"


const SSidebar = () => {
    return (
        <section className='sidebar-container'>
                <div className='sidebar-content'>
                    <ul>
                        <li><Link to="/sdashboard">Dashboard</Link></li>
                        <li><Link to="/smarkattendance">Mark Attendance</Link></li>
                        <li><Link to="/sviewattendance">View Attendance</Link></li>
                    </ul>
                </div>
            </section>
    )
}

export default SSidebar