import TodoItem from '@/components/TodoItem';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TodoList.module.css';

import {
  triangleLeft,
  triangleRight,
  square,
  squareBeforeChecked,
} from '@/assets/icons/svg-icons';

function TodoList() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handlePrevDate = () => {
    const prevDate = new Date(selectedDate); // 이전 날짜 계산
    prevDate.setDate(prevDate.getDate() - 1);
    setSelectedDate(prevDate); // 상태 업데이트
  };

  const handleNextDate = () => {
    const nextDate = new Date(selectedDate); // 다음 날짜 계산
    nextDate.setDate(nextDate.getDate() + 1);
    setSelectedDate(nextDate); // 상태 업데이트
  };

  const [todoArray, setTodoArray] = useState([
    {
      text: '컬러칩 1',
      isChecked: false,
    },
    {
      text: '컬러칩 22',
      isChecked: true,
    },
    {
      text: '333',
      isChecked: false,
    },
    {
      text: '444',
      isChecked: true,
    },
  ]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDatePickerClick = () => {
    setIsModalOpen(true);
  };

  const handleDatePickerClose = () => {
    setIsModalOpen(false);
  };

  const handleDatePickerDateChange = (date) => {
    console.log(selectedDate);
    setSelectedDate(date);
    setIsModalOpen(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setTodoArray((prevTodoArray) => [
        ...prevTodoArray,
        { text: inputValue, isChecked: false },
      ]);
      setInputValue('');
    }
  };

  return (
    <section className="flex flex-col h-[calc(100vh-108px)] justify-center">
      <div className="flex flex-row gap-4">
        <div className="w-full -bg--system-white rounded-3xl mx-auto h-auto p-4 flex flex-col border-[1px] -border--grey300">
          <button onClick={handleDatePickerClick}>
            {selectedDate.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long',
            })}
          </button>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="modal-content">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDatePickerDateChange}
                  onClickOutside={handleDatePickerClose}
                  inline
                />
              </div>
            </div>
          )}

          <ul className="flex flex-col gap-2 mt-12">
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
        <button className="-order-1" onClick={handlePrevDate}>
          <img src={triangleLeft} alt="이전날짜" />
        </button>
        <button onClick={handleNextDate}>
          <img src={triangleRight} alt="다음날짜" />
        </button>
      </div>
    </section>
  );
}

export default TodoList;
