import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import reduxActions from '../redux/actions/index';
import LOGIN_QUERY from '../queries/login.query';
import postToAPI from '../utils/postToAPI';
import TextInput from '../components/inputs/TextInput';
import CustomButton from '../components/buttons/CustomButton';
import '../style/login.scss';

const mapDispatchToProps = dispatch => ({
  loginUser: ({ userId, nick, email, token }) => {
    dispatch(reduxActions.loginUser(userId, nick, email, token));
  }
});

class Login extends Component {
  state = {
    error: false,
    errorMessage: null,
    nick: null,
    password: null,
    disabled: true
  };
  userLogin = () => {
    const { nick, password } = this.state;
    if (nick && password) {
      postToAPI(LOGIN_QUERY, { nick, password }).then(res => {
        if (res && res.data && res.data.login) {
          const {
            data: {
              login: { _id, token, email }
            }
          } = res;
          if (token) {
            this.props.loginUser({
              userId: _id,
              token,
              nick,
              email
            });
            this.setState({ accessToPanel: true });
          }
        } else {
          this.setState({
            error: true,
            errorMessage: 'No existe un usuario con esas credenciales'
          });
        }
      });
    } else {
      this.setState({
        error: true,
        errorMessage: 'El nick y la contraseña son campos obligatorios'
      });
    }
  };

  openSignInForm = () => {
    const { history } = this.props;
    if (history) {
      history.push('/sign-up');
    }
  };

  onKeyPressed = e => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      this.userLogin();
    }
  };

  handleInput = ({ target: { name, value } }) => {
    this.setState(prevState => {
      prevState[name] = value;
      if (prevState.nick && prevState.password) {
        prevState.disabled = false;
      }
      return { ...prevState };
    });
  };

  render() {
    const { disabled } = this.state;
    return (
      <div id="loginContainer">
        <p>Accede a tus proyectos</p>
        <TextInput
          required
          name="nick"
          minLength={3}
          divClassName="packLoginDiv"
          labelClassName="loginLabel"
          className="loginInput"
          placeholder="Nombre de usuario"
          onChange={this.handleInput}
          onKeyDown={this.onKeyPressed}
          ref={this.nick}
        />
        <br />
        <TextInput
          required
          name="password"
          minLength={8}
          divClassName="packLoginDiv"
          labelClassName="loginLabel"
          className="loginInput"
          placeholder="Contraseña"
          type="password"
          onChange={this.handleInput}
          onKeyDown={this.onKeyPressed}
          ref={this.password}
        />
        <CustomButton disabled={disabled} onClick={this.userLogin} text="Iniciar sesión" />
        <p>
          ¿Aún no estás registrado? Accede <span onClick={this.openSignInForm}>aquí</span> para
          registrarte y poder gestionar tus proyectos
        </p>
      </div>
    );
  }
}
export default withRouter(connect(null, mapDispatchToProps)(Login));
