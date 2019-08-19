import React, { Component } from 'react';
import { connect } from 'react-redux';
import reduxActions from '../redux/actions/index';
import TextInput from '../components/inputs/TextInput';
import CustomButton from '../components/buttons/CustomButton';
import { validateEmail } from '../utils/validations';
import postToAPI from '../utils/postToAPI';
import ADD_USER_MUTATION from '../queries/addUser.mutation';

const mapDispatchToProps = dispatch => {
  return {
    loginUser: ({ userId, token, nick, email }) => {
      dispatch(reduxActions.loginUser(userId, token));
    }
  };
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.signIn = this.signIn.bind(this);
    this.nick = React.createRef();
    this.email = React.createRef();
    this.firstPassword = React.createRef();
    this.secondPassword = React.createRef();
  }

  signIn() {
    const nick = this.nick.current.input.current.value;
    const email = this.email.current.input.current.value;
    const firstPassword = this.firstPassword.current.input.current.value;
    const secondPassword = this.secondPassword.current.input.current.value;
    if (nick && validateEmail(email) && firstPassword === secondPassword) {
      const userData = {
        nick,
        email,
        password: firstPassword
      };

      postToAPI(ADD_USER_MUTATION, userData).then(res => {
        if (res && res.data && res.data.addUser) {
          this.props.history.push('/');
        } else if (res && res.errors) {
          this.setState({ error: res.errors[0].message });
        }
      });
    } else {
      this.setState({ error: 'Revisa los campos' });
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
          label="Email"
          type="email"
          onKeyDown={this.onKeyPressed}
          ref={this.email}
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
          ref={this.firstPassword}
        />
        <TextInput
          required
          minLength={8}
          divClassName="packLoginDiv"
          labelClassName="loginLabel"
          className="loginInput"
          label="Repetir Contraseña"
          type="password"
          onKeyDown={this.onKeyPressed}
          ref={this.secondPassword}
        />
        {this.state.error ? <span>{this.state.error}</span> : null}
        <CustomButton
          className="signInButton"
          backgroundColor="#2196F3"
          height={35}
          fontSize={20}
          borderRadius="10px"
          onClick={this.signIn}
          text="Registrar"
        />
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
