import PropTypes from 'prop-types';
import { useState } from 'react';

function PlaceholderLine({
  name,
  label,
  placeholder,
  type,
  size,
  onChange,
  isValid,
  errorMessage,
}) {
  const [value, setValue] = useState('');

  const handleClearInput = () => {
    setValue('');
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const hasValue = value !== '';

  const borderColorClass =
    hasValue && !isValid ? '-border--system-danger' : '-border--grey500';

  const focusBorderColorClass =
    hasValue && !isValid
      ? 'focus:-border--system-danger'
      : 'focus:-border--primary-blue500';

  const caretColorClass =
    hasValue && !isValid ? ' -caret--system-danger' : '-caret--primary-blue500';

  const buttonText = hasValue && !isValid ? '!' : 'x';

  // Message 컴포넌트를 함수로 변경
  const Message = () => {
    if (!errorMessage || errorMessage === '') {
      return null;
    }

    const messageText = isValid ? (
      ''
    ) : (
      <span className="text-body5 -text--system-danger">{errorMessage}</span>
    );

    return <div className="message">{messageText}</div>;
  };

  return (
    <div className="relative flex flex-col w-full gap-1">
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`w-full h-auto py-2
        focus:outline-none ${focusBorderColorClass} border-b-2 ${borderColorClass}
      ${caretColorClass} ${size === 'small' ? 'text-body4' : 'text-body3'}`}
      />

      {hasValue && (
        <>
          <button className="absolute top-2 right-2" onClick={handleClearInput}>
            {buttonText}
          </button>
          <Message />
        </>
      )}
    </div>
  );
}

export default PlaceholderLine;

PlaceholderLine.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.string,
  onChange: PropTypes.func,
  isValid: PropTypes.bool,
  errorMessage: PropTypes.string,
};
