import React from "react";
import PropTypes from "prop-types";

function Bookmark({ status, onBookmark }) {
    return (
        <button onClick={onBookmark}>
            <i className={"bi bi-bookmark" + (status ? "-fill" : "")}></i>
        </button>
    );
}
Bookmark.propTypes = {
    status: PropTypes.bool.isRequired,
    onBookmark: PropTypes.func.isRequired
};
export default Bookmark;
