import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/home/Home";
import Cart from "../pages/cart/Cart";
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import SignUp from "../pages/signup/SignUp";

const Routes = () => {

    return (
        <Switch>
            <Route path="/" exact >
                <Home/>
            </Route>
            <Route path="/cart">
                <Cart/>
            </Route>
            <Route path="/login">
                <Login/>
            </Route>
            <Route path="/dashboard">
                <Dashboard/>
            </Route>
            <Route path="/SignUp">
                <SignUp/>
            </Route>
        </Switch>
    );
};

export default Routes;
