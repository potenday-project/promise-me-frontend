import ButtonMeetingMinutes from '@/components/ButtonMeetingMinutes';
import TextBox from '@/components/TextBox';
import TitleTextBox from '@/components/TitleTextBox';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MeetingMinutesDetail() {
  const { meetingId } = useParams(); // URL에서 ID 추출
  const [detailData, setDetailData] = useState({}); // 상세 데이터를 저장할 state
  const [meetingMinutes, setMeetingMinutes] = useState([]);

  useEffect(() => {
    console.log('버튼 아이디', meetingId);
    axios
      .get('http://localhost:8080/meeting/', {
        params: {
          projectId: 1,
        },
      })
      .then((response) => {
        setMeetingMinutes(response.data);
        console.log('입력 데이터', meetingMinutes);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
      });
  }, [meetingId]); // ID가 변경될 때마다 데이터를 다시 가져옴

  return (
    <section className="flex flex-col gap-6">
      {meetingMinutes.map((data, index) =>
        data.meetingId == meetingId ? (
          <>
            <TitleTextBox
              key={index}
              title={data.meetingDate || '날짜나 이름'}
              sub={`홍길동님을 위해 AI가 회의를 요약했어요`}
            />
            <TextBox summary={'회의 요약'} content={data.summary}></TextBox>
            <TextBox
              summary={'회의 내용'}
              content={data.meetingContent}
            ></TextBox>
          </>
        ) : (
          <></>
        )
      )}
    </section>
  );
}

export default MeetingMinutesDetail;
