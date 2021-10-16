import React, { useEffect, useState } from "react";
import Qualitie from "../../ui/qualities/qualitie";
import PropTypes from "prop-types";
import api from "../../../api";
import Button from "../../common/button";
function UserPage({ userId, match }) {
    const [user, setUser] = useState();
    if (!userId && match.params.userId) userId = match.params.userId;
    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        });
    }, []);
    const handleEditClick = () => {};
    return user ? (
        <>
            <div className="card-body">
                <div className="card-text">
                    <dl className="row">
                        <dt>Имя</dt>
                        <dd>{user.name}</dd>
                        <dt>Профессия</dt>
                        <dd>{user.profession.name}</dd>
                        <dt>Качества</dt>
                        <dd>
                            {user.qualities.map((qualitie) => {
                                return (
                                    <Qualitie
                                        key={qualitie._id}
                                        color={qualitie.color}
                                        name={qualitie.name}
                                    />
                                );
                            })}
                        </dd>
                        <dt>Встреч</dt>
                        <dd>{user.completedMeetings}</dd>
                        <dt>Рейтинг</dt>
                        <dd>{user.rate + "/5"}</dd>
                    </dl>
                </div>
            </div>
            <Button
                handleClick={handleEditClick}
                type="button"
                link={`/users/${userId}/edit`}
            >
                Изменить
            </Button>
        </>
    ) : (
        <h2>Загрузка...</h2>
    );
}
UserPage.propTypes = {
    userId: PropTypes.string,
    match: PropTypes.object
};
export default UserPage;
