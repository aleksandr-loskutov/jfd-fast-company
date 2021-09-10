import React, { useState } from "react";
import User from "./user";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";

function Users({ users: allUsers, onDelete }) {
    const count = allUsers.length;
    const pageSize = 4;
    const [currentPage, setcurrentPage] = useState(1);
    const [professions] = useState(api.professions.fetchAll());
    if (count === 0) return null;
    const handlePageChange = (pageIndex) => {
        setcurrentPage(pageIndex);
    };
    const users = paginate(allUsers, currentPage, pageSize);
    const handleProfessionsSelect = (params) => {
        console.log(params);
    };
    return (
        <>
            <GroupList
                items={professions}
                onItemSelect={handleProfessionsSelect}
            />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Избранное</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <User
                                key={user._id}
                                user={user}
                                onDelete={onDelete}
                            />
                        );
                    })}
                </tbody>
            </table>
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
}
Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired
};
export default Users;
