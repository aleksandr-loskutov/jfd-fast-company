import React from "react";
import UsersListPage from "./components/page/userListPage/usersListPage.jsx";
import UserPage from "./components/page/userPage";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./layouts/login";
import Users from "./layouts/users";
function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/users/:userId?/:edit?" component={Users} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
        </>
    );
}
export default App;
