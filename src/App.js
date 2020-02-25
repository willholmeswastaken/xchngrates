import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store';
import Home from './components/home';
import Header from './components/header';
import ViewRate from './components/viewRate';

import './App.css';

const App = () => {
  return (
    <Provider store={store()}>
    <Router>
      <div>
        <nav>
          <Header />
        </nav>

        <Route path="/" exact component={Home} />
        <Route path="/currency/:currency" exact component={ViewRate} />
      </div>
    </Router>
    </Provider>
  );
}

export default App;
