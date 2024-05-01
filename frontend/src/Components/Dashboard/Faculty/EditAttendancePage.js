import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditAttendancePage = ({ attendanceData }) => {
    const [editedData, setEditedData] = useState([]);

    useEffect(() => {
        // Initialize edited data with attendance data
        setEditedData(attendanceData);
    }, [attendanceData]);

    const handleEdit = (index, key, value) => {
        const newData = [...editedData];
        newData[index][key] = value;
        setEditedData(newData);
    };

    const handleSubmit = async () => {
        try {
            // Submit edited data to backend
            await axios.put(`http://localhost:8000/update-attendance/${editedData._id}`, editedData);
            alert('Attendance updated successfully');
        } catch (error) {
            console.error('Error updating attendance:', error);
            alert('Error updating attendance. Please try again.');
        }
    };

    return (
        <div>
            <h2>Edit Attendance</h2>
            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Slot</th>
                        <th>Attendance</th>
                    </tr>
                </thead>
                <tbody>
                    {editedData.map((record, index) => (
                        <tr key={index}>
                            <td>{record.subject}</td>
                            <td>{record.date}</td>
                            <td>{record.slot}</td>
                            <td>
                                <select value={record.attendance} onChange={(e) => handleEdit(index, 'attendance', e.target.value)}>
                                    <option value="P">Present</option>
                                    <option value="A">Absent</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default EditAttendancePage;
