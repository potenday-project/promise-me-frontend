import { useState, useEffect } from "react";
import ButtonBox from "@/components/ButtonBox";
import PlaceholderLine from "@/components/PlaceHolderLine";
import useProjectStore from "@/store/project";

function PutProjectName() {
  // 사용자 입력을 추적하는 로컬 상태
  const [input, setInput] = useState('');
  const [isValid, setIsValid] = useState(true);

  const setTeamName = useProjectStore(state => state.setTeamName);
  const teamName = useProjectStore((state) => state.teamName)

  // 사용자의 입력을 로컬 상태에 저장하는 핸들러 함수
  const handleChange = (event) => {
    setInput(event.target.value);
    validateInput(event.target.value);
  }

  //정규식 유효성 검사
  const validateInput = (value) => {
    const regex = /^[가-힣a-zA-Z0-9!@#$%^&*()\-=+{}\[\]|;:'",.<>/?~]{1,10}$/;
    setIsValid(regex.test(value));
  }

  const handleClick = () => {
    setTeamName(input);
    // zustand 상태 확인
    console.log(teamName);
  }

  useEffect(() => {
    console.log(teamName);
  }, [teamName]);

  return (
    <>
      <p className="mt-6 mb-7 text-headline2">
        프로젝트 관리를 시작할게요 <br/>
        팀 이름을 알려주세요
      </p>
      <PlaceholderLine
        name="teamname"
        label="팀 이름"
        placeholder="팀 이름을 입력해주세요"
        type="text"
        value={input}
        onChange={handleChange}
        isValid={isValid}
        errorMessage={isValid ? "" : "팀 이름은 1자 이상 10자 이하여야 합니다."}
      />
      <div className="fixed w-[calc(100vw-32px)] bottom-4">
        <ButtonBox
          type="button"
          navigateTo="/putcategory"
          disable={!isValid || !input}
          onClick={handleClick}
          >
            확인
        </ButtonBox>
      </div>
    </>
  )
}

export default PutProjectName;
