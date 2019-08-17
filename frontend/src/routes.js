import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Feed from './pages/Feed';
import New from './pages/New';
import Update from './pages/Update';

function Routes(){
    return (
        <Switch>
            <Route path="/" exact component={Feed} />
            <Route path="/New" component={New} />
            <Route path="/Update" component={Update} />
        </ Switch>
    );
}

export default Routes;