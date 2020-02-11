import React, { Fragment } from 'react';
import Validator from '../../utils/validator';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: null
    };
    this.input = React.createRef();
  }

  validate = () => {
    const { minLength, sameAs } = this.props;
    const error = Validator.validate(this.input, { minLength, sameAs });
    console.log({ error });
    this.setState({ ...error });
  };

  render() {
    const {
      type = 'text',
      placeholder,
      onChange,
      disabled,
      className,
      divClassName,
      required,
      inLine,
      textArea,
      rows,
      onKeyDown,
      name
    } = this.props;
    const { error, errorMessage } = this.state;
    return textArea ? (
      <textarea
        ref={this.input}
        className={`basicInput ${className}`}
        style={error ? { borderColor: 'red' } : {}}
        required={required}
        type={type}
        rows={rows}
        placeholder={placeholder}
        onChange={onChange}
        //onBlur={validator}
      />
    ) : (
      <Fragment>
        <input
          name={name}
          ref={this.input}
          className={error ? 'error' : ''}
          style={error ? { borderColor: 'red' } : {}}
          required={required}
          disabled={disabled}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={this.validate}
          onKeyDown={onKeyDown}
        />
        {error ? <span className="errorLabel">{errorMessage}</span> : null}
      </Fragment>
    );
  }
}
export default TextInput;
