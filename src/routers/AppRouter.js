import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//
import StartPage from '../components/StartPage';
import AnotherPage from '../components/AnotherPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';

const AppRouter = () => (
    <BrowserRouter>
        <div className="app-container">
            <Header />
            <Switch>
                <Route path="/" component={StartPage} exact={true} />
                <Route path="/:page" component={AnotherPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
