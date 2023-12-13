import ButtonMeetingMinutes from '@/components/ButtonMeetingMinutes';
import FloatingButton from '@/components/FloatingButton';
import TitleTextBox from '@/components/TitleTextBox';
import axios from 'axios';
import { useEffect, useState } from 'react';

function MeetingMinutesList() {
  const [meetingMinutes, setMeetingMinutes] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/meeting/', {
        params: {
          projectId: 1,
        },
      })
      .then((response) => {
        setMeetingMinutes(response.data);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
      });
  }, []);

  const arry = meetingMinutes;

  console.log({ meetingMinutes });

  return (
    <>
      <FloatingButton />
      <TitleTextBox
        title={`프로젝트 10일의 기적의 회의록은 총 ${meetingMinutes.length}개 입니다`}
        sub="서브타이틀 테스트 입니다"
      />
      <div className="grid grid-cols-2 gap-4 mt-6">
        {arry.map((data, index) => (
          <ButtonMeetingMinutes
            key={index}
            title={data.meetingContent}
            datetime={data.meetingDate}
            summary={data.summary}
            id={data.meetingId}
          />
        ))}
      </div>
    </>
  );
}

export default MeetingMinutesList;
