import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

function LogOut(props) {
    const { logOut } = useAuth();
    useEffect(() => {
        logOut();
    }, []);
    return <h1>Loading</h1>;
}

export default LogOut;
