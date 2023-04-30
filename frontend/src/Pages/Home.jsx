import React, { useEffect, useState } from "react";
import Navbar from "../Components/navbar";
import MyChats from "../Components/mychats";
import ChatBox from '../Components/Chatbox';
import { UseAppStates } from "../AppContext/Provider";

export default function Home() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { selectedchats } = UseAppStates();

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };

    });


    return (
        <>
            {/* <Navbar />
            <div className="container-fluid">
                <div className="row px-3 pt-4 d-flex justify-content-evenly">
                    {
                        (windowWidth <= 768) && selectedchats
                            ?
                            <>
                                <MyChats display={"none"} />
                                <ChatBox />
                            </>
                            :
                            <>
                                <MyChats />
                                <ChatBox display={'none'} />
                            </>
                    }
                </div>
            </div> */}

            <Navbar />
            <div className="container-fluid">
                <div className="row px-3 py-4 d-flex justify-content-evenly">
                    {
                        (windowWidth <= 768)
                            ?
                            selectedchats
                                ?
                                <>
                                    <MyChats display={"none"} />
                                    <ChatBox />
                                </>
                                :
                                <>
                                    <MyChats />
                                    <ChatBox display={'none'} />
                                </>
                            :
                            <>
                                <MyChats />
                                <ChatBox />
                            </>
                    }
                </div>
            </div>
        </>

    );
}