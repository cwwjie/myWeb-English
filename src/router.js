import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import English from './routes/index';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={English} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
