import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Model } from './components/model';
import HomePage from './pages/home/HomePage';
import NewModelPage from './pages/models/upload/NewModelPage';
import LoginPage from './pages/auth/LoginPage';
import ModelsListPage from './pages/models/list/ModelsListPage';
import SearchResultsPage from './pages/search/SearchResultsPage';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/models">
        <ModelsListPage />
      </Route>
      <Route exact path="/models/new">
        <NewModelPage />
      </Route>
      <Route exact path="/models/:id" children={<Model />} />
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/search">
        <SearchResultsPage />
      </Route>
    </Switch>
  );
};

export default Routes;
