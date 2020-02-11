export const validate = (input, props) => {
  let response = {
    error: false,
    errorMessage: null
  };
  const {
    current: { value, type, required }
  } = input;
  if (type === 'email' && (value.indexOf('@') === -1 || value.indexOf('.') === -1)) {
    response = {
      error: true,
      errorMessage: 'El campo es tipo email'
    };
  } else if (required && !value) {
    response = { error: true, errorMessage: 'El campo es obligatorio' };
  } else if (props.minLength > value.length) {
    response = {
      error: true,
      errorMessage: `El campo tiene que tener una longitud mínima de ${props.minLength} caracteres`
    };
  } else if (props.sameAs && props.sameAs !== value) {
    response = {
      error: true,
      errorMessage: 'Las contraseñas no coinciden'
    };
  }
  return response;
};
