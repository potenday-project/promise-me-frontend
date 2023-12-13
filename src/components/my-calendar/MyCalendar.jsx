import { useState } from "react";
import Calendar from 'react-calendar';
import '@/components/my-calendar/MyCalendar.css';

function MyCalendar () {
  // 선택한 날짜 상태관리, 초기값은 현재 날짜
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }

  // classes 배열을 생성하여 해당 날짜에 적용할 클래스를 저장
  // tileClassName : react-calendar 라이브러리가 제공하는 prop, 달력의 각 날짜 타일에 클래스를 동적으로 추가
  // 매개변수 date : 해당 날짜 / view : 현대 달력의 보기 모드
  const tileClassName = ({ date, view }) => {
    const classes = [];

    // 오늘 날짜에 'today' 클래스 추가
    if (view === 'month' && date.toDateString() === new Date().toDateString()) {
      classes.push('today');
    }

    // 선택한 날짜에 'selected' 클래스 추가
    if (view === 'month' && date.toDateString() === selectedDate.toDateString()) {
      classes.push('selected');
    }

    // 오늘 날짜와 선택한 날짜가 겹치는 경우에 'overlap' 클래스 추가
    if (view === 'month' && date.toDateString() === new Date().toDateString() && date.toDateString() === selectedDate.toDateString()) {
      classes.push('overlap');
    }

    return classes.join(' ');
  };

  // 선택한 날짜 불러오는 방법 : {selectedDate.toDateString()}
  
  return (
    <div className="flex justify-center mx-4">
      <Calendar
        locale="en"
        onChange={handleDateChange}
        showNeighboringMonth={false}
        tileClassName={tileClassName} // tileClassName prop 추가
      />
    </div>
  )
}

export default MyCalendar;
