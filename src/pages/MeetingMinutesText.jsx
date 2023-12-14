import ButtonBox from '@/components/ButtonBox';
import TitleTextBox from '@/components/TitleTextBox';
import { useState, useEffect } from 'react';
import axios from 'axios';

function MeetingMinutesText() {
  const [text, setText] = useState('');
  const projectId = 1; // 프로젝트 식별 번호를 적절한 값으로 설정해주세요.

  useEffect(() => {
    const textareaElement = document.getElementById('dynamic-textarea');
    textareaElement.style.height = 'auto';
    textareaElement.style.height = `${textareaElement.scrollHeight + 2}px`;
  }, [text]);

  // 서버로 데이터를 보내는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8080/meeting/summary',
        {
          meeting_content: text,
          project_id: projectId,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <TitleTextBox title="회의록을 기록해주세요" />
      <form onSubmit={handleSubmit}>
        <textarea
          id="dynamic-textarea"
          className="w-full min-h-[138px] p-4 text-body4 -bg--primary-blue50 content-start focus:outline-none border-[1px] rounded-lg"
          placeholder="이곳에 회의록을 기록해주면 AI가 요약을 해줍니다."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="fixed w-[calc(100vw-32px)] bottom-4">
          <ButtonBox type="submit">저장하기</ButtonBox>
        </div>
      </form>
    </section>
  );
}

export default MeetingMinutesText;
