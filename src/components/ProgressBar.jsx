import { barChart, clock } from '@/assets/icons/svg-icons.js';
import { useState, useEffect } from 'react';

function Progress ({ percent, dday }) {
  // prop 상태 관리, 기본값 null 로 설정
  const [loadingPercent, setLoadingPercent] = useState(null);
  const [loadingDday, setLoadingDday] = useState(null);

  useEffect( () => {
    setLoadingPercent(percent == null);
  }, [percent]);

  useEffect( () => {
    setLoadingDday(dday == null);
  }, [dday]);

  return (
    <div className='flex gap-2'>
      <div className='percent flex items-center gap-1'>
        <img src={barChart}/>
        <p className='text-headline4 mr-1'>진척도</p>
        <p className='text-headline4 -text--primary-blue700'>
          {loadingPercent ? '계산 중...' : `${percent}%`}
        </p>
      </div>
      <span className='dday aria-hidden'>|</span>
      <div className='flex items-center gap-1'>
        <img src={clock}/>
        <p className='text-headline4 mr-1'>남은 기간</p>
        <p className='text-headline4 -text--primary-blue700'>
          {loadingDday ? '계산 중...' : <time dateTime=''>{dday}일</time>}
        </p>
      </div>
    </div>
  )
}

export default Progress;