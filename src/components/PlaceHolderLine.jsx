import PropTypes from 'prop-types';
import { useState } from 'react';

function Message({ text, isValid }) {
  if (!text || text === '') {
    return null;
  }

  const messageText = isValid ? (
    ''
  ) : (
    <span className="text-body5 -text--system-danger">{text}</span>
  );

  return <div className="message">{messageText}</div>;
}

function PlaceHolderLine(props) {
  const {
    type, // 타입설정 (text,password)
    name, // 이름 설정 라벨 등에 사용
    label, // 라벨 내용// id 지정
    placeHolder, // 힌트 메시지
    size, // 글자 사이즈 small 입력시 작아짐
    errorMessage, // 빨간색 에러 메시지
    isValid, // 유효성 검사에 사용해 에러메시지 출력시 사용
    defaultValue, // 기본값 작성, 추후 아이디 저장 등에 활용 가능
    onChange,
  } = props;

  const [inputValue, setInputValue] = useState(defaultValue || '');

  const hasValue =
    defaultValue !== undefined && defaultValue !== null && defaultValue !== '';

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const handleClearInput = () => {
    setInputValue('');
  };

  return (
    <div className="relative">
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeHolder}
        onChange={handleInputChange}
        value={inputValue}
        className={`w-full h-auto py-2
      focus:outline-none focus:-border--primary-blue500 border-b-2 border-grey500
      -caret--primary-blue500 ${
        size === 'small' ? 'text-body4' : 'text-body3'
      }`}
      />
      {inputValue && (
        <button className="absolute top-2 right-2" onClick={handleClearInput}>
          x
        </button>
      )}
      {hasValue && (
        <Message text={isValid ? '' : errorMessage} isValid={isValid} />
      )}
    </div>
  );
}

PlaceHolderLine.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  size: PropTypes.string,
  errorMessage: PropTypes.string,
  isValid: PropTypes.bool,
  defaultValue: PropTypes.string,
};

export default PlaceHolderLine;
