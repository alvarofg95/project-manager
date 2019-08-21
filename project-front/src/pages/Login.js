import React, { Component } from 'react';
import { connect } from 'react-redux';
import reduxActions from '../redux/actions/index';
import LOGIN_QUERY from '../queries/login.query';
import postToAPI from '../utils/postToAPI';
import TextInput from '../components/inputs/TextInput';
import CustomButton from '../components/buttons/CustomButton';

const mapDispatchToProps = dispatch => {
  return {
    loginUser: ({ userId, nick, email, token }) => {
      dispatch(reduxActions.loginUser(userId, token, nick, email));
    }
  };
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: null
    };

    this.nick = React.createRef();
    this.password = React.createRef();

    this.userLogin = this.userLogin.bind(this);
    this.openSignInForm = this.openSignInForm.bind(this);
    this.onKeyPressed = this.onKeyPressed.bind(this);
  }

  userLogin() {
    const nick = this.nick.current.input.current.value;
    const password = this.password.current.input.current.value;
    console.log({ nick, password });
    if (nick && password) {
      postToAPI(LOGIN_QUERY, { nick, password }).then(res => {
        console.log({ res });
        if (res && res.data && res.data.login) {
          const {
            data: {
              login: { _id, token, email }
            }
          } = res;
          if (token) {
            this.props.loginUser({
              userId: _id,
              nick,
              email,
              token
            });
            this.props.history.push('/');
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
  }

  openSignInForm() {
    this.props.history.push('/sign-up');
  }

  onKeyPressed(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      this.userLogin();
    }
  }

  render() {
    return (
      <div>
        <TextInput
          required
          minLength={3}
          divClassName="packLoginDiv"
          labelClassName="loginLabel"
          className="loginInput"
          label="Nombre de usuario"
          onKeyDown={this.onKeyPressed}
          ref={this.nick}
        />
        <TextInput
          required
          minLength={8}
          divClassName="packLoginDiv"
          labelClassName="loginLabel"
          className="loginInput"
          label="Contraseña"
          type="password"
          onKeyDown={this.onKeyPressed}
          ref={this.password}
        />
        <CustomButton
          className="logInButton"
          backgroundColor="#4ca540"
          height={35}
          fontSize={20}
          borderRadius="10px"
          onClick={this.userLogin}
          text="Iniciar sesión"
        />
        <CustomButton
          className="signInButton"
          backgroundColor="#2196F3"
          height={35}
          fontSize={20}
          borderRadius="10px"
          onClick={this.openSignInForm}
          text="Registrar"
        />
        {this.state.error ? <p>{this.state.errorMessage}</p> : null}
      </div>
    );
  }
}
export default connect(
  null,
  mapDispatchToProps
)(Login);
