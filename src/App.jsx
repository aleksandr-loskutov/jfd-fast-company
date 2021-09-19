import React from "react";
import Users from "./components/users.jsx";
import NavBar from "./components/navBar";
import Main from "./components/main";
import { Route, Switch } from "react-router-dom";
import Login from "./components/login";
function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={Users} />
                <Route path="/" exact component={Main} />
            </Switch>
        </>
    );
}
export default App;
