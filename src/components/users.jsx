import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";

function Users({ users: allUsers, onToggleBookMark, ...rest }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

    const pageSize = 8;
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
        ? allUsers.filter((user) => user.profession.name === selectedProf.name)
        : allUsers;
    const count = filteredUsers.length;
    // console.log("filtered", filteredUsers);
    const sortedUsers = _.orderBy(allUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };

    return (
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
                <SearchStatus usersTotal={count} />
                {count > 0 && (
                    <UserTable
                        users={usersCrop}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        onToggleBookMark={onToggleBookMark}
                        {...rest}
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
    );
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};
export default Users;
