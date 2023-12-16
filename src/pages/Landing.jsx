import { useNavigate } from 'react-router-dom';
import { landing } from '@/assets/icons/svg-icons';
import ButtonBox from '@/components/ButtonBox';

function Landing() {
  return (
    <section className="relative">
      <div className="z-10 absolute text-[24px] font-black top-20 left-4">
        프로젝트 계획부터 관리까지, <br />
        AI가 함께합니다.
      </div>
      <img src={landing} className="w-screen h-screen scale-105"></img>
      <div className="fixed w-[calc(100vw-32px)]  bottom-0">
        <ButtonBox navigateTo="/putprojectname">
          AI 로 프로젝트를 관리를 시작해 보세요
        </ButtonBox>
      </div>
    </section>
  );
}

export default Landing;
