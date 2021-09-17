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
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
        console.log(id);
    };
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
            <Users
                users={users}
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
            />
        </>
    );
}
export default App;
