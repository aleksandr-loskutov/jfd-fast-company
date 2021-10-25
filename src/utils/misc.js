function convertForSelect(data) {
    return !Array.isArray(data) && typeof data === "object"
        ? Object.keys(data).map((optionName) => ({
              label: data[optionName].name,
              value: data[optionName]._id
          }))
        : data;
}
export default convertForSelect;
