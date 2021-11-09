import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQuality } = useQuality();
    if (!isLoading) {
        return (
            <>
                {qualities.map((qualityId) => {
                    return (
                        <Quality
                            key={getQuality(qualityId)._id}
                            {...getQuality(qualityId)}
                        />
                    );
                })}
            </>
        );
    } else return "Loading...";
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
