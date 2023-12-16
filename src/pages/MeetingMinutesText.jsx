import ButtonBox from '@/components/ButtonBox';
import TitleTextBox from '@/components/TitleTextBox';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MeetingMinutesText() {
  const [text, setText] = useState('');
  const projectId = 1;
  const navigate = useNavigate();

  useEffect(() => {
    const textareaElement = document.getElementById('dynamic-textarea');
    textareaElement.style.height = 'auto';
    textareaElement.style.height = `${textareaElement.scrollHeight + 2}px`;
  }, [text]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('meeting_content', text);
    formData.append('project_id', projectId);

    try {
      const response = await axios.post(
        'http://43.201.85.197/meeting/summary',
        formData
      );

      console.log(response.data);
      navigate('/meetingminuteslist');
    } catch (error) {
      console.error(error);
    }
  };

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
        <div className="fixed w-[calc(100vw-32px)] bottom-4">
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
