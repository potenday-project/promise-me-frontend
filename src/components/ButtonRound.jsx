import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ButtonRound({
  type = 'button',
  clicked = false,
  seleted = false,
  error = false,
  isValid,
  errorMessage,

  onClick,
  ...restProps
}) {
  const colorClass = clicked ? '' : seleted ? '' : error ? '' : '';

  return (
    <button
      type={type}
      className={`px-4 py-1 text-body4 box-border rounded-lg  ${colorClass}`}
      {...restProps}
      onClick={onClick}
    ></button>
  );
}

export default ButtonRound;

ButtonRound.propTypes = {
  type: PropTypes.string,
  clicked: PropTypes.bool,
  seleted: PropTypes.bool,
  error: PropTypes.bool,
  onClick: PropTypes.func,
  isValid: PropTypes.bool,
  errorMessage: PropTypes.string,
};
