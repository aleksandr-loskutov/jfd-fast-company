import React, { useEffect, useState } from "react";
import api from "./api";
import Users from "./components/users.jsx";
function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
        });
    }, []);
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
            <Users users={users} onDelete={handleDelete} />
        </>
    );
}
export default App;
