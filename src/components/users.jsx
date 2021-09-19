import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";
import { useParams } from "react-router-dom";
import User from "./user";

function Users() {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState([]);
    const pageSize = 8;
    const params = useParams();
    const { userId } = params;
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
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfessions(data);
        });
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleProfessionsSelect = (item) => {
        setSelectedProf(item);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession.name === selectedProf.name)
        : users;
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(users, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <>
            {userId ? (
                <User userId={userId} />
            ) : (
                <div className="d-flex">
                    {professions && (
                        <div className="d-flex flex-column flex-shrink-0 p-3">
                            <GroupList
                                selectedItem={selectedProf}
                                items={professions}
                                onItemSelect={handleProfessionsSelect}
                            />
                            <button
                                className={"btn btn-secondary mt-2"}
                                onClick={clearFilter}
                            >
                                Очистить
                            </button>
                        </div>
                    )}
                    <div className="d-flex flex-column">
                        <SearchStatus usersTotal={filteredUsers} />
                        {count > 0 && (
                            <UserTable
                                users={usersCrop}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                onToggleBookMark={handleToggleBookMark}
                                onDelete={handleDelete}
                            />
                        )}
                        <div className="d-flex justify-content-center">
                            <Pagination
                                itemsCount={count}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Users;
