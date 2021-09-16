import React from "react";
import User from "./user";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
function UserTable({ users, onSort, selectedSort, ...rest }) {
    const columns = {
        name: { iter: "name", name: "Имя" },
        qualities: { name: "Качества" },
        professions: { iter: "profession.name", name: "Профессия" },
        completedMeetings: {
            iter: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { iter: "rate", name: "Оценка" },
        bookmark: { iter: "bookmark", name: "Избранное" },
        delete: {}
    };
    return (
        <table className="table">
            <TableHeader {...{ selectedSort, onSort, columns }} />
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
    selectedSort: PropTypes.object.isRequired
};
export default UserTable;
