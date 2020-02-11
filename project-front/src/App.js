import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import reduxActions from './redux/actions/index';
import Header from './components/Header';
import RouterControl from './components/router/RouterControl';

const mapDispatchToProps = dispatch => ({
  loadAppInfo: cookies => {
    dispatch(reduxActions.loadAppInfo(cookies));
  }
});

const mustRedirect = pathname => {
  switch (pathname) {
    case '/sign-up':
    case '/login':
      return false;
    default:
      return true;
  }
};

class App extends Component {
  state = {
    logged: false
  };
  componentWillMount() {
    const { loadAppInfo } = this.props;
    loadAppInfo();
    const user = localStorage.user && JSON.parse(localStorage.user);
    if (!user || (user && !user.token)) {
      const { history, location } = this.props;
      if (history && location && location.pathname && mustRedirect(location.pathname)) {
        history.push('/login');
      }
    } else {
      this.setState({ logged: true });
    }
  }

  render() {
    const { logged } = this.state;
    return (
      <div className="App">
        {logged ? <Header /> : null}
        <RouterControl />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state && state.token
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
