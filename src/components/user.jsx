import React from "react";
import Qualitie from "./qualitie";
function User({ user, onDelete }) {
  return (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>
        <Qualitie qualities={user.qualities} />
      </td>
      <td>{user.profession?.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate + "/5"}</td>
      <td>
        <button
          type={"button"}
          onClick={() => onDelete(user._id)}
          className={"btn btn-danger"}
          userid={user._id}
        >
          удалить
        </button>
      </td>
    </tr>
  );
}

export default User;
