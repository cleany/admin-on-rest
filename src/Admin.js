import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createHashHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import withContext from 'recompose/withContext';
import ReactGA from 'react-ga';
import { Route, Switch } from 'react-router-dom';

import { USER_LOGOUT } from './actions/authActions';
import Login from './mui/auth/Login';
import createAppReducer from './reducer';
import { crudSaga } from './sideEffect/saga';
import Menu from './mui/layout/Menu';
import TranslationProvider from './i18n/TranslationProvider';
import AdminRoutes from './AdminRoutes';

const Admin = ({
    appLayout,
    authClient,
    children,
    customReducers = {},
    customSagas = [],
    customRoutes = [],
    dashboard,
    history,
    locale,
    messages = {},
    menu = Menu,
    catchAll,
    restClient,
    theme,
    title = 'Admin on REST',
    loginPage,
    logoutButton,
    initialState,
    idAnalytics,
}) => {
    const appReducer = createAppReducer(customReducers, locale);
    const resettableAppReducer = (state, action) =>
        appReducer(action.type !== USER_LOGOUT ? state : undefined, action);
    const saga = function* rootSaga() {
        yield all([crudSaga(restClient, authClient), ...customSagas].map(fork));
    };
    const sagaMiddleware = createSagaMiddleware();
    const routerHistory = history || createHistory();
    const store = createStore(
        resettableAppReducer,
        initialState,
        compose(
            applyMiddleware(sagaMiddleware, routerMiddleware(routerHistory)),
            typeof window !== 'undefined' && window.devToolsExtension
                ? window.devToolsExtension()
                : f => f
        )
    );
    sagaMiddleware.run(saga);

    const persistor = persistStore(store);
    const registry = persistor.getState().registry;

    if (idAnalytics) {
        ReactGA.initialize(idAnalytics);
    }

    const logPageView = () => {
        if (idAnalytics) {
            ReactGA.set({
                page: window.location.hash + window.location.search,
            });
            ReactGA.pageview(window.location.hash + window.location.search);
            return null;
        }
        return null;
    };

    const AdminContent = () => {
        return (
            <TranslationProvider messages={messages}>
                <ConnectedRouter history={routerHistory}>
                    <Switch>
                        {loginPage && (
                            <Route
                                exact
                                path="/login"
                                render={({ location }) => {
                                    logPageView();
                                    return createElement(loginPage, {
                                        location,
                                        title,
                                        theme,
                                    });
                                }}
                            />
                        )}
                        <Route
                            path="/"
                            render={routeProps => {
                                logPageView();
                                return (
                                    <AdminRoutes
                                        appLayout={appLayout}
                                        catchAll={catchAll}
                                        customRoutes={customRoutes}
                                        dashboard={dashboard}
                                        logout={logoutButton}
                                        menu={menu}
                                        theme={theme}
                                        title={title}
                                        {...routeProps}
                                    >
                                        {children}
                                    </AdminRoutes>
                                );
                            }}
                        />
                    </Switch>
                </ConnectedRouter>
            </TranslationProvider>
        );
    };

    return (
        <Provider store={store}>
            {registry.length ? (
                <PersistGate loading={null} persistor={persistor}>
                    <AdminContent />
                </PersistGate>
            ) : (
                <AdminContent />
            )}
        </Provider>
    );
};

const componentPropType = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
]);

Admin.propTypes = {
    appLayout: componentPropType,
    authClient: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    catchAll: componentPropType,
    customSagas: PropTypes.array,
    customReducers: PropTypes.object,
    customRoutes: PropTypes.array,
    dashboard: componentPropType,
    history: PropTypes.object,
    loginPage: componentPropType,
    logoutButton: componentPropType,
    menu: componentPropType,
    restClient: PropTypes.func,
    theme: PropTypes.object,
    title: PropTypes.node,
    locale: PropTypes.string,
    messages: PropTypes.object,
    initialState: PropTypes.object,
    idAnalytics: PropTypes.string,
};

Admin.defaultProps = {
    loginPage: Login,
};

export default withContext(
    {
        authClient: PropTypes.func,
    },
    ({ authClient }) => ({ authClient })
)(Admin);
