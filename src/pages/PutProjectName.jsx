import ButtonBox from "@/components/ButtonBox";
import PlaceholderLine from "@/components/PlaceHolderLine";

function PutProjectName() {
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
      />
      <ButtonBox
        type="button"
        navigateTo="/putcategory">
          확인
      </ButtonBox>
      
    </>
  )
}

export default PutProjectName;