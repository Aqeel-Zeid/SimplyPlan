import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import BookEventPage from './Pages/BookEventPage';
import ViewAllEventsPage from './Pages/ViewAllEventsPage';

import {Container} from 'semantic-ui-react'

function App() {
  return (
    <Container>
      <Router>
        <Switch>
            <Route path="/viewAllEvents">
              <ViewAllEventsPage/>
            </Route>
            <Route path="/BookEvent">
              <BookEventPage/>
            </Route>
            <Route path="/SignUp">
              <SignUpPage/>
            </Route>
            <Route path="/">
              <LoginPage/>
            </Route>
          </Switch>
      </Router>
    </Container>
  );
}

export default App;
