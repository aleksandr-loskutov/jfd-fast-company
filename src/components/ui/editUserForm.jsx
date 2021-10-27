import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
function EditUserForm({
    email,
    name,
    profession,
    allProfessions,
    sex,
    qualities,
    allQualities,
    onSubmit
}) {
    const [data, setData] = useState({
        email: email,
        name: name,
        profession: profession,
        sex: sex,
        qualities: qualities
    });
    const { userId } = useParams();

    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        console.log("handleChange", target);
        console.log("allQ", allQualities);
        let value = target.value;
        if (target.name === "profession") {
            value = Object.values(allProfessions).filter(
                (proff) => proff._id === target.value
            )[0];
        }
        if (target.name === "qualities") {
            if (target.value.length > 0) {
                const newArr = [...data.qualities];
                Object.values(allQualities).forEach((q) => {
                    let found = false;
                    target.value.forEach((val) => {
                        found = q.name === val.label;
                    });
                    if (found) {
                        newArr.push({
                            _id: q._id,
                            name: q.name,
                            color: q.color
                        });
                    }
                });
                value = newArr;
            } else {
                value = [];
            }
        }
        setData((prevState) => ({
            ...prevState,
            [target.name]: value
        }));
    };

    const validatorConfig = {
        name: {
            isRequired: { message: "Имя обязателено" }
        },
        email: {
            isRequired: { message: "Email обязателен" },
            isEmail: { message: "Email введен не корректно" }
        },
        profession: {
            isRequired: {
                message: "Обазательно выберите вашу профессию"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        // console.log(data);
    };
    const handleBack = () => {
        window.location.href = `/users/${userId}`;
    };
    // console.log("profession", profession);
    return (
        <div className="w-100">
            <button onClick={handleBack} className="btn btn-lg btn-primary">
                Назад
            </button>
            <div className="w-50 mx-auto">
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Имя"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        error={errors.name}
                    />
                    <TextField
                        label="Электроная почта"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        error={errors.email}
                    />

                    <SelectField
                        onChange={handleChange}
                        options={allProfessions}
                        name="profession"
                        defaultOption="Выберите.."
                        error={errors.profession}
                        value={data.profession._id}
                        label="Выберите вашу профессию"
                    />
                    <RadioField
                        options={[
                            { name: "Male", value: "male" },
                            { name: "Female", value: "female" },
                            { name: "Other", value: "other" }
                        ]}
                        value={data.sex}
                        name="sex"
                        onChange={handleChange}
                        label="Выберите ваш пол"
                    />
                    <MultiSelectField
                        options={allQualities}
                        value={data.qualities}
                        onChange={handleChange}
                        name="qualities"
                        label="Выберите ваши качества"
                    />
                    <button
                        disabled={!isValid}
                        className="btn btn-primary w-100 mx-auto"
                    >
                        Обновить
                    </button>
                </form>
            </div>
        </div>
    );
}

EditUserForm.propTypes = {
    userId: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    profession: PropTypes.object,
    sex: PropTypes.string,
    qualities: PropTypes.array,
    allProfessions: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    allQualities: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onSubmit: PropTypes.func
};

export default EditUserForm;
