import React, { Component } from 'react';
import { connect } from 'react-redux';
import reduxActions from '../redux/actions/index';
import TextInput from '../components/inputs/TextInput';
import CustomButton from '../components/buttons/CustomButton';
import '../style/login.scss';
import postToAPI from '../utils/postToAPI';
import { ADD_USER_MUTATION } from '../apiData/mutations';

const mapDispatchToProps = dispatch => ({
  loginUser: ({ userId, nick, email, token }) => {
    dispatch(reduxActions.loginUser({ userId, nick, email, token }));
  }
});

class SignUp extends Component {
  state = {
    error: false,
    errorMessage: null,
    nick: null,
    email: null,
    password: null,
    secondPassword: null,
    disabled: true
  };

  goBack = () => {
    const { history } = this.props;
    if (history) {
      history.push('/login');
    }
  };

  userSignUp = () => {
    const { nick, email, password } = this.state;
    console.log({ nick, email, password });
    if (nick && password && email) {
      postToAPI(ADD_USER_MUTATION, { nick, email, password }).then(res => {
        console.log({ res });
        if (res && res.data && res.data.addUser) {
          const {
            data: {
              addUser: { _id, token }
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
        }
      });
    } else {
      this.setState({
        error: true,
        errorMessage: 'El nick y la contraseña son campos obligatorios'
      });
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
      if (
        name === 'secondPassword' &&
        value === prevState.password &&
        prevState.nick &&
        prevState.email
      ) {
        prevState.disabled = false;
      }
      return { ...prevState };
    });
  };

  render() {
    const { password, disabled } = this.state;
    return (
      <div id="loginContainer">
        <p>Regístrate y gestiona tus proyectos</p>
        <TextInput
          required
          name="nick"
          minLength={3}
          divClassName="packLoginDiv"
          labelClassName="loginLabel"
          className="loginInput"
          placeholder="Nombre de usuario*"
          onChange={this.handleInput}
          onKeyDown={this.onKeyPressed}
        />
        <TextInput
          type="email"
          required
          name="email"
          minLength={3}
          divClassName="packLoginDiv"
          labelClassName="loginLabel"
          className="loginInput"
          placeholder="Email*"
          onChange={this.handleInput}
          onKeyDown={this.onKeyPressed}
        />
        <TextInput
          required
          minLength={8}
          name="password"
          divClassName="packLoginDiv"
          labelClassName="loginLabel"
          className="loginInput"
          placeholder="Contraseña*"
          type="password"
          onChange={this.handleInput}
          onKeyDown={this.onKeyPressed}
        />
        <TextInput
          name="secondPassword"
          type="password"
          placeholder="Repetir Contraseña*"
          sameAs={password}
          required
          disabled={!password}
          onChange={this.handleInput}
          onKeyDown={this.onKeyPressed}
        />
        <div className="buttonContainer">
          <CustomButton disabled={disabled} onClick={this.userSignUp} text="Registrarme" />
          <CustomButton className="backButton" onClick={this.goBack} text="Volver" />
        </div>
      </div>
    );
  }
}
export default connect(null, mapDispatchToProps)(SignUp);
