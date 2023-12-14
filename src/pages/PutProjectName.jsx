import ButtonBox from "@/components/ButtonBox";
import PlaceholderLine from "@/components/PlaceHolderLine";
import { useState } from "react";
import useProjectStore from "@/store/project";
import { useEffect } from "react";

function PutProjectName() {
  // 사용자 입력을 추적하는 로컬 상태
  const [input, setInput] = useState('');

  const setTeamName = useProjectStore(state => state.setTeamName);
  const teamName = useProjectStore((state) => state.teamName)

  // 사용자의 입력을 로컬 상태에 저장하는 핸들러 함수
  const handleChange = (event) => {
    setInput(event.target.value);
    console.log(event.target.value);
  }

  const handleClick = () => {
    setTeamName(input);
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
      />
      <ButtonBox
        type="button"
        navigateTo="/putcategory"
        disable={!input}
        onClick={handleClick}
        >
          확인
      </ButtonBox>
    </>
  )
}

export default PutProjectName;