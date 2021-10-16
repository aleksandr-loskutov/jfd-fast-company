import React from "react";
import UsersListPage from "./components/page/userListPage/usersListPage.jsx";
import UserPage from "./components/page/userPage";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import { Route, Switch } from "react-router-dom";
import Login from "./layouts/login";
function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId/edit" component={UserPage} />
                <Route path="/users/:userId?" component={UsersListPage} />
                <Route path="/" exact component={Main} />
            </Switch>
        </>
    );
}
export default App;
