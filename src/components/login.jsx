import React, { useState } from "react";

function Login(props) {
    const [data, setData] = useState({ email: "", password: "" });
    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    return (
        <form action="">
            <div>
                <label htmlFor="data">Email</label>
                <input
                    type="text"
                    id="email"
                    value={data.email}
                    onChange={handleChange}
                    name="email"
                />
            </div>
            <div>
                <label htmlFor="password">password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                />
            </div>
        </form>
    );
}

export default Login;
