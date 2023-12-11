import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';

function ButtonRound({
  type = 'button',
  clicked = false,
  selected = false,
  error = false,
  isValid,
  errorMessage,

  onClick,
  ...restProps
}) {
  const colorClass = clicked
    ? '-bg--primary-blue100 -text--system-black border-[1px] -border--primary-blue300'
    : selected
      ? '-bg--primary-blue500 -text--system-white'
      : error
        ? 'border-[1px] -border--system-danger -text--system-black -bg--system-white'
        : 'border-[1px] -border--grey300 -text--system-black -bg--grey100';

  const hasValue = errorMessage !== '';

  const renderButton = (
    <button
      type={type}
      className={`px-4 py-1 text-body4 box-border rounded-3xl ${colorClass}`}
      {...restProps}
      onClick={onClick}
    />
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
  clicked: PropTypes.bool,
  selected: PropTypes.bool,
  error: PropTypes.bool,
  onClick: PropTypes.func,
  isValid: PropTypes.bool,
  errorMessage: PropTypes.string,
};
