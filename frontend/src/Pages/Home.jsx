import React, { useEffect, useState } from "react";
import Navbar from "../Components/navbar";
import MyChats from "../Components/mychats";
import ChatBox from '../Components/Chatbox';
import io from 'socket.io-client'

export default function Home() {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketInstance = io('http://localhost:5000');
        setSocket(socketInstance);
        
        return () => {
          if (socketInstance) {
            socketInstance.disconnect();
          }
        };
      }, []);

    return (
        <>
            <Navbar />
            <div className="container-fluid px-3 py-4 " style={{ height: "100%" }}>
                <div className="row d-flex justify-content-evenly">
                  {socket &&
                  <>
                    <MyChats socket={socket} />
                    <ChatBox socket={socket} />
                  </>
                  }
                </div>
            </div >
        </>
    );
}