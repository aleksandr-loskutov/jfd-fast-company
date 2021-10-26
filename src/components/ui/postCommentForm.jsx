import React, { useState } from "react";
import SelectField from "../common/form/selectField";
import PropTypes from "prop-types";
import TextArea from "../common/form/textArea";
function PostCommentForm({ users, onSubmit }) {
    const [data, setData] = useState({
        text: "",
        user: ""
    });

    const handleChange = (target) => {
        // console.log("handleChange", target);
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(data);
    };

    return (
        <div className="mb-4">
            <form onSubmit={handleSubmit}>
                <TextArea
                    label="Сообщение"
                    name="message"
                    value={data.text}
                    onChange={handleChange}
                />
                <SelectField
                    onChange={handleChange}
                    options={users}
                    name="users"
                    defaultOption="Выберите пользователя"
                    value={data.user}
                    label="Выберите пользователя"
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
