import ButtonBox from '@/components/ButtonBox';
import TitleTextBox from '@/components/TitleTextBox';
import { useState, useEffect } from 'react';
import {} from 'react';

function MeetingMinutesText() {
  const [text, setText] = useState('');

  useEffect(() => {
    const textareaElement = document.getElementById('dynamic-textarea');
    textareaElement.style.height = 'auto';
    textareaElement.style.height = `${textareaElement.scrollHeight + 2}px`;
  }, [text]);

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
        <div>
          <ButtonBox type="submit">저장하기</ButtonBox>
        </div>
      </form>
    </section>
  );
}

export default MeetingMinutesText;
