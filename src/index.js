import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import docsReducer from './state/reducers';
import 'antd/dist/antd.less';
import { NotFoundPage } from './components/pages/NotFound';
import { Admin } from './components/pages/Admin';
import { LoginPage } from './components/pages/Login';
import { LandingPage } from './components/pages/Landing';
import { config } from './utils/oktaConfig';
import { LoadingComponent, Header } from './components/common';
import './reset.css';

const store = createStore(docsReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById('root')
);

function App() {
  const history = useHistory();

  const authHandler = () => {
    history.push('/login');
  };

  return (
    <Security {...config} onAuthRequired={authHandler}>
      <Header />
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/implicit/callback" component={LoginCallback} />
        {/* any of the routes you need secured should be registered as SecureRoutes */}
        <SecureRoute
          path="/"
          exact
          component={() => <LandingPage LoadingComponent={LoadingComponent} />}
        />
        <SecureRoute path="/admin" component={Admin} />
        <Route component={NotFoundPage} />
      </Switch>
    </Security>
  );
}
