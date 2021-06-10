import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProtectedRoute from 'components/protected-route/ProtectedRoute';
import HomePage from 'pages/home/HomePage';
import ModelUploadPage from 'pages/models/upload/ModelUploadPage';
import EditModelPage from 'pages/models/edit/EditModelPage';
import LoginPage from 'pages/auth/LoginPage';
import RegisterPage from 'pages/auth/RegisterPage';
import ModelListPage from 'pages/models/list/ModelListPage';
import ModelViewPage from 'pages/models/view/ModelViewPage';
import SearchResultsPage from 'pages/search/SearchResultsPage';
import Error403 from 'pages/403/Error403';
import CollectionsList from 'pages/collections/CollectionsList';
import CollectionView from 'pages/collections/CollectionView';

const Routes = () => {
  return (
    <div className="flex-grow">
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/models">
          <ModelListPage />
        </Route>
        <Route exact path="/models/user/:username">
          <ModelListPage />
        </Route>
        <ProtectedRoute exact path="/models/new" component={ModelUploadPage} />
        <Route exact path="/models/:slug">
          <ModelViewPage />
        </Route>
        <Route exact path="/models/:slug/edit">
          <EditModelPage />
        </Route>
        <Route exact path="/collections/user/:username">
          <CollectionsList />
        </Route>
        <Route exact path="/collections/:slug">
          <CollectionView />
        </Route>
        <ProtectedRoute
          exact
          path="/login"
          component={LoginPage}
          reversed={true}
        />
        <ProtectedRoute
          exact
          path="/register"
          component={RegisterPage}
          reversed={true}
        />
        <Route exact path="/search">
          <SearchResultsPage />
        </Route>
        <Route exact path="/403">
          <Error403 />
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;
