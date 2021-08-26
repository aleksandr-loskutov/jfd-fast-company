import React, { useState } from "react";
import api from "../api";
function Users() {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {};
  const renderPhrase = (number) => {};

  const countUsers = () => Object.keys(users).length;

  const renderUserProps = (props = "_id", tag = "th") => {
    let propArr = [];
    for (const user in users) {
      propArr.push(users[user][props]);
    }
    return propArr;
  };
  const renderTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился раз</th>
            <th scope="col">Оценка</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    );
  };
  return renderTable();
}
export default Users;
