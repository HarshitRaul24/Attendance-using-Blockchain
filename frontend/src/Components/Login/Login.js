import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    const [selectedButton, setSelectedButton] = useState("student");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        metamaskId: "" // Added metamaskId to formData state
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/student-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                // Login successful, handle the token (e.g., store it in local storage)
                localStorage.setItem('token', data.token);
                // Redirect to student dashboard or any other page
                navigate('/sdashboard') // Change the URL as needed
            } else {
                // Login failed, display error message
                alert(data.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Error logging in. Please try again.');
        }
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

    const handleFacultySubmit = async (e) => { // Fixed function name
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/faculty-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                // Login successful, handle the token (e.g., store it in local storage)
                localStorage.setItem('token', data.token);
                // Redirect to faculty dashboard or any other page
                navigate('/fdashboard'); // Change the URL as needed
            } else {
                // Login failed, display error message
                alert(data.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Error logging in. Please try again.');
        }
    };

    const showContent = (content) => {
        setSelectedButton(content);
    };

    return (
        <section className="login-container">
            <div className="login-form">
                <div className="login-buttons">
                    <button onClick={() => showContent("student")} style={{ backgroundColor: selectedButton === "student" ? "#2787fc" : "inherit" }}>Student</button>
                    <button onClick={() => showContent("faculty")} style={{ backgroundColor: selectedButton === "faculty" ? "#2787fc" : "inherit" }}>Faculty</button>
                </div>
                <div className="login-input">
                    {selectedButton === "student" && (
                        <>
                            <form onSubmit={handleSubmit}>
                                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
                                <button type="submit">Login</button>
                            </form>
                            <p>Don't have an account? <Link to="/studentsignup">Register</Link></p>
                        </>
                    )}
                    {selectedButton === "faculty" && (
                        <>
                            <form onSubmit={handleFacultySubmit}>
                                <button type="button" onClick={handleGetMetamaskAddress}>Get MetaMask Address</button>
                                <input type="text" name="metamaskId" placeholder="Enter Your MetaMask Address" value={formData.metamaskId} onChange={handleInputChange} />
                                <button type="submit">Login</button>
                            </form>
                            <p>Don't have an account? <Link to="/facultysignup">Register</Link></p>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Login;
