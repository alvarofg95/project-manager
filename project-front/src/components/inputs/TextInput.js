import React from 'react';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: null
    };
    this.input = React.createRef();

    this.validate = this.validate.bind(this);
  }

  validate() {
    const valueInput = this.input.current.value;
    if (
      this.props.type === 'email' &&
      (valueInput.indexOf('@') === -1 || valueInput.indexOf('.') === -1)
    ) {
      this.setState({
        error: true,
        errorMessage: 'El campo es tipo email'
      });
    } else if (this.props.required && !valueInput) {
      this.setState({ error: true, errorMessage: 'El campo es obligatorio' });
    } else if (this.props.minLength > valueInput.length) {
      this.setState({
        error: true,
        errorMessage: `El campo tiene que tener una longitud mínima de ${
          this.props.minLength
        } caracteres`
      });
    } else {
      this.setState({ error: false, errorMessage: null });
    }
  }

  render() {
    const {
      type = 'text',
      placeholder,
      onChange,
      label = null,
      className,
      labelClassName,
      divClassName,
      required,
      inLine,
      textArea,
      rows,
      onKeyDown
    } = this.props;
    const { error, errorMessage } = this.state;

    if (label) {
      return (
        <div className={`${(divClassName && divClassName) || ''} ${inLine ? 'flex' : ''}`}>
          <p className={labelClassName}>{label}</p>
          {textArea ? (
            <textarea
              ref={this.input}
              className={`basicInput ${(className && className) || ''}`}
              style={error ? { borderColor: 'red' } : {}}
              required={required}
              type={type}
              placeholder={placeholder}
              rows={rows}
              onChange={onChange}
              onBlur={this.validate}
            />
          ) : (
            <input
              ref={this.input}
              className={`basicInput ${(className && className) || ''}`}
              style={error ? { borderColor: 'red' } : {}}
              required={required}
              type={type}
              placeholder={placeholder}
              onChange={onChange}
              onBlur={this.validate}
              onKeyDown={onKeyDown}
            />
          )}
          {error ? <p className="errorLabel">{errorMessage}</p> : null}
        </div>
      );
    }
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
        onBlur={this.validate}
      />
    ) : (
      <input
        ref={this.input}
        className={`basicInput ${className}`}
        style={error ? { borderColor: 'red' } : {}}
        required={required}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={this.validate}
        onKeyDown={onKeyDown}
      />
    );
  }
}
export default TextInput;
