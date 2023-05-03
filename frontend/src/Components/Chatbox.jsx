import React from "react";
import { useAppStates } from "../AppContext/Provider";
import { BsFillEyeFill } from 'react-icons/bs'
import { MdOutlineKeyboardBackspace } from 'react-icons/md';

export default function ChatBox() {
    const { user, selectedchats, setselectedchats } = useAppStates();

    return (
        <>
            <div className="modal" id="UserProfileModal">
                <div className="modal-dialog modal-dialog-centered">
                    {selectedchats &&

                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                {
                                    (selectedchats.isGroupChat)
                                        ?
                                        <h4 className="mb-0"><strong>{selectedchats.ChatName}</strong></h4>
                                        :
                                        ""
                                }
                                {
                                    (!selectedchats.isGroupChat)
                                        ?
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <img
                                                src={(user.user._id !== selectedchats.users[0]) ? selectedchats.users[0].avatar : selectedchats.users[1].avatar}
                                                width='150px'
                                                height="auto"
                                                alt="profile."
                                            />
                                            <h4 className="mt-2 mb-0"><strong>{(user.user._id !== selectedchats.users[0]) ? selectedchats.users[0].name : selectedchats.users[1].name}</strong></h4>
                                            <p className='my-2' style={{ fontSize: "1.2rem" }}>{(user.user._id !== selectedchats.users[0]) ? selectedchats.users[0].email : selectedchats.users[1].email}</p>
                                        </div>
                                        :
                                        <>
                                            <p className="mt-2 mb-0">All Members</p>
                                            {selectedchats.users.map((user) => {
                                                return (
                                                    <div className="ChatUser py-1 px-3 mb-1 d-flex align-items-center">
                                                        <img
                                                            src={user.avatar}
                                                            width='35px'
                                                            height="auto"
                                                            className="mb-1"
                                                            alt="profile."
                                                        />
                                                        <div className="ms-3">
                                                            <p className="mb-0"><strong>{user.email}</strong></p>
                                                            <p className="mb-0">{user.name}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </>
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div
                className={
                    (!selectedchats)
                        ?
                        "d-none d-md-flex col-md-7 col-xl-8 MyChats"
                        :
                        "col-md-7 col-xl-8 MyChats"
                }
            >
                {selectedchats
                    ?
                    <div className="row">
                        <div className="col-12 d-flex justify-content-evenly align-items-center" style={{ height: "60px" }}>
                            <button
                                className="btn btn-sm btn-light me-3 d-md-none"
                                onClick={() => setselectedchats()}
                            >
                                <MdOutlineKeyboardBackspace size={20} />
                            </button>
                            {
                                (selectedchats.isGroupChat)
                                    ?
                                    <h4 className="mb-0 flex-grow-1"><strong>{selectedchats.ChatName}</strong></h4>
                                    :
                                    <h4 className="mb-0 flex-grow-1"><strong>{(user.user._id !== selectedchats.users[0]) ? selectedchats.users[0].name : selectedchats.users[1].name}</strong></h4>
                            }
                            <button
                                className="btn btn-sm btn-light"
                                data-bs-toggle="modal"
                                data-bs-target="#UserProfileModal"
                            >
                                <BsFillEyeFill />
                            </button>
                        </div>
                        <hr style={{ width: "100%", color: "black" }} />
                    </div>
                    :
                    <div className="row d-flex align-items-center w-100">
                        <h5 className="text-center mb-0">Select a user to chat</h5>
                    </div>
                }
            </div >
        </>

    );
}