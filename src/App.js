import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Customer from './Customer';
import Dashboard from './Dashboard';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/customer" component={Customer} />
            </Switch>
        </Router>
    );
};

export default App;
