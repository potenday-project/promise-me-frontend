import ButtonBox from "@/components/ButtonBox";
import ToSignUp from "@/components/ToSignUp";

function Onboarding() {
  return (
    <>
      <div>아이콘</div>
      <ButtonBox navigateTo="/signin">로그인하기</ButtonBox>
      <div>카카오로 시작하기 버튼 생성</div>
      <ToSignUp/>
    </>
  );
}

export default Onboarding;