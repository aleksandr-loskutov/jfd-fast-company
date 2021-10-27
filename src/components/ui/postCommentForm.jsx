import React, { useState } from "react";
import SelectField from "../common/form/selectField";
import PropTypes from "prop-types";
import TextArea from "../common/form/textArea";
import { useParams } from "react-router-dom";
function PostCommentForm({ users, onSubmit }) {
    const { userId } = useParams();
    const [data, setData] = useState({
        content: "",
        userId: "",
        pageId: userId
    });
    const [error, setError] = useState();
    const handleChange = (target) => {
        // console.log("handleChange", target);
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        if (data.content.length > 0 && data.userId.length > 0) {
            setError();
        } else {
            setError("Выберите пользователя и введите комментарий");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (data.content.length > 0 && data.userId.length > 0) {
            onSubmit(data);
            setData({ ...data, content: "", userId: "" });
        } else {
            setError("Выберите пользователя и введите комментарий");
        }
    };
    // console.log("users", users);
    return (
        <div className="mb-4">
            <form onSubmit={handleSubmit}>
                <TextArea
                    label="Сообщение"
                    name="content"
                    value={data.content}
                    onChange={handleChange}
                />
                <SelectField
                    onChange={handleChange}
                    options={users}
                    name="userId"
                    defaultOption="Выберите пользователя"
                    value={data.userId}
                    label="Выберите пользователя"
                    error={error}
                />
                <button className="btn btn-primary w-100 mx-auto">
                    Отправить
                </button>
            </form>
        </div>
    );
}

PostCommentForm.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onSubmit: PropTypes.func
};

export default PostCommentForm;
