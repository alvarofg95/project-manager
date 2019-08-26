import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import reduxActions from './redux/actions/index.js';
import Home from './pages/Home';
import Login from './pages/Login';
import Header from './components/Header';
import SignUp from './pages/SignUp';
import Users from './pages/Users';
import Teams from './pages/Teams';
import NewTeam from './pages/NewTeam.js';

const mapDispatchToProps = dispatch => {
  return {
    loadAppInfo: cookies => {
      dispatch(reduxActions.loadAppInfo(cookies));
    }
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false
    };
    this.cookies = new Cookies();
  }

  componentWillMount() {
    const { loadedAppInfo, loadAppInfo } = this.props;
    if (!loadedAppInfo) {
      loadAppInfo(this.cookies);
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/teams" component={Teams} />
          <Route exact path="/new-team" component={NewTeam} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log({ state });
  return {
    token: state && state.token,
    loadedAppInfo: state && state.loadedAppInfo
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
