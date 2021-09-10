import React, { useState } from "react";
import api from "./api";
import Users from "./components/users.jsx";
import SearchStatus from "./components/searchStatus";
function App() {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleDelete = (userId) => {
        setUsers(
            users.reduce((newArr, user) => {
                if (user._id !== userId) {
                    newArr.push(user);
                }
                return newArr;
            }, [])
        );
    };
    return (
        <>
            <SearchStatus usersTotal={users.length} />
            <Users users={users} onDelete={handleDelete} />
        </>
    );
}
export default App;
