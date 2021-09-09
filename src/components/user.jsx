import React, { useState } from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";
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
                    return (
                        <Qualitie
                            key={qualitie._id}
                            color={qualitie.color}
                            name={qualitie.name}
                        />
                    );
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
User.propTypes = {
    user: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
};
export default User;
