import TodoItem from '@/components/TodoItem';
import { triangleLeft, triangleRight } from '@/assets/icons/svg-icons';

function TodoList() {
  return (
    <section className="flex flex-row items-center w-full h-screen -bg--primary-blue50">
      <button>
        <img src={triangleLeft} alt="" />
      </button>
      <div className="w-[248px] -bg--system-white rounded-3xl mx-auto h-auto p-4 flex flex-col border-[1px] -border--grey300">
        <button className="mb-6">날짜 버튼</button>
        <ul className="flex flex-col gap-2">
          <li>
            <TodoItem text={`컬러칩체크하기`}></TodoItem>
          </li>
          <li>
            <TodoItem text={`컬러칩체크하기`}></TodoItem>
          </li>
          <li>
            <TodoItem text={`컬러칩체크하기`}></TodoItem>
          </li>
          <li>
            <input type="text" />
          </li>
        </ul>
      </div>
      <button>
        <img src={triangleRight} alt="" />
      </button>
    </section>
  );
}

export default TodoList;
