import ButtonBox from "@/components/ButtonBox";
import TextBox from "@/components/TextBox";
import useProjectStore from "@/store/project";

function RoleInfo() {
  const memberInfo = useProjectStore(state => state.memberInfo);
  const teamName = useProjectStore(state => state.teamName);

  return (
    <>
      <p className="text-headline2 mt-6 mb-8">
        {teamName} 프로젝트에는<br/>
        이런 역할이 필요해요
      </p>
      <section className="flex flex-col gap-3 mb-6">
      {
        memberInfo 
        ? (memberInfo.length > 0 
          ? memberInfo.map((item, index) => (
              <TextBox  key={index} summary={item.role} content={item.description} />
            ))
          : 'AI가 열심히 작성중이에요 ...')
        : '데이터를 불러오는 중입니다...'
      }
       </section>
      <div className="fixed w-[calc(100vw-32px)] bottom-0 bg-white">
        <ButtonBox navigateTo="/putmembers">
          팀원 초대 하러 가기
        </ButtonBox>
      </div>
    </>
  )
}

export default RoleInfo;