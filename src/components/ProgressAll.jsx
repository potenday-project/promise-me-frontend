import ProgressIndicator from "./ProgressIndicator";
import ProgressBar from "./ProgressBar";
import { useState, useEffect } from "react";

function ProgressAll() {
  // 전달해 줄 데이터 상태 관리
  const [progressData, setProgressData] = useState(null);

  useEffect( () => {
    const fetchData = async () => {
      try {
        // 데이터를 가져오는 비동기 요청
        const response = await fetch(''); // api 넣기
        const project = await response.json();
        
        const { percent, dday } = project;

        const progressData = {
          percent: percent,
          dday: dday
        };

        setProgressData(progressData);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류가 발생하였습니다.', error)
      }
    };
    fetchData();
  }, []);
  
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <ProgressIndicator
          percent={progressData?.percent} />
        <ProgressBar
          percent={progressData?.percent}
          dday={progressData?.dday} />
      </div>
    </>
  )
}

export default ProgressAll;