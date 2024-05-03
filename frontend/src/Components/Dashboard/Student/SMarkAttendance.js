import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import contractdata from "./../../../Attendance.sol/Attendance.json";
import "./Student.css"
import "./../Faculty/Faculty.css"
import SSidebar from "./SSidebar"



const SMarkAttendance = () => {
    const navigate = useNavigate();
    const [attendanceData, setAttendanceData] = useState([]);
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);
    const [studentData, setStudentData] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/'); // Redirect to student login page if token is missing
        } else {
            // Fetch student dashboard data
            axios.get('http://localhost:8000/student/dashboard', {
                headers: {
                    Authorization: token
                }
            })
                .then(response => {
                    console.log(response.data)
                    setStudentData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching student dashboard data:', error);
                    // Handle error (e.g., redirect to login page or show error message)
                });
        }
    }, []);

    const fetchAttendanceData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/get-attendance');
            setAttendanceData(response.data);
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    useEffect(() => {
        fetchAttendanceData();
    }, []);

    const handleUpdateAttendance = async (id, rollNo) => {
        console.log(id)
        try {
            // Send a PUT request to the backend API to update attendance
            const response = await axios.put(`http://localhost:8000/attendance/${id}`, { keyToUpdate: rollNo, newValue: 'P' });
            console.log(response.data.message);
            // Refresh attendance data
            fetchAttendanceData();
        } catch (error) {
            console.error('Error updating attendance:', error);
        }
    };

    return (
        <div  className='fcreateattendance-main'>
            <SSidebar />
            {/* <div className="sviewattendance-container">
                <h2>Attendance Data</h2>
                <table className='sviewattendance-table'>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Date</th>
                            <th>Slot</th>
                            <th>Attendance</th>
                            <th>HOD Validate</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.map((record, index) => {
                            console.log(record)
                            return (
                                <tr key={index}>
                                    <td>{record.subject}</td>
                                    <td>{record.date}</td>
                                    <td>{record.slot}</td>
                                    <td>{record.attendance}</td>
                                    <td>{record.hodValidate ? 'Yes' : 'No'}</td>
                                    <td>
                                        <button onClick={() => handleUpdateAttendance(record._id, '1')}>Update Attendance</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div> */}
            <div style={{ backgroundColor: "#152956" }} className='createAtten-data'>
                <h2>Attendance Data</h2>
                <table className='createAtten-table'>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Date</th>
                            <th>Slot</th>
                            <th>Present</th>
                            <th>Absent</th>
                            <th>Action</th> {/* Added column for action button */}
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.map((record, index) => {
                            const presentKeys = Object.keys(record.attendance).filter(key => record.attendance[key] === 'P');
                            const absentKeys = Object.keys(record.attendance).filter(key => record.attendance[key] === 'A');
                            if (record.isAdded === false) {
                                return (
                                    <tr key={index}>
                                        <td>{record.subject}</td>
                                        <td>{record.date}</td>
                                        <td>{record.slot}</td>
                                        <td>{presentKeys.join(', ')}</td>
                                        <td>{absentKeys.join(', ')}</td>

                                        <td><button onClick={() => handleUpdateAttendance(record._id, studentData.rollNo)}>Update Attendance</button></td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SMarkAttendance