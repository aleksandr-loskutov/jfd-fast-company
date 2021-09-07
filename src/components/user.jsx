import React, { useState } from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";
function User({ user, onDelete }) {
  const [bookmark, setBookmark] = useState(false);
  const toggleBookmark = () => {
    setBookmark(!bookmark);
  };
  return (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>
        {user.qualities.map((qualitie) => {
          return <Qualitie key={qualitie._id} qualitie={qualitie} />;
        })}
      </td>
      <td>{user.profession?.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate + "/5"}</td>
      <td>
        <Bookmark status={bookmark} onBookmark={toggleBookmark} />
      </td>
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
