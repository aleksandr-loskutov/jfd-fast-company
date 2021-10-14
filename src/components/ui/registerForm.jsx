import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
function RegisterForm(props) {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: ""
    });
    const [professions, setProfessions] = useState();
    const [errors, setErrors] = useState({});
    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfessions(data);
        });
    }, []);
    const validatorConfig = {
        email: {
            isRequired: { message: "Email обязателен" },
            isEmail: { message: "Email введен не корректно" }
        },
        password: {
            isRequired: { message: "Пароль обязателен" },
            isCapitalSymbol: {
                message: "Пароль должен содержать как минимум 1 заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать как минимум 1 число"
            },
            min: {
                message: "Пароль должен быть минимум 8 символов",
                value: 8
            }
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
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электроная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                onChange={handleChange}
                options={professions}
                defaultOption="Choose..."
                error={errors.profession}
                value={data.profession}
                label="Выберите вашу профессию"
            />

            <button
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Отправить
            </button>
        </form>
    );
}

export default RegisterForm;
