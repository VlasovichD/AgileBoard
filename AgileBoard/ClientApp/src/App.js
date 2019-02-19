import React from 'react';
import { Route } from 'react-router';
import { PrivateRoute } from './components/PrivateRoute';
import Layout from './components/Layout';
import { HomePage } from './HomePage';
import { UserPage } from './UserPage';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';

export default () => (
    <Layout>
        <PrivateRoute exact path='/' component={HomePage} />
        <Route path='/users' component={UserPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
    </Layout>
);
