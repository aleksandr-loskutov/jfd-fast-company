import React, { useEffect, useState } from "react";
import Qualitie from "../../ui/qualities/qualitie";
import PropTypes from "prop-types";
import api from "../../../api";
import Button from "../../common/button";
import PostCommentForm from "../../ui/postCommentForm";
import CommentsList from "../../commentsList";
// import Button from "../../common/button";
function UserPage({ userId }) {
    const [user, setUser] = useState();
    const [users, setUsers] = useState();
    const [comments, setComments] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        });
        api.users.fetchAll().then((data) => {
            setUsers(
                data.map((userr) => {
                    return { name: userr.name, value: userr._id };
                })
            );
        });
        api.comments.fetchCommentsForUser(userId).then((data) => {
            console.log("comments", comments);
            setComments(data);
        });
    }, []);

    const handleSubmit = (data) => {
        api.comments.add(data).then((newComment) => {
            console.log("newComment", newComment);
            setComments([...comments, newComment]);
        });
    };
    const handleRemove = (id) => {
        api.comments.remove(id).then((id) => {
            console.log("removed id", id);
        });
        const newComments = comments.filter((comment) => {
            return comment._id !== id;
        });
        setComments(newComments);
    };

    const handleEditClick = () => {};
    return user ? (
        <>
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card mb-3">
                            <div className="card-body">
                                <Button
                                    className="
                                    position-absolute
                                    top-0
                                    end-0
                                    btn btn-light btn-sm
                                "
                                    handleClick={handleEditClick}
                                    type="button"
                                    link={`/users/${userId}/edit`}
                                >
                                    <i className="bi bi-gear"></i>
                                </Button>
                                <div
                                    className="
                                    d-flex
                                    flex-column
                                    align-items-center
                                    text-center
                                    position-relative
                                "
                                >
                                    <img
                                        src={`https://avatars.dicebear.com/api/avataaars/${(
                                            Math.random() + 1
                                        )
                                            .toString(36)
                                            .substring(7)}.svg`}
                                        className="rounded-circle shadow-1-strong me-3"
                                        alt="avatar"
                                        width="150"
                                    />
                                    <div className="mt-3">
                                        <h4>{user.name}</h4>
                                        <p className="text-secondary mb-1">
                                            {user.profession.name}
                                        </p>
                                        <div className="text-muted">
                                            <i
                                                className="
                                                bi bi-caret-down-fill
                                                text-primary
                                            "
                                                role="button"
                                            ></i>
                                            <i
                                                className="
                                                bi bi-caret-up
                                                text-secondary
                                            "
                                                role="button"
                                            ></i>
                                            <span className="ms-2">
                                                {user.rate}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-3">
                            <div
                                className="
                                card-body
                                d-flex
                                flex-column
                                justify-content-center
                                text-center
                            "
                            >
                                <h5 className="card-title">
                                    <span>Qualities</span>
                                </h5>
                                <p className="card-text">
                                    {user.qualities.map((qualitie) => {
                                        return (
                                            <Qualitie
                                                key={qualitie._id}
                                                color={qualitie.color}
                                                name={qualitie.name}
                                            />
                                        );
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card mb-3">
                                <div
                                    className="
                                    card-body
                                    d-flex
                                    flex-column
                                    justify-content-center
                                    text-center
                                "
                                >
                                    <h5 className="card-title">
                                        <span>Completed meetings</span>
                                    </h5>

                                    <h1 className="display-1">
                                        {user.completedMeetings}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="card mb-2">
                            <div className="card-body">
                                <div>
                                    <h2>New comment</h2>
                                    <PostCommentForm
                                        onSubmit={handleSubmit}
                                        users={users}
                                    />
                                </div>
                            </div>
                        </div>
                        <CommentsList
                            comments={comments}
                            onRemove={handleRemove}
                        />
                    </div>
                </div>
            </div>
        </>
    ) : (
        <h2>Загрузка</h2>
    );
}
UserPage.propTypes = {
    userId: PropTypes.string,
    match: PropTypes.object
};
export default UserPage;
