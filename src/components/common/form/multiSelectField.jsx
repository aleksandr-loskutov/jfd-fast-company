import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import convertForSelect from "../../../utils/misc";

function MultiSelectField({ options, onChange, name, label, value }) {
    const optionsArray = convertForSelect(options);
    const handleChange = (value) => {
        onChange({ name: name, value });
    };

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                options={optionsArray}
                defaultValue={value}
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
