import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const StudentSignup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        stuId: '',
        email: '',
        phone: '',
        rollNo: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.password !== formData.confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            const response = await axios.post('http://localhost:8000/student-register', {
                name: formData.name,
                stuId: formData.stuId,
                email: formData.email,
                phone: formData.phone,
                rollNo: formData.rollNo,
                password: formData.password
            });

            console.log(response.data.message);
            if (response.data.message === "Student registered successfully") {
                alert("Student registered successfully");
                navigate('/');
            }
        } catch (error) {
            console.error('Error registering student:', error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <section className="student-signup-container">
            <div className="student-signup-form">
                <h1>Student Signup</h1>
                <form onSubmit={handleSubmit}>
                    <div className="student-inputs">
                    <input type="text" name="name" placeholder="Enter Your Name" onChange={handleChange} />
                    <input type="text" name="stuId" placeholder="Enter Student ID" onChange={handleChange} />
                    <input type="email" name="email" placeholder="Enter Your Email" onChange={handleChange} />
                    <input type="text" name="phone" placeholder="Enter Your Mobile Number" onChange={handleChange} />
                    <input type="number" name="rollNo" placeholder="Enter Roll Number" onChange={handleChange} />
                    <input type="password" name="password" placeholder="Enter Your Password" onChange={handleChange} />
                    <input type="password" name="confirmPassword" placeholder="Confirm Your Password" onChange={handleChange} />
                    <button>Submit</button>
                    </div>
                </form>
                <p>
                    Already Have Account? <Link to="/">Login Here</Link>
                </p>
            </div>
        </section>
    );
};

export default StudentSignup;
