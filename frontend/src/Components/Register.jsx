import React, { useEffect, useState } from "react";
import '../App.css'
import { Link, useNavigate } from "react-router-dom";
import { AvatarGenerator } from 'random-avatar-generator'
import { toast } from 'react-toastify';
import axios from 'axios'


export default function RegisterUser() {
    const navigate = useNavigate();
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [show, setshow] = useState(true)
    const [avatar, setavatar] = useState('')

    useEffect(() => {
        Generate();
    }, [])

    function Generate() {
        const generator = new AvatarGenerator();
        const data = generator.generateRandomAvatar();
        setavatar(data)
    }


    const HandleRegistration = async (e) => {
        e.preventDefault();
        if (password !== confirmpassword) {
            toast.error('Passwords did not match');
        } else {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                const { data } = await axios.post('http://localhost:5000/api/signup', { name, email, password, avatar }, config);
                toast.success('User signup successfull.');
                navigate('/');
                localStorage.setItem('UserInfo', JSON.stringify(data));
            } catch (error) {
                toast.error(error.response.data.message);
            }

        }
    }


    return (
        <div className="container-fluid" id="Wrapper">
            <div className="row d-flex justify-content-center align-items-center w-100 h-100 m-0">
                <div id="Minor_Wrapper" className="py-4 px-4">
                    <div className="d-flex flex-column justify-content-center align-items-center mb-0">
                        <img
                            src={avatar}
                            alt="User-avatar"
                            style={{ width: "100px", height: "auto" }}
                        />
                        <p
                            className="my-2"
                            style={{ color: "#0d6efd", cursor: "pointer" }}
                            onClick={() => Generate()}
                        >
                            Change Avatar
                        </p>
                    </div>
                    <form id="inpform" className="mb-3" onSubmit={HandleRegistration}>
                        <div className="mb-2">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                                required
                            />
                        </div>
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
                        <div className="mb-2">
                            <label>Confirm Password</label>
                            <input
                                type={(!show) ? "text" : "password"}
                                className="form-control"
                                placeholder="******"
                                value={confirmpassword}
                                onChange={(e) => setconfirmpassword(e.target.value)}
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

                        <button className='btn btn-primary w-100 mt-1' type="submit">Sign Up</button>
                    </form>
                    <p className="mb-0" style={{ color: "white" }}>Already registered to LetsChat?
                        <Link to="/Login" className="text-decoration-none"> Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}