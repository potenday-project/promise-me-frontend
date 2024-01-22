import ButtonBox from "@/components/ButtonBox";
import ToSignUp from "@/components/ToSignUp";
import KakaoLogin from "@/components/KakaoLogin";

function Onboarding() {

  return (
    <>
      <div>아이콘</div>
      <ButtonBox navigateTo="/signin">로그인하기</ButtonBox>
      <KakaoLogin/>
      <ToSignUp/>
    </>
  );
}

export default Onboarding;