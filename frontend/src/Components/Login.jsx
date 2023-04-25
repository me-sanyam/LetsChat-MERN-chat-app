import React, { useState } from "react";
import '../App.css'
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios';

export default function LoginUser() {
    const navigate = useNavigate();
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [show, setshow] = useState(true)

    const HandleLogin = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const { data } = await axios.post('http://localhost:5000/api/login', { email, password }, config);
            toast.success('User Login successfull.');
            navigate('/');
            localStorage.setItem('UserInfo', JSON.stringify(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className="container-fluid" id="Wrapper">
            <div className="row d-flex justify-content-center align-items-center w-100 h-100 m-0">
                <div id="Minor_Wrapper" className="py-4 px-4">
                    <div className="d-flex justify-content-center align-items-center mb-3">
                        <h1 className='m-0' id="OpeningText">Welcome</h1>
                    </div>
                    <form id="inpform" className="mb-3" onSubmit={HandleLogin}>
                        <div className="mb-2">
                            <label>Email</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="example@.com"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label>Password</label>
                            <input
                                type={(!show) ? "text" : "password"}
                                className="form-control"
                                placeholder="******"
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-check mb-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={show}
                                onClick={() => setshow(!show)}
                                id="flexCheckDefault"
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                show password
                            </label>
                        </div>

                        <button className='btn btn-primary w-100 mt-1' type="submit">Login</button>
                    </form>
                    <p className="mb-0" style={{ color: "white" }}>New to LetsChat?
                        <Link to="/Signup" className="text-decoration-none"> SignUp</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}