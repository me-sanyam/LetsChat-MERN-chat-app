import React from "react";
import Navbar from "../Components/navbar";

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">box1</div>
                    <div className="col-7">box2</div>
                </div>
            </div>
        </>

    );
}