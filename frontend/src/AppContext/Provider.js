import React, { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const Appcontext = createContext();

export default function ContextProvider({ Children }) {
    const [user, setuser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const userinfo = JSON.parse(localStorage.getItem('UserInfo'))
        setuser(userinfo);
        console.log(userinfo);
        if (!userinfo) {
            navigate('/signup');
        }
    }, [navigate]);

    return (
        <Appcontext.Provider
            value={{
                user,
                setuser
            }}
        >
            {Children}
        </Appcontext.Provider >
    )
}

export const AppStates = () => {
    return useContext(Appcontext);
}

