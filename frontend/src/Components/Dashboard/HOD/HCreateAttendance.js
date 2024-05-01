import React from 'react'
import "./HOD.css"
import HSidebar from "./HSidebar"


const HCreateAttendance = () => {
    return (
        <div className='hcreateattendance-main'>
            <HSidebar/>
            <div className="hcreateattendance-container">
                <h1>View Attendance</h1>
                <table className='hcreateattendance-table'>
                    
                </table>
            </div>
        </div>
    )
}

export default HCreateAttendance