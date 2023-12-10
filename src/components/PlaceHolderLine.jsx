import { useState } from 'react';

function Message({ text, isValid }) {
  if (!text || text === '') {
    return null;
  }

  const messageText = isValid ? (
    ''
  ) : (
    <span className="text-xs text-red-500">{text}</span>
  );

  return <div className="message">{messageText}</div>;
}

function PlaceholderLine({
  name,
  label,
  defaultValue,
  placeholder,
  type,
  onChange,
  isValid,
  passMessage,
  failMessage,
}) {
  const hasValue =
    defaultValue !== undefined && defaultValue !== null && defaultValue !== '';

  return (
    <div className="relative flex flex-col gap-1">
      <label htmlFor={name} className="text-slate-900">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        className="border border-gray-300 p-2 rounded-md focus:border-gray-900 focus:outline-none w-[300px]"
      />

      {hasValue && ( // 입력값이 있을 때만 메시지 표시
        <Message text={isValid ? passMessage : failMessage} isValid={isValid} />
      )}
    </div>
  );
}

export default PlaceholderLine;
