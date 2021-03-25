import { Switch, Route } from 'react-router-dom';
import './App.css';
import { ModelsList } from './components/models-list';
import { Model } from './components/model';
import NewModelPage from './pages/models/upload/NewModelPage';
import LoginPage from './pages/auth/LoginPage';
import Nav from './components/nav/Nav';

function App() {
  return (
    <div className="container max-w-full mx-auto md:py-2 px-6">
      <Nav />
      <Switch>
        <Route exact path="/">
          <p>App entry</p>
        </Route>
        <Route exact path="/models">
          <ModelsList />
        </Route>
        <Route exact path="/models/new">
          <NewModelPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/models/:id" children={<Model />} />
      </Switch>
    </div>
  );
}

export default App;
