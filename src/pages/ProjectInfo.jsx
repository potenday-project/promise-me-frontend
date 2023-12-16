import ButtonBox from "@/components/ButtonBox";
import TextBox from "@/components/TextBox";
import useProjectStore from "@/store/project";

function ProjectInfo() {
  const schedule = useProjectStore(state => state.projectSchedule);
  
  const groupedSchedule = schedule.length > 0 ? schedule[0].reduce((groups, item) => {
    const group = groups.find(group => group.role === item.role);
    if (group) {
      group.tasks.push(item);
    } else {
      groups.push({ role: item.role, tasks: [item] });
    }
    return groups;
  }, []) : [];
  
  return(
    <>
      <p className="mt-6 mb-7 text-headline2">
          새싹님을 위해<br/>
          AI가 프로젝트 일정을 짜왔어요
      </p>
      <div className="flex flex-col gap-3 mb-5">
      {groupedSchedule.map((group, index) =>
        <TextBox
          key={index}
          summary={group.role}
          content={
            group.tasks.map((item, index) => 
              <span key={index}>
                {item.task}<br/>({item.start} ~ {item.finish})<br/><br/>
              </span>
            ) 
          }
        >
        </TextBox>
        )}
      </div>
      <div className="fixed w-[calc(100vw-32px)] bottom-0 bg-white">
        <ButtonBox
          navigateTo = '/home'
        >
          내 프로젝트 관리하러 가기
        </ButtonBox>
      </div>
    </>
  )
}

export default ProjectInfo;