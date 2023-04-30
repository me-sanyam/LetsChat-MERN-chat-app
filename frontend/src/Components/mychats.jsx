import React, { useEffect, useState } from "react";
import { UseAppStates } from "../AppContext/Provider";
import { toast } from 'react-toastify';
import axios from 'axios';
import GroupImage from "../Group.png"
import { getSender } from "../ChatLogic";

export default function MyChats({ display }) {
    const [loading, setloading] = useState(true);
    const [loggedUser, SetLoggedUser] = useState();
    const { user, chats, setchats } = UseAppStates();

    useEffect(() => {
        SetLoggedUser(JSON.parse(localStorage.getItem('UserInfo')));

        handlefetchChats();
    }, [])

    const handlefetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            };

            const { data } = await axios.get("http://localhost:5000/api/chats", config);
            setchats(data);
            setloading(false);
        } catch (err) {
            toast.error(err);
        }
    }

    return (
        <>
            < div className="modal" id="CreateGroupModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Create Group</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <form action="">
                                <input type="text" className="form-control" id="CreateGrpInp" />
                            </form>
                        </div>


                        <div className="modal-footer">
                            <button className="btn btn-secondary text-dark" data-bs-dismiss="modal">close</button>
                        </div>
                    </div>
                </div>
            </div >

            <div className="col-md-4 col-lg-4 col-xl-3 MyChats py-1 px-2" style={{ display: display }}>
                <div className="d-flex justify-content-between">
                    <h3 className="m-2 d-inline">My Chats</h3>
                    <button
                        data-bs-toggle='modal'
                        data-bs-target='#CreateGroupModal'
                        className="btn btn-secondary mt-2"
                        style={{ width: "150px", height: "35px" }}
                    >Create Group +</button>
                </div>
                {chats && (!loading) ?
                    chats.map(chat => {
                        console.log('chats Are Available', chat)
                        console.log(loading);
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
                    })
                    :
                    <p>loading</p>
                }
            </div>
        </>
    );
}