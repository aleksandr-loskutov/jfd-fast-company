import React, { useState } from "react";
import api from "../api";
function Users() {
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
  const renderPhrase = (number) => {
    const declOfNum = (number, titles) => {
      const cases = [0, 2, 1, 1, 1, 2];
      return titles[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : cases[number % 10 < 5 ? number % 10 : 5]
      ];
    };
    let str = number > 0 ? `${number} ` : "";
    str += declOfNum(number, [
      "Никто с тобой не тусанет",
      "человека тусанут с тобой сегодня",
      "человек тусанёт с тобой сегодня",
    ]);
    return (
      <span className={"badge m-2 bg-" + (number > 0 ? "primary" : "danger")}>
        {str}
      </span>
    );
  };
  const userRows = () => {
    return Object.values(users).map((user) => {
      return (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>
            {user.qualities.map((quality) => {
              return (
                <span
                  key={quality._id}
                  className={"badge m-1 bg-" + quality.color}
                >
                  {quality.name}
                </span>
              );
            })}
          </td>
          <td>{user.profession?.name}</td>
          <td>{user.completedMeetings}</td>
          <td>{user.rate + "/5"}</td>
          <td>
            <button
              type={"button"}
              onClick={() => handleDelete(user._id)}
              className={"btn btn-danger"}
              userid={user._id}
            >
              удалить
            </button>
          </td>
        </tr>
      );
    });
  };
  const renderTable = () => {
    if (users.length > 0)
      return (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">{"Имя"}</th>
              <th scope="col">{"Качества"}</th>
              <th scope="col">{"Профессия"}</th>
              <th scope="col">{"Встретился раз"}</th>
              <th scope="col">{"Оценка"}</th>
            </tr>
          </thead>
          <tbody>{userRows()}</tbody>
        </table>
      );
  };

  return (
    <>
      <h2>{renderPhrase(users.length)}</h2>
      {renderTable()}
    </>
  );
}
export default Users;
