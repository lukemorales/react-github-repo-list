import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './pages/Main/Main';
import Repository from './pages/Repository/Repository';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/repository/:repo" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}
