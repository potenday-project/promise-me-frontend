import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';

function ButtonRound({
  type = 'button',
  status = 'default',
  isValid,
  errorMessage,
  onClick,
  children,
  ...restProps
}) {
  let colorClass;
  switch (status) {
    case 'clicked':
      colorClass = '-bg--primary-blue100 -text--system-black border-[1px] -border--primary-blue300';
      break;
    case 'selected':
      colorClass = '-bg--primary-blue500 -text--system-white';
      break;
    case 'error':
      colorClass = 'border-[1px] -border--system-danger -text--system-black -bg--system-white';
      break;
    default:
      colorClass = 'border-[1px] -border--grey300 -text--system-black -bg--grey100';
      break;
  }

  const hasValue = errorMessage !== '';

  const renderButton = (
    <button
      type={type}
      className={`px-4 py-1 text-body4 box-border rounded-3xl ${colorClass}`}
      {...restProps}
      onClick={onClick}
    >
      {children}
    </button>
  );

  const renderErrorMessage = hasValue && (
    <ErrorMessage isValid={isValid} errorMessage={errorMessage} />
  );

  return (
    <>
      {hasValue ? (
        <div className="flex flex-col items-start">
          {renderButton}
          {renderErrorMessage}
        </div>
      ) : (
        renderButton
      )}
    </>
  );
}

export default ButtonRound;

ButtonRound.propTypes = {
  type: PropTypes.string,
  status: PropTypes.string,
  onClick: PropTypes.func,
  isValid: PropTypes.bool,
  errorMessage: PropTypes.string,
};