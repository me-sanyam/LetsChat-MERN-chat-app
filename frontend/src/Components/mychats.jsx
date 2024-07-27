import React, { useEffect, useState } from "react";
import { useAppStates } from "../AppContext/Provider";
import { toast } from 'react-toastify';
import axios from 'axios';
import { getSender } from '../ChatLogic';
import UserComponent from "./usercomponent";

export default function MyChats({socket}) {
    const [loading, setloading] = useState(true);
    const [loggedUser, SetLoggedUser] = useState();
    const [search, setsearch] = useState('');
    const [searchresult, setsearchresult] = useState([]);
    const [groupmembers, setgroupmembers] = useState([]);
    const [groupname, setgroupname] = useState('');

    const { user, chats, setchats, selectedchats, setselectedchats } = useAppStates();


    useEffect(() => {
        if(socket && chats.length){
            socket.on(`update-chat-count`,({chatId,count}) => {
                chats.forEach(chat => {
                    if(chat._id == chatId){
                        chat.unreadCount = count;
                    }
                });
            })      
        }
    },[socket])

    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            };

            const { data } = await axios.get("http://localhost:5000/api/chats", config);
            setchats(data);
            setloading(false);
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }


    useEffect(() => {
        SetLoggedUser(user);
        if(user){
            fetchChats();
        }
    }, [user])


    const handleUserSearch = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.get(`http://localhost:5000/api?search=${search}`, config);
            setsearchresult(data.users)
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const handleAddition = (usertoAdd) => {
        const isGroupMember = groupmembers.filter(item => item._id == usertoAdd._id);
        
        if (isGroupMember.length) {
            const updatedMembers = groupmembers.filter(item => item._id !== usertoAdd._id);
            setgroupmembers(updatedMembers);
            return
        }
        setgroupmembers([...groupmembers, usertoAdd]);
    }

    const handleDeletion = (usertoDelete) => {
        setgroupmembers(groupmembers.filter((prsn) => prsn._id !== usertoDelete._id));
    }

    const handleGroupCreation = async () => {
        if (!groupname) {
            toast.error('Enter a valid Group Name');
            return
        }
        if (groupmembers.length < 2) {
            toast.error('More than two users are required for a Group Chat');
            return
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.post('http://localhost:5000/api/chats/group', { users: JSON.stringify(groupmembers), groupname }, config);
            setchats([data, ...chats]);
            setselectedchats(data);
            setsearch('');
            setgroupmembers([]);
            setsearchresult([]);
            setgroupname('');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            < div className="modal text-dark" id="CreateGroupModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Create Group</h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    setsearch('');
                                    setsearchresult([]);
                                    setgroupmembers([]);
                                    setgroupname('')
                                }}
                            ></button>
                        </div>

                        <div className="modal-body">
                            <input
                                type="text"
                                className="form-control mb-2 styled"
                                name="GroupName"
                                placeholder="Group Chat Name"
                                value={groupname}
                                onChange={(e) => setgroupname(e.target.value)}
                            />

                            <form
                                onSubmit={handleUserSearch}
                            >
                                <input
                                    type="text"
                                    className="form-control styled"
                                    name="GroupUsers"
                                    placeholder="Search users"
                                    value={search}
                                    onChange={(e) => setsearch(e.target.value)}
                                />
                            </form>
                            <div className="my-4">
                                {groupmembers.length > 0
                                    ? groupmembers.map(member => {
                                        return (
                                            <span
                                                key={member._id}
                                                className="badge p-2 m-1"
                                            >
                                                {member.name}
                                                <button
                                                    className="btn btn-close btn-close-white ms-2"
                                                    style={{ width: "5px", height: "6px" }}
                                                    onClick={() => handleDeletion(member)}
                                                ></button>
                                            </span>
                                        )
                                    })
                                    :
                                    <p className="mb-0 ms-2">Please select at least 2 users to create a Group Chat.</p>
                                }
                            </div>
                            <div style={{maxHeight: '145px',overflowY: "auto",height: "145px"}}>
                                {
                                    searchresult && searchresult.map(user => {
                                        return (
                                            <UserComponent
                                                avatar={user.avatar}
                                                key={user._id}
                                                username={user.name}
                                                email={user.email}
                                                handleFunction={() => handleAddition(user)}
                                            />
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn StyledButton"
                                onClick={handleGroupCreation}
                                data-bs-dismiss="modal"
                            >
                                create
                            </button>
                        </div>
                    </div>
                </div>
            </div >


            <div
                className={
                    (!selectedchats)
                        ?
                        "col-md-4 col-lg-4 col-xl-3 MyChats"
                        :
                        "d-none d-md-block col-md-4 col-lg-4 col-xl-3 MyChats"
                }
            >
                <div className="row">

                    <div
                        className="d-flex justify-content-between mt-1"
                    >
                        <h3 className="m-2 d-inline">My Chats</h3>
                        <button
                            data-bs-toggle='modal'
                            data-bs-target='#CreateGroupModal'
                            className="btn mt-2 StyledButton"
                            style={{ width: "150px", height: "35px" }}
                            onClick={handleUserSearch}
                        >
                            Create Group +
                        </button>
                    </div>
                    <div className="col-12 px-2 py-1" id="OverFlowY">
                    {!loading && 
                        <>
                            {chats && chats.length > 0 
                            ?
                                chats.map(chat => {
                                    return (
                                        <div
                                            key={chat._id}
                                            className="position-relative col-12 d-flex align-items-center ChatUser p-3 mt-2"
                                            onClick={() => setselectedchats(chat)}
                                        >
                                            {
                                                (chat.isGroupChat)
                                                    ?
                                                    <img
                                                        src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${chat.ChatName}`}
                                                        alt="Group_image"
                                                        width="50px"
                                                        height="auto"
                                                        className="mb-1"
                                                        style={{ borderRadius: "50%" }} />
                                                    :
                                                    <img
                                                        src={getSender(loggedUser, chat.users).avatar}
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
                                                        <p className="mb-0"><strong>{getSender(loggedUser, chat.users).name}</strong></p>
                                                }
                                            </div>
                                            {chat.latestmessage ?
                                                <>
                                                    {chat.latestmessage.sender._id !== user.user._id && (chat.unreadCount > 0) ?
                                                        <div
                                                            class="position-absolute bg-dark rounded-circle d-flex justify-content-center align-items-center"
                                                            style={{color: '#fff', right:"10px", width:"30px", height:"30px", padding: "12px", fontSize: '14px'}}
                                                        >
                                                            {chat.unreadCount}
                                                        </div>
                                                        :
                                                        ("")
                                                    }
                                                </>
                                                :
                                                (" ")
                                            }
                                        </div>
                                    );
                                })
                            :
                            <p className="mt-5 text-center">You haven't chatted with anyone.</p>
                            }
                        </>
                    }
                    {loading && <p className="mt-2 text-center">loading</p>}
                    </div>
                </div>
            </div>
        </>
    );
}