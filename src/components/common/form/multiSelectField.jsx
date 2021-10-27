import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import convertForSelect from "../../../utils/misc";

function MultiSelectField({ options, onChange, name, label, value }) {
    // console.log("options", options);
    const optionsArray = convertForSelect(options);
    const handleChange = (value) => {
        console.log("multi_handleChange", value);
        onChange({ name: name, value });
    };

    const getValue = (value) => {
        return value.map((optionName) => ({
            label: optionName.name,
            value: optionName._id
        }));
    };
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                options={optionsArray}
                defaultValue={value && getValue(value)}
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
