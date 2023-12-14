import ButtonBox from '@/components/ButtonBox';
import TitleTextBox from '@/components/TitleTextBox';
function MeetingMinutesVoice() {
  return (
    <section className="flex flex-col items-center">
      <TitleTextBox title="녹음을 시작합니다."></TitleTextBox>
      <img
        src=""
        alt="녹음중입니다."
        className="-bg--grey100 w-[240px] h-[240px]"
      ></img>
      <p className="text-title4">
        녹음을 완료하시면 녹음한 내용을 AI가 요약해드려요
      </p>
      <ButtonBox>녹음완료</ButtonBox>
    </section>
  );
}

export default MeetingMinutesVoice;
