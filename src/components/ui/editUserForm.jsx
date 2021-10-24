import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import PropTypes from "prop-types";
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
        profession: profession.name,
        sex: sex,
        qualities: qualities
    });

    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
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
        console.log(data);
    };
    // console.log("profession", profession);
    return (
        <div className="p-3">
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Имя"
                    name="email"
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
                    value={data.profession}
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
                    value={qualities}
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
