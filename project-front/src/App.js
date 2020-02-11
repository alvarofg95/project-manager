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
class App extends Component {
  cookies = null;

  componentWillMount() {
    if (!this.cookies) {
      this.cookies = new Cookies();
    }
    this.props.loadAppInfo(this.cookies);
    const { token } = this.props;
    console.log({ props: this.props });
    if (!token) {
      const { history } = this.props;
      if (history) {
        history.push('/login');
      }
    }
    console.log({ token });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <RouterControl />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state && state.token
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
