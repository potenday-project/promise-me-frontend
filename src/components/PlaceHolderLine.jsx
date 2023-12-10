import PropTypes from 'prop-types';
import { useState } from 'react';
import { circleX, circleAlert } from '@/assets/icons/svg-icons';
import ErrorMessage from './ErrorMessage';
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

  const errorClass =
    hasValue && !isValid
      ? 'border-b-2 -border--system-danger focus:-border--system-danger -caret--system-danger'
      : 'border-b-2 -border--grey500 focus:-border--primary-blue500 -caret--primary-blue500';

  return (
    <div className="relative w-full">
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
        focus:outline-none border-b-2 ${errorClass}  
        ${size === 'small' ? 'text-body4' : 'text-body3'}`}
      />

      <div className="absolute flex gap-1 top-2 right-2">
        {hasValue && !isValid ? (
          <img src={circleAlert} alt="오류" />
        ) : (
          <>
            {hasValue && (
              <button onClick={handleClearInput}>
                <img src={circleX} alt="삭제" />
              </button>
            )}
          </>
        )}
      </div>
      {hasValue && (
        <ErrorMessage isValid={isValid} errorMessage={errorMessage} />
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
