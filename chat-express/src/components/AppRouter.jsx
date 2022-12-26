//import React, { useContext } from 'react';
import React from 'react';
import { privateRoutes, publicRoutes } from '../routes';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utilis/consts';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Context } from '../index';
import { useAuthState } from "react-firebase-hooks/auth"
import { useContext } from 'react';


const AppRouter = () => {
    const { auth } = useContext(Context)
    const [user] = useAuthState(auth)

    console.log(user)
    //если пользователь авторизован true, если нет false
    //если авторизован попадает в privateRoutes, если нет то в publicRoutes
    //соответственно в switch меняется ...map, exact{true/false} и Redirect {CHAT_ROUTE} для true и {LOGIN_ROUTE} для false 
    return user ?
        (
            <Switch>
                {privateRoutes.map(({ path, Component }) =>
                    <Route path={path} component={Component} exact={true} />
                )}
                <Redirect to={CHAT_ROUTE} />

            </Switch>
        )
        :
        (
            <Switch>
                {publicRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} component={Component} exact={true} />
                )}
                <Redirect to={LOGIN_ROUTE} />

            </Switch>
        )
};

export default AppRouter;