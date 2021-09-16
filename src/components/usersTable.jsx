import React from "react";
import User from "./user";
import PropTypes from "prop-types";

function UserTable({ users, onSort, currentSort, ...rest }) {
    const handleSort = (item) => {
        if (currentSort.iter === item) {
            onSort((currentSort) => ({
                ...currentSort,
                order: currentSort.order === "asc" ? "desc" : "asc"
            }));
        } else {
            onSort({ iter: item, order: "asc" });
        }
    };
    return (
        <table className="table">
            <thead>
                <tr>
                    <th onClick={() => handleSort("name")} scope="col">
                        Имя
                    </th>
                    <th scope="col">Качества</th>
                    <th
                        onClick={() => handleSort("profession.name")}
                        scope="col"
                    >
                        Профессия
                    </th>
                    <th
                        onClick={() => handleSort("completedMeetings")}
                        scope="col"
                    >
                        Встретился раз
                    </th>
                    <th onClick={() => handleSort("rate")} scope="col">
                        Оценка
                    </th>
                    <th onClick={() => handleSort("bookmark")} scope="col">
                        Избранное
                    </th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => {
                    return <User key={user._id} user={user} {...rest} />;
                })}
            </tbody>
        </table>
    );
}
UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    currentSort: PropTypes.object.isRequired
};
export default UserTable;
