import React from "react";
import PropTypes from "prop-types";
function TableHeader({ onSort, selectedSort, columns }) {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort((selectedSort) => ({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            }));
        } else {
            onSort({ path: item, order: "asc" });
        }
    };
    const getSortIcon = (path) => {
        if (path === selectedSort.path) {
            return (
                <i
                    className={
                        "bi bi-caret-" +
                        (selectedSort.order === "asc" ? "up" : "down") +
                        "-fill"
                    }
                />
            );
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                    >
                        {columns[column].name}
                        {getSortIcon(columns[column].path)}
                    </th>
                ))}
            </tr>
        </thead>
    );
}
TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};
export default TableHeader;
