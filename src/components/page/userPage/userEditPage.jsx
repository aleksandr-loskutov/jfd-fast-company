import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import EditUserForm from "../../ui/editUserForm";

function UserEditPage({ userId }) {
    const [user, setUser] = useState();
    const [qualities, setQualities] = useState({});
    const [professions, setProfessions] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        });
        api.professions.fetchAll().then((data) => {
            setProfessions(data);
        });
        api.qualities.fetchAll().then((data) => {
            setQualities(data);
        });
    }, []);

    const handleSubmit = (data) => {
        api.users.update(userId, data).then(() => {
            window.location.href = `/users/${userId}`;
        });
    };
    console.log(user);
    return user ? (
        <>
            <h2>Редактируем {user && user.name}</h2>
            <EditUserForm
                {...user}
                allQualities={qualities}
                allProfessions={professions}
                onSubmit={handleSubmit}
            />
        </>
    ) : (
        <h2>Загрузка</h2>
    );
}
UserEditPage.propTypes = {
    userId: PropTypes.string
};
export default UserEditPage;
