import React from 'react'
import "./Student.css"
import SSidebar from "./SSidebar"



const SMarkAttendance = () => {
    return (
        <div className='smarkattendance-main'>
            <SSidebar/>
            <div className="smarkattendance-container">
                <h1>Mark Attendance</h1>
                <table className='smarkattendance-table'>
                    
                </table>
            </div>
        </div>
    )
}

export default SMarkAttendance