import React from "react";
import { useAppStates } from "../AppContext/Provider";
import { BsEmojiSmile, BsSend, BsFillEyeFill } from 'react-icons/bs';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { getSender } from '../ChatLogic';

export default function ChatBox() {
    const { user, selectedchats, setselectedchats } = useAppStates();

    return (
        <>
            <div className="modal" id="UserProfileModal">
                <div className="modal-dialog modal-dialog-centered">
                    {user && selectedchats &&

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
                                                src={getSender(user, selectedchats.users).avatar}
                                                width='150px'
                                                height="auto"
                                                alt="profile."
                                            />
                                            <h4 className="mt-2 mb-0"><strong>{getSender(user, selectedchats.users).name}</strong></h4>
                                            <p className='my-2' style={{ fontSize: "1.2rem" }}>{getSender(user, selectedchats.users).email}</p>
                                        </div>
                                        :
                                        <>
                                            <p className="mt-2 mb-0">All Members</p>
                                            {selectedchats.users.map((user) => {
                                                return (
                                                    <span
                                                        key={user._id}
                                                        className="badge p-2 m-1"
                                                    >
                                                        {user.name}
                                                    </span>

                                                )
                                            })}
                                        </>
                                }
                            </div>

                            <div className="modal-footer">
                                {!selectedchats.isGroupChat
                                    ?
                                    <button className="btn btn-light text-dark" data-bs-dismiss="modal">close</button>
                                    :
                                    <>
                                        <button className="btn btn-light text-dark" data-bs-dismiss="modal">close</button>
                                        <button className="btn btn-danger">Exit Group</button>
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
                        <div
                            className="col-12 d-flex justify-content-evenly align-items-center"
                            style={{ height: "60px" }}
                        >
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
                                    <h4 className="mb-0 flex-grow-1"><strong>{getSender(user, selectedchats.users).name}</strong></h4>
                            }
                            <button
                                className="btn btn-sm btn-light"
                                data-bs-toggle="modal"
                                data-bs-target="#UserProfileModal"
                            >
                                <BsFillEyeFill />
                            </button>
                        </div>

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