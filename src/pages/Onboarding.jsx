import ButtonBox from "@/components/ButtonBox";
import { Link } from "react-router-dom";

function Onboarding() {
  return (
    <>
      <div>아이콘</div>
      <ButtonBox navigateTo="/signin">로그인하기</ButtonBox>
      <div>카카오로 시작하기 버튼 생성</div>
      <div className="flex gap-1 text-body5 justify-center">
        <p className="-text--grey600">
          아직 회원이 아니신가요?
        </p>
        <Link 
          className="-text--grey800 cursor-pointer underline"
          to="/signup"
        >
          회원가입하기
        </Link>
      </div>
    </>
  );
}

export default Onboarding;