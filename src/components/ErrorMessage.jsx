import PropTypes from 'prop-types';

function ErrorMessage({ isValid, errorMessage }) {
  if (!errorMessage || errorMessage === '' || isValid) {
    return null;
  }

  return (
    <span className="pt-1 text-body5 -text--system-danger">{errorMessage}</span>
  );
}

ErrorMessage.propTypes = {
  isValid: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default ErrorMessage;
