import React, { useEffect, useState } from "react";
import { UseAppStates } from "../AppContext/Provider";
import { toast } from 'react-toastify';
import axios from 'axios';
import { getSender } from "../ChatLogic";
import GroupImage from "../Group.png"
import { AiOutlinePlus } from 'react-icons/ai'

export default function MyChats({ display }) {

    const [loggedUser, SetLoggedUser] = useState();
    const { user, setuser, selectedchats, setselectedchats, chats, setchats } = UseAppStates();

    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            };

            const { data } = await axios.get("http://localhost:5000/api/chats", config);
            setchats(data);
        } catch (err) {
            toast.error(err);
        }
    }

    useEffect(() => {
        SetLoggedUser(JSON.parse(localStorage.getItem('UserInfo')));

        fetchChats();
    }, [fetch]);


    return (
        <div className="col-md-4 MyChats py-1 px-2" style={{ display: display }}>
            <div className="d-flex justify-content-between">
                <h3 className="m-2 d-inline">My Chats</h3>
                <h5
                    className="m-2 d-inline bg-secondary p-2"
                    style={{ borderRadius: "5px", cursor: "pointer" }}
                >
                    Create Group <AiOutlinePlus />
                </h5>
            </div>
            {chats && chats.map(chat => {
                return (
                    <div
                        key={chat._id}
                        className="col-12 d-flex align-items-center ChatUser p-3 mt-2"
                    >
                        {
                            (chat.isGroupChat)
                                ?
                                <img
                                    src={GroupImage}
                                    alt="Group_image"
                                    width="50px"
                                    height="auto"
                                    className="mb-1"
                                    style={{ borderRadius: "50%" }} />
                                :
                                <img
                                    src={(getSender(loggedUser, chat.users)).avatar}
                                    alt="profile"
                                    width="50px"
                                    height="auto"
                                    className="mb-1"
                                />
                        }
                        <div className="ms-3">
                            {
                                (chat.isGroupChat)
                                    ?
                                    <p className="mb-0"><strong>{chat.ChatName}</strong></p>
                                    :
                                    <p className="mb-0"><strong>{(getSender(loggedUser, chat.users)).name}</strong></p>
                            }
                        </div>

                    </div>
                );
            })}
        </div>
    );
}