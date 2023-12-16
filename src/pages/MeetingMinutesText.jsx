import ButtonBox from '@/components/ButtonBox';
import TitleTextBox from '@/components/TitleTextBox';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCallback } from 'react';

function MeetingMinutesText() {
  const [text, setText] = useState('');
  const projectId = 1;
  const navigate = useNavigate();

  useEffect(() => {
    const textareaElement = document.getElementById('dynamic-textarea');
    textareaElement.style.height = 'auto';
    textareaElement.style.height = `${textareaElement.scrollHeight + 2}px`;
  }, [text]);

  const handleSubmit = useCallback(() => {
    axios
      .post('http://43.201.85.197/meeting/summary', {
        meetingContent: text,
        projectId: projectId,
      })
      .then((response) => {
        console.log('서버 응답:', response.data);
        navigate('/meetingminuteslist');
      })
      .catch((error) => {
        console.error('오류 발생:', error);
      });
  }, [text, projectId]);

  return (
    <section>
      <TitleTextBox title="회의록을 기록해주세요" />
      <form>
        <textarea
          id="dynamic-textarea"
          className="w-full min-h-[138px] p-4 text-body4 -bg--primary-blue50 content-start focus:outline-none border-[1px] rounded-lg"
          placeholder="이곳에 회의록을 기록해주면 AI가 요약을 해줍니다."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="fixed w-[calc(100vw-32px)] -bg--system-white bottom-0">
          <ButtonBox
            onClick={handleSubmit}
            disable={!text}
            navigateTo="/meetingminuteslist"
          >
            저장하기
          </ButtonBox>
        </div>
      </form>
    </section>
  );
}

export default MeetingMinutesText;
