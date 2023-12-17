import ButtonMeetingMinutes from '@/components/ButtonMeetingMinutes';
import FloatingButton from '@/components/FloatingButton';
import TitleTextBox from '@/components/TitleTextBox';
import { UserContext } from '@/contexts/UserContext';
import axios from 'axios';
import { useContext } from 'react';
import { useEffect, useState } from 'react';

const host = window.location.hostname === "localhost" 
  ? 'http://{your server URL}'
  : "api";

export const apiClient = axios.create({
  baseURL: host,
});

function MeetingMinutesList() {
  const [meetingMinutes, setMeetingMinutes] = useState([]);
  const { userId, projectId, setProjectId } = useContext(UserContext);

  useEffect(() => {
    axios
      .get('http://43.201.85.197/meeting/', {
        params: {
          projectId: projectId,
        },
      })
      .then((response) => {
        setMeetingMinutes(response.data);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
      });
  }, []);

  return (
    <>
      <FloatingButton />
      <TitleTextBox
        title={`프로젝트 10일의 기적의 \n회의록은 총 ${meetingMinutes.length}개 입니다`}
      />
      <div className="grid grid-cols-2 gap-4 mt-6">
        {meetingMinutes.map((data, index) => (
          <ButtonMeetingMinutes
            key={index}
            title={data.meetingName}
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
