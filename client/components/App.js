import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../store';

import Home from './pages/Home';
import Header from './Header';
import Browse from './pages/Browse';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Work from './pages/Work/';
import Loader from './Loader';
import Logout from './Logout';
import Submit from './pages/Submit';
import Footer from './Footer';

import '../sass/index.scss';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Loader>
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Home} />
          <Route path="/register" exact component={Home} />
          <Route path="/browse" exact component={Browse} />
          <Route path="/browse/:page" exact component={Browse} />
          <Route path="/browse/work/:id" exact component={Work} />
          <Route path="/profile/:username" exact component={Profile} />
          <Route path="/editprofile" exact component={EditProfile} />

          <Route path="/submit" exact component={Submit} />
          <Route path="/logout" exact component={Logout} />
          {/* <Route path="(?!/|login)" component={Footer} /> */}
          <Footer />
        </Loader>
      </Router>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
