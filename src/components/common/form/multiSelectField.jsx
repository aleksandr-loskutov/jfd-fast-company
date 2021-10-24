import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

function MultiSelectField({ options, onChange, name, label, value }) {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  label: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options;
    // const valueArr = [];
    // value.forEach((curOption) => {
    //     optionsArray.forEach((option) => {
    //         if (curOption._id === option.value) valueArr.push(option);
    //     });
    // });
    //
    const handleChange = (value) => {
        onChange({ name: name, value });
    };
    // console.log("value", value);
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>

            <Select
                isMulti
                closeMenuOnSelect={false}
                options={optionsArray}
                value={value}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
            />
        </div>
    );
}
MultiSelectField.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
export default MultiSelectField;
