import React, { useState } from 'react';
import { ethers } from 'ethers';
import contractdata from "./../Attendance.sol/Attendance.json"

function AddAttendance() {
    const [jsonData, setJsonData] = useState({
        subject: "Maths",
        date: "24/04/2024",
        slot: "1",
        attendance: {
            "1": "P",
            "2": "P",
            "3": "P",
            "4": "P",
            "5": "P"
        }
    });

    const handleSubmit = async () => {
        if (!jsonData || Object.keys(jsonData).length === 0) {
            alert('Please provide attendance data');
            return;
        }

        // Check if MetaMask is installed
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
            await contract.addAttendance(jsonData.subject, jsonData.date, jsonData.slot, JSON.stringify(jsonData.attendance));

            // Show success message
            alert('Attendance added successfully!');
        } catch (error) {
            // Show error message
            console.error('Error adding attendance:', error);
            alert('Error adding attendance. Please try again.');
        }
    };

    return (
        <div>
            <h2>Add Attendance</h2>
            <p>Subject: {jsonData.subject}</p>
            <p>Date: {jsonData.date}</p>
            <p>Slot: {jsonData.slot}</p>
            <p>Attendance: {JSON.stringify(jsonData.attendance)}</p>
            <button onClick={handleSubmit}>Add Attendance</button>
        </div>
    );
}

export default AddAttendance;
