import React from 'react';
import ReactDOM from 'react-dom';
import Home from "./component/Home";
import Profile from "./component/Profile";
import {BrowserRouter,Switch, Route, Redirect} from 'react-router-dom'

const router=
    <BrowserRouter>
        <Switch>
            <Route exact path="/">
                <Redirect to="/home"/>
            </Route>
            <Route path="/home" component={Home} title={"Home"}/>
            <Route path="/profile/:username" component={Profile} title={"Profile"}/>
            <Route path="*">
                <Redirect to={"/home"}/>
            </Route>
        </Switch>
    </BrowserRouter>;



ReactDOM.render(router, document.getElementById('root'));
