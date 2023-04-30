
export const getSender = (loggedUser, users) => {
    const Filtered = users.filter((user) => user._id !== loggedUser.user._id);
    return Filtered[0];
};