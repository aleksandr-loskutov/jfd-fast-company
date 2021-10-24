import React from "react";
import PropTypes from "prop-types";

function SelectField({
    label,
    name,
    value,
    onChange,
    defaultOption,
    options,
    error
}) {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  name: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options;

    // console.log(
    //     "value",
    //     value,
    //     "selected",
    //     selected,
    //     "optionsArray",
    //     optionsArray
    // );
    // const newa = optionsArray.reduce((newArr, option) => {
    //     if (option.name === selected) {
    //         newArr.push(option);
    //     }
    //     return newArr;
    // }, []);
    // const getDefaultValue = () => {
    //     return optionsArray.filter((i) => i.name === selected)[0].value;
    // };
    // optionsArray.filter((i) => i.name === selected)[0].value
    return (
        <div className="mb-4">
            <label htmlFor="validationCustom04" className="form-label">
                {label}
            </label>
            {optionsArray && (
                <select
                    className={getInputClasses()}
                    id="validationCustom04"
                    name={name}
                    value={value}
                    onChange={handleChange}
                >
                    <option disabled value="">
                        {defaultOption}
                    </option>
                    {optionsArray.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
            )}
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}
SelectField.propTypes = {
    defaultOption: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
export default SelectField;
