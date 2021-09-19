import React, { useRef } from "react";
import PropTypes from "prop-types";

function SearchStatus({ usersTotal }) {
    const loaded = useRef(false);
    let str = usersTotal.length > 0 ? `${usersTotal.length} ` : "";
    const declOfNum = (num, titles) => {
        const cases = [0, 2, 1, 1, 1, 2];
        return titles[
            num % 100 > 4 && num % 100 < 20
                ? 2
                : cases[num % 10 < 5 ? num % 10 : 5]
        ];
    };
    const setLoaded = () => {
        loaded.current = true;
        return "Загрузка...";
    };
    str += declOfNum(usersTotal.length, [
        "Никто с тобой не тусанет",
        "человека тусанут с тобой сегодня",
        "человек тусанёт с тобой сегодня"
    ]);
    console.log("loaded.current", loaded.current);
    return (
        <h4>
            <span
                className={
                    "badge m-2 bg-" +
                    (usersTotal.length > 0 ? "primary" : "danger")
                }
            >
                {!loaded.current && usersTotal.length === 0 ? setLoaded() : str}
            </span>
        </h4>
    );
}
SearchStatus.propTypes = {
    usersTotal: PropTypes.array.isRequired
};
export default SearchStatus;
