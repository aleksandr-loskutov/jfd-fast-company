import React from "react";
import User from "./user";
function Users({ users, ...rest }) {
  if (users.length === 0) return null;
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
      <tbody>
        {Object.values(users).map((user) => {
          return <User key={user._id} user={user} {...rest} />;
        })}
      </tbody>
    </table>
  );
}
export default Users;
