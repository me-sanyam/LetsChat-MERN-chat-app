import React from "react";

export default function Home() {
    const data = JSON.parse(localStorage.getItem('UserInfo'))
    return (
        <h1>Welcome {data.user.name}</h1>
    );
}