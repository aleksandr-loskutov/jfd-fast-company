import React, { useState } from "react";
import api from "../api";
import Users from "./users.jsx";
import SearchStatus from "./searchStatus";
function App() {
  const [users, setUsers] = useState(api.users.fetchAll());
  //состояние
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
