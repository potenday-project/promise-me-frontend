import ButtonBox from "@/components/ButtonBox";
import ButtonRound from "@/components/ButtonRound";
import PlaceholderRound from "@/components/PlaceholderRound";

function PutMembers() {
  return(
    <>
      <p className="mt-6 text-headline2">
          팀원을 초대해주세요
      </p>
      <p className="my-4 text-body4 -text--grey700">
        이메일을 입력한 후 해당 팀원의 역할을 골라주세요
      </p>
      <PlaceholderRound
        placeholder="팀원의 이메일을 입력해주세요">

      </PlaceholderRound>
      <div className="flex flex-row flex-wrap gap-2 mt-4 mb-8">
        <ButtonRound>기획자</ButtonRound>
        <ButtonRound>개발자</ButtonRound>
        <ButtonRound>개발자</ButtonRound>
        <ButtonRound>개발자</ButtonRound>
      </div>
      <div className="fixed w-[calc(100vw-32px)] bottom-4">
        <ButtonBox
          navigateTo = '/projectInfo'
        >
          확인
        </ButtonBox>
      </div>
    </>
  )
}

export default PutMembers;