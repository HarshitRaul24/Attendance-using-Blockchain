import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const FacultySignup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        facId: '',
        email: '',
        phone: '',
        subject: '',
        designation: '',
        metamaskId: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGetMetamaskAddress = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setFormData({ ...formData, metamaskId: accounts[0] });
            } catch (error) {
                console.error('Error retrieving MetaMask address:', error);
                // Handle error (e.g., show error message)
            }
        } else {
            console.error('MetaMask not installed');
            // Handle case where MetaMask is not installed (e.g., show error message)
        }
    };

    const handleFacultySubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/faculty-signup', {
                name: formData.name,
                facId: formData.facId,
                email: formData.email,
                phone: formData.phone,
                subject: formData.subject,
                designation: formData.designation,
                metamaskId: formData.metamaskId
            });

            console.log(response.data);
            if (response.data.message === "Faculty member registered successfully") {
                alert("Faculty member registered successfully");
                navigate('/');
            }
        } catch (error) {
            console.error('Error registering faculty member:', error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <section className='faculty-signup-container'>
            <div className='faculty-signup-form'>
                <h1>Faculty Signup</h1>

                <form >
                    <div className="faculty-inputs">
                        <input type="text" name="name" placeholder='Enter Your Name' onChange={handleChange} />
                        <input type="text" name="facId" placeholder='Enter Faculty ID' onChange={handleChange} />
                        <input type="email" name="email" placeholder='Enter Your Email' onChange={handleChange} />
                        <input type="text" name="phone" placeholder='Enter Your Mobile Number' onChange={handleChange} />
                        <select name="subject" onChange={handleChange}>
                            <option value="">Select The Subject</option>
                            <option value="Physics">Physics</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="CP">CP</option>
                            <option value="BEE">BEE</option>
                        </select>
                        <select name="designation" onChange={handleChange}>
                            <option value="">Select Your Designation</option>
                            <option value="Asst. Professor">Asst. Professor</option>
                            <option value="Professor">Professor</option>
                            <option value="HOD">HOD</option>
                        </select>
                        <button type="button" onClick={handleGetMetamaskAddress}>Get MetaMask Address</button>
                        <input type="text" name="metamaskId" placeholder="Enter Your MetaMask Address" value={formData.metamaskId} onChange={handleChange} />
                        <button onClick={handleFacultySubmit}>Submit</button>
                    </div>
                </form>


                <p>
                    Already Have Account? <Link to="/">Login Here</Link>
                </p>
            </div>
        </section>
    );
};

export default FacultySignup;
