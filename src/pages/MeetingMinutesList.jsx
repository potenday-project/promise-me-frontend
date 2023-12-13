import ButtonMeetingMinutes from '@/components/ButtonMeetingMinutes';
import FloatingButton from '@/components/FloatingButton';
import TitleTextBox from '@/components/TitleTextBox';

function MeetingMinutesList() {
  const dummyData = [
    {
      title: '새로운 회의록1',
      datetime: new Date(2023, 11, 25),
      summary: 'qkljaksj asoqrkj a askldj selcs ekcje ahjskwkje',
    },
    {
      title: '새로운 회의록2',
      datetime: new Date(2023, 10, 25),
      summary: 'qkljaksj asoqrkj a askldj selcs ekcje ahjskwkje',
    },
    {
      title: '새로운 회의록3',
      datetime: new Date(2023, 11, 27),
      summary: 'qkljaksj asoqrkj a askldj selcs ekcje ahjskwkje',
    },
    {
      title: '새로운 회의록4',
      datetime: new Date(2023, 11, 28),
      summary: 'qkljaksj asoqrkj a askldj selcs ekcje ahjskwkje',
    },
  ];

  return (
    <>
      <FloatingButton />
      <TitleTextBox
        title={`프로젝트 10일의 기적의 \n회의록은 총 ${dummyData.length}개 입니다`}
      />
      <div className="grid grid-cols-2 gap-4 mt-6">
        {dummyData.map((data, index) => (
          <ButtonMeetingMinutes
            key={index}
            title={data.title}
            datetime={data.datetime}
            summary={data.summary}
            id={index}
          />
        ))}
      </div>
    </>
  );
}
export default MeetingMinutesList;
