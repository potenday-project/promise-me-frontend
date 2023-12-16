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
import { useEffect } from 'react';
import axios from 'axios';

function TodoList() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [todoArray, setTodoArray] = useState([]);
  const formattedDate = selectedDate.toISOString().split('T')[0];

  useEffect(() => {
    getTodos();
  }, [formattedDate]);

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

  const getTodos = () => {
    axios
      .get('http://43.201.85.197/todo/', {
        params: {
          projectId: 8,
          userId: 3,
          todoDate: formattedDate,
        },
      })
      .then((response) => {
        setTodoArray(response.data);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
      });
  };

  const handleTodoItemClick = (todoId) => {
    axios
      .post('http://43.201.85.197/todo/check', { todoId })
      .then((response) => {
        console.log('서버 응답:', response.data);
        getTodos(); // POST 요청이 성공한 후에 데이터 다시 불러오기
      })
      .catch((error) => {
        console.error(
          '보낼 ID',
          todoId,
          '투두 아이템 클릭을 서버에 보내는 중 오류가 발생했습니다:',
          error
        );
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      console.log(inputValue);
      axios
        .post('http://43.201.85.197/todo/', {
          content: inputValue,
          projectId: 8,
          userId: 3,
          todoDate: formattedDate,
        })
        .then((response) => {
          getTodos(); // POST 요청이 성공한 후에 데이터 다시 불러오기
        })
        .catch((error) => {
          console.error('데이터를 전송하는 중 오류가 발생했습니다:', error);
        });

      setInputValue(''); // 입력값 초기화
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
            {todoArray.map((todo) => (
              <li key={todo.todoId}>
                <TodoItem
                  text={todo.content}
                  ischecked={todo.completed}
                  onClick={() => handleTodoItemClick(todo.todoId)} // 클릭 이벤트 핸들러 추가
                />
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
        <button onClick={handlePrevDate} className="-order-1">
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
