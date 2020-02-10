import React, { Component } from 'react';
import { connect } from 'react-redux';
import reduxActions from '../redux/actions/index';
import LOGIN_QUERY from '../queries/login.query';
import postToAPI from '../utils/postToAPI';
import TextInput from '../components/inputs/TextInput';
import CustomButton from '../components/buttons/CustomButton';
import '../style/login.scss';

const mapDispatchToProps = dispatch => {
  return {
    loginUser: ({ userId, nick, email, token }) => {
      dispatch(reduxActions.loginUser(userId, nick, email, token));
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
  }

  openSignInForm() {
    this.setState({ registerForm: true });
  }

  onKeyPressed(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      this.userLogin();
    }
  }

  render() {
    console.log('this.props', this.props);
    return (
      <div id="loginContainer">
        <p>Accede a tus proyectos</p>
        <TextInput
          required
          minLength={3}
          divClassName="packLoginDiv"
          labelClassName="loginLabel"
          className="loginInput"
          placeholder="Nombre de usuario"
          onKeyDown={this.onKeyPressed}
          ref={this.nick}
        />
        <br />
        <TextInput
          required
          minLength={8}
          divClassName="packLoginDiv"
          labelClassName="loginLabel"
          className="loginInput"
          placeholder="Contraseña"
          type="password"
          onKeyDown={this.onKeyPressed}
          ref={this.password}
        />
        <CustomButton
          onClick={this.userLogin}
          text="Iniciar sesión"
        />
        <p>
          ¿Aún no estás registrado? Accede <span onClick={this.openSignInForm}>aquí</span> para
          registrarte y poder gestionar tus proyectos
        </p>
      </div>
    );
  }
}
export default connect(null, mapDispatchToProps)(Login);
