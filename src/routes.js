import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SignIn from "./component/signIn";
import SignUp from "./component/signUp";
import AddressTable from "./component/tables"; 


export default function Routes({name}) {
    return (
        <Switch>
            <Route exact path="/" render={()=><SignIn name={name}/>} />
            <Route path="/signup" component={SignUp} />
            <Route path="/address" component={AddressTable} />
        </Switch>
    )
}