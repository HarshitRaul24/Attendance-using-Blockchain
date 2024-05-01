import React, { useState, useEffect } from 'react'
import contractdata from "./../../../Attendance.sol/Attendance.json"
import { ethers } from "ethers"
import { Link } from "react-router-dom"
import axios from 'axios'
import "./Faculty.css"
import FSidebar from "./FSidebar"

const FCreateAttendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);

    useEffect(() => {
        // Fetch attendance data from the backend when component mounts
        const fetchAttendanceData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get-attendance');
                setAttendanceData(response.data);
            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        };

        fetchAttendanceData();
    }, []);

    const [formData, setFormData] = useState({
        subject: '',
        date: '',
        slot: '',
        attendance: {
            "1": "A",
            "2": "A",
            "3": "A",
            "4": "A",
            "5": "A",
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/add-attendance', formData);
            alert('Attendance created successfully');
            setFormData({ subject: '', date: '', slot: '', attendance: formData.attendance }); // Clear form data after successful submission
        } catch (error) {
            console.error('Error creating attendance:', error);
            alert('Error creating attendance. Please try again.');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRowClick = async (rowData) => {
        console.log(JSON.stringify(rowData.attendance));
        if (typeof window.ethereum === 'undefined') {
            alert('Please install MetaMask to perform this action.');
            return;
        }

        // Request access to MetaMask accounts
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Connect to Ethereum network using MetaMask provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Load smart contract
        const contractAddress = '0x4200BFA76958e32AC494f44D3177e093AaAb4d68';
        const contractABI = contractdata.abi; // Your contract ABI
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        try {
            // Add the attendance record to the blockchain
            await contract.addAttendance(rowData.subject, rowData.date, rowData.slot.toString(), JSON.stringify(rowData.attendance));

            // Show success message
            alert('Attendance added successfully!');
        } catch (error) {
            // Show error message
            console.error('Error adding attendance:', error);
            alert('Error adding attendance. Please try again.');
        }
    };

    return (
        <div className='flex'>
            <FSidebar />
            <div className="crateAttendance-container">
                <div className="createAtten-header">
                    <button>Create Attendance</button>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="slot" placeholder='Enter Slot of Attendance' value={formData.slot} onChange={handleChange} />
                        <input type="date" name="date" placeholder='Enter Date of Attendance' value={formData.date} onChange={handleChange} />
                        <input type="text" name="subject" placeholder='Enter Subject' value={formData.subject} onChange={handleChange} />
                        <button type="submit">Create</button>
                    </form>
                </div>
                <div>
                    <h2>Attendance Data</h2>
                    <table>
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
                                            <td><button onClick={() => handleRowClick(record)}>View Details</button></td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
{/* <Link to={`/editattendance/${record._id}`}>Edit</Link> */}

export default FCreateAttendance;
