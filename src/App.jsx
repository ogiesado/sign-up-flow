import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Form from './Form';
import Confirmation from './Confirmation';
import { ROUTE_HOME, ROUTE_FORM, ROUTE_CONFIRMATION } from './constants';

import './styles/app.scss';

/**
 * The main app component
 */
export default class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          <main className="main">
            <Switch>
              <Route exact path={ROUTE_HOME} component={Home} />
              <Route path={ROUTE_FORM} component={Form} />
              <Route path={ROUTE_CONFIRMATION} component={Confirmation} />
              <Redirect to={ROUTE_HOME} />
            </Switch>
          </main>
        </Fragment>
      </Router>
    );
  }
}
