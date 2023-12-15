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

  const colorClass =
    'px-4 py-1 text-body4 box-border rounded-3xl w-full border-[1px] -border--grey300 -text--system-black -bg--grey100';

  return (
    <>
      <section>
        <TitleTextBox title={user.name} />
        <p>{user.email}</p>
        <div className="flex justify-between w-full gap-[18px] mt-5 ">
          <button className={colorClass}>내 정보 수정하기</button>
          <button className={colorClass}>로그아웃하기</button>
        </div>
      </section>
      <section className="pt-9">
        <TitleTextBox title={`${user.name} 님의\n프로젝트 모아보기`} />
        <div className="flex flex-col gap-4 mt-8">
          {meetingMinutes.map((data, index) => (
            <ButtonMeetingMinutes
              key={index}
              title={data.meetingContent}
              datetime={data.meetingDate}
              summary={data.summary}
              mypage={true}
              id={data.meetingId}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Profile;
