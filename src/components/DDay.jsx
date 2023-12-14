import { clock } from '@/assets/icons/svg-icons.js';
import { useState, useEffect } from 'react';

function DDay () {
  // 남은 날짜 상태 관리
  const [remainingDays, setRemainingDays] = useState(null);

  useEffect( () => {
    const fetchData = async () => {
      try {
        // 데이터를 가져오는 비동기 요청
        const response = await fetch(''); // api 넣기
        const project = await response.json();

        const deadline = project.deadline;
        const today = new Date();

        // 밀리초로 남은날짜 계산 후 설정
        const TimeDiff = deadline.getTime() - today.getTime();
        const DaysDiff = Math.ceil(TimeDiff / (1000 * 3600 * 24));
        setRemainingDays(DaysDiff); // 데이터 설정
      } catch (error) {
        console.error('데이터를 불러오는 중 오류가 발생하였습니다.', error)
      }
    };
    fetchData();
  }, []);

  return (
    <div className='flex items-center gap-1'>
      <img src={clock}/>
      <p className='text-headline4 mr-1'>남은 기간</p>
      <p className='text-headline4 -text--primary-blue700'>
        {remainingDays !== null ? <time dateTime ="">${remainingDays}일</time> : '계산 중...'}
      </p>
    </div>
  )
}

export default DDay;