import ButtonMeetingMinutes from '@/components/ButtonMeetingMinutes';
import ButtonRound from '@/components/ButtonRound';
import TitleTextBox from '@/components/TitleTextBox';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
const user = { name: '새싹전사', email: 'saessak@gmail.com' };
function Profile() {
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

  return (
    <>
      <section>
        <TitleTextBox title={user.name} />
        <p>{user.email}</p>
        <div>
          <ButtonRound>내 정보 수정하기</ButtonRound>
          <ButtonRound>로그아웃하기</ButtonRound>
        </div>
      </section>
      <section>
        <TitleTextBox title={`${user.name} 님의\n프로젝트 모아보기`} />
        <div className="grid grid-cols-2 gap-4 mt-6">
          {meetingMinutes.map((data, index) => (
            <ButtonMeetingMinutes
              key={index}
              title={data.meetingContent}
              datetime={data.meetingDate}
              summary={data.summary}
              id={data.meetingId}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Profile;
