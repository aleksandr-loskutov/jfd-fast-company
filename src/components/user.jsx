import React, { useEffect, useState } from "react";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import api from "../api";
function User({ userId }) {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        });
    }, []);
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
            <Link to="/users">
                <button type="button">Все пользователи</button>
            </Link>
        </>
    ) : (
        <h2>Загрузка...</h2>
    );
}
User.propTypes = {
    userId: PropTypes.string.isRequired
};
export default User;
