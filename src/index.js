import React from 'react';
import ReactDOM from 'react-dom';
import Home from "./component/Home";
import Upload from "./component/Upload";
import {BrowserRouter,Switch, Route, Redirect} from 'react-router-dom'

const router=
    <BrowserRouter basename="/Local-File-Server">
        <Switch>
            <Route exact path="/">
                <Redirect to="/home"/>
            </Route>
            <Route path="/home" component={Home} title={"Home"}/>
            <Route path="/upload" component={Upload} title={"Profile"}/>
            <Route path="*">
                <Redirect to={"/home"}/>
            </Route>
        </Switch>
    </BrowserRouter>;



ReactDOM.render(router, document.getElementById('root'));
