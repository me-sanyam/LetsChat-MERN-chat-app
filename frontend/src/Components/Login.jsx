import React from "react";
import '../App.css'
import { Link } from "react-router-dom";

export default function LoginUser() {
    return (
        <div className="container-fluid" id="Wrapper">
            <div className="row d-flex justify-content-center align-items-center w-100 h-100 m-0">
                <div id="Minor_Wrapper" className="py-4 px-4">
                    <div className="d-flex justify-content-center align-items-center mb-3">
                        <h1 className='m-0' id="OpeningText">Welcome</h1>
                    </div>
                    <form id="inpform" className="mb-3">
                        <div className="mb-2">
                            <label>Email</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="example@.com"
                            />
                        </div>
                        <div className="mb-2">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="******"
                            />
                        </div>
                        <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
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