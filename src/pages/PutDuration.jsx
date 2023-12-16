import ButtonBox from "@/components/ButtonBox";
import ButtonRound from "@/components/ButtonRound";
import useProjectStore from "@/store/project";
import { useState } from "react";
// 데이트피커
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

function CustomInput({ value, onClick }) {
  return (
    <button 
      className="bg-transparent w-auto" 
      onClick={onClick}
    >
      {value || '날짜를 선택해주세요'}
    </button>
  );
}

function PutDuration() {
  // zustand 로 정보 전달
  const setStart = useProjectStore(state => state.setStart);
  const setDeadline = useProjectStore(state => state.setDeadline);
  // 시작일, 마감일 상태 관리
  const [startDate, setLocalStartDate] = useState(new Date());
  const [endDate, setLocalEndDate] = useState(null);
  // 달력 활성화 상태 관리
  const [startCalendarActive, setStartCalendarActive] = useState(false);
  const [endCalendarActive, setEndCalendarActive] = useState(false);
  // zustand 스토어에서 정보 가져오기
  const { category, start, deadline } = useProjectStore();

  const handleStartDateChange = (date) => {
    setLocalStartDate(date);
    setStart(date);
    console.log(date);
  };

  const handleEndDateChange = (date) => {
    setLocalEndDate(date);
    setDeadline(date);
    console.log(date);
  }


  const sendDataToServer = () => {
    axios.post('http://43.201.85.197/project/recommend/member', {
        category: category,
        start: start,
        deadline: deadline,
    })
    .then((response) => {
      console.log(response.data);
      useProjectStore.getState().setMemberInfo(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return(
    <>
      <p className="mt-6 mb-7 text-headline2">
          프로젝트 기간을 알려주세요
      </p>
      <section className="flex flex-col gap-4 mb-10">
        <label className="flex flex-row gap-2 items-center text-title4">시작일
        <ButtonRound status={startCalendarActive  ? 'clicked' : undefined}>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            customInput={<CustomInput />}
            onCalendarOpen={() => setStartCalendarActive(true)}
            onCalendarClose={() => setStartCalendarActive(false)}
          />
        </ButtonRound>
        </label>
        <label className="flex flex-row gap-2 items-center text-title4">완료일
          <ButtonRound status={endCalendarActive  ? 'clicked' : undefined}>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              customInput={<CustomInput />}
              onCalendarOpen={() => setEndCalendarActive(true)}
              onCalendarClose={() => setEndCalendarActive(false)}
            />
          </ButtonRound>
        </label>
      </section>
      <div className="fixed w-[calc(100vw-32px)] bottom-4">
        <ButtonBox
          navigateTo = '/roleinfo'
          disable={!startDate || !endDate }
          onClick={sendDataToServer}
        >
          확인
        </ButtonBox>
      </div>
    </>
  )
}

export default PutDuration;