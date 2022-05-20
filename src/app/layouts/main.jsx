import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
    return (
        <div className="card text-center mt-5">
            <div className="card-body">
                <h1 className="card-title">Поиск друзей в один клик!</h1>
                <p className="card-text">
                    В нашем приложении ты без труда найдешь себе компанию по
                    интересам.
                </p>
                <Link to={"/login"} className="btn btn-primary">
                    Войти
                </Link>
            </div>
        </div>
    );
};

export default Main;
