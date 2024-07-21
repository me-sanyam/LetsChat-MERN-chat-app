export const getSender = (loggedUser, users) => {
    return (loggedUser.user._id) === users[0]._id ? users[1] : users[0];
};

export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
