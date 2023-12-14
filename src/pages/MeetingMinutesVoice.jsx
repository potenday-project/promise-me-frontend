import ButtonBox from '@/components/ButtonBox';
import TitleTextBox from '@/components/TitleTextBox';
function MeetingMinutesVoice() {
  return (
    <section className="relative flex flex-col justify-between h-full ">
      <TitleTextBox title="녹음을 시작합니다."></TitleTextBox>
      <div className="flex flex-col items-center gap-4 m-9">
        <img
          src=""
          alt="녹음중입니다."
          className="-bg--grey100 w-[240px] h-[240px]"
        ></img>
        <p className="text-center text-title4">
          녹음을 완료하시면 녹음한 내용을
          <br /> AI가 요약해드려요
        </p>
      </div>
      <div className="fixed w-[calc(100vw-32px)] bottom-4">
        <ButtonBox>녹음완료</ButtonBox>
      </div>
    </section>
  );
}

export default MeetingMinutesVoice;
