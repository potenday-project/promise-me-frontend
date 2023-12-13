import TodoItem from '@/components/TodoItem';
import React, { useState } from 'react';
import {
  triangleLeft,
  triangleRight,
  square,
  squareBeforeChecked,
} from '@/assets/icons/svg-icons';

function TodoList() {
  const [inputValue, setInputValue] = useState('');
  const [todoArray, setTodoArray] = useState([
    {
      text: '컬러칩 체크하기',
      isChecked: false,
    },
    {
      text: '컬러칩 체크하기',
      isChecked: true,
    },
  ]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setTodoArray((prevTodoArray) => [
        ...prevTodoArray,
        { text: inputValue, isChecked: false },
      ]);
      setInputValue(''); // 여기에서 inputValue를 빈 문자열로 설정
    }
  };

  return (
    <section className="flex flex-row items-center h-full gap-4">
      <button>
        <img src={triangleLeft} alt="이전날짜" />
      </button>
      <div className="w-full -bg--system-white rounded-3xl mx-auto h-auto p-4 flex flex-col border-[1px] -border--grey300">
        <button className="mb-6">날짜 버튼</button>
        <ul className="flex flex-col gap-2">
          {todoArray.map((todo, index) => (
            <li key={index}>
              <TodoItem text={todo.text} isChecked={todo.isChecked} />
            </li>
          ))}

          <li>
            <input
              type="text"
              placeholder="할일을 입력하세요"
              className="w-full rounded-lg -caret--primary-blue500 focus:outline-none -bg--primary-blue100 -text--system-black"
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              value={inputValue}
              style={{
                backgroundImage: inputValue
                  ? `url(${square})`
                  : `url(${squareBeforeChecked})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '8px center',
                paddingLeft: '40px',
              }}
            />
          </li>
        </ul>
      </div>
      <button>
        <img src={triangleRight} alt="다음날짜" />
      </button>
    </section>
  );
}

export default TodoList;
