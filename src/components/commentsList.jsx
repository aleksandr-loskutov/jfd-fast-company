import React from "react";
import Comment from "./comment";
import PropTypes from "prop-types";
function CommentsList({ comments, onRemove }) {
    // console.log("CommentsList", comments);
    return (
        <>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {comments &&
                        comments.map((comment) => {
                            return (
                                <Comment
                                    key={comment._id}
                                    time={comment.created_at}
                                    comment={comment.content}
                                    userId={comment.userId}
                                    commentId={comment._id}
                                    onRemove={onRemove}
                                />
                            );
                        })}
                </div>
            </div>
        </>
    );
}
CommentsList.propTypes = {
    comments: PropTypes.array,
    onRemove: PropTypes.func
};
export default CommentsList;
