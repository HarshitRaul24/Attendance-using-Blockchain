import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractdata from "./../../../Attendance.sol/Attendance.json"
import "./Student.css"
import SSidebar from "./SSidebar"



const SViewAttendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);

    // Function to fetch all attendance data from the smart contract
    const fetchAttendanceData = async () => {
        try {
            if (!contract) return; // Contract not initialized yet

            // Call the getAllAttendance function from the smart contract
            const allAttendance = await contract.getAllAttendance();

            // Set the fetched attendance data to the state
            setAttendanceData(allAttendance);
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    // Function to initialize MetaMask provider
    const initializeMetaMaskProvider = async () => {
        try {
            // Check if MetaMask is installed
            if (window.ethereum) {
                // Request access to MetaMask accounts
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                // Initialize provider with MetaMask provider
                const metaMaskProvider = new ethers.providers.Web3Provider(window.ethereum);
                setProvider(metaMaskProvider);

                // Load smart contract
                const contractAddress = '0x4200BFA76958e32AC494f44D3177e093AaAb4d68';
                const contractABI = contractdata.abi; // Your contract ABI
                const contractInstance = new ethers.Contract(contractAddress, contractABI, metaMaskProvider);
                setContract(contractInstance);
            } else {
                console.error('MetaMask not detected');
            }
        } catch (error) {
            console.error('Error initializing MetaMask provider:', error);
        }
    };


    // Fetch attendance data when the component mounts
    useEffect(() => {
        initializeMetaMaskProvider();
    }, []);

    useEffect(() => {
        if (contract) {
            fetchAttendanceData();
        }
    }, [contract]);
    return (
        <div className='sviewattendance-main'>
            <SSidebar />
            <div className="sviewattendance-container">
                <h2>Attendance Data</h2>
                <table className='sviewattendance-table'>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Date</th>
                            <th>Slot</th>
                            <th>Attendance</th>
                            <th>HOD Validate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.map((record, index) => (
                            <tr key={index}>
                                <td>{record.subject}</td>
                                <td>{record.date}</td>
                                <td>{record.slot}</td>
                                <td>{record.attendance}</td>
                                <td>{record.hodValidate ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SViewAttendance