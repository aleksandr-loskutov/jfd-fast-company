import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
function QualitiesList({ qualities }) {
    return (
        <>
            {qualities.map((qualitie) => {
                return (
                    <Qualitie
                        key={qualitie._id}
                        color={qualitie.color}
                        name={qualitie.name}
                    />
                );
            })}
        </>
    );
}
QualitiesList.propTypes = {
    qualities: PropTypes.array
};
export default QualitiesList;
