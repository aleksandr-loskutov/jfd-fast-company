import React from "react";

function SearchStatus({usersTotal}){
        const declOfNum = (usersTotal, titles) => {
            const cases = [0, 2, 1, 1, 1, 2];
            return titles[
                usersTotal % 100 > 4 && usersTotal % 100 < 20
                    ? 2
                    : cases[usersTotal % 10 < 5 ? usersTotal % 10 : 5]
                ];
        };
        let str = usersTotal > 0 ? `${usersTotal} ` : "";
        str += declOfNum(usersTotal, [
            "Никто с тобой не тусанет",
            "человека тусанут с тобой сегодня",
            "человек тусанёт с тобой сегодня",
        ]);
        return (
            <span className={"badge m-2 bg-" + (usersTotal > 0 ? "primary" : "danger")}>
        {str}
      </span>
        );
}

export default SearchStatus