import ButtonBox from "@/components/ButtonBox";
import TextBox from "@/components/TextBox";
import useProjectStore from "@/store/project";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function ProjectInfo() {
  // 서버에서 받아온 데이터를 저장할 상태
  const teamname = useProjectStore(state => state.teamname);
  const [schedule, setSchedule] = useState([
    [
      {
          "role": "기획자",
          "task": "사용자 요구사항 정의서 작성",
          "start": "2023-12-08",
          "finish": "2023-12-10"
      },
      {
          "role": "기획자",
          "task": "기능 명세서 작성",
          "start": "2023-12-11",
          "finish": "2023-12-15"
      },
      {
          "role": "기획자",
          "task": "화면 설계서 작성",
          "start": "2023-12-16",
          "finish": "2023-12-20"
      },
      {
          "role": "프론트엔드 개발자",
          "task": "HTML/CSS 레이아웃 구성",
          "start": "2023-12-21",
          "finish": "2023-12-25"
      },
      {
          "role": "프론트엔드 개발자",
          "task": "JavaScript 기능 구현",
          "start": "2023-12-26",
          "finish": "2023-12-30"
      },
      {
          "role": "프론트엔드 개발자",
          "task": "반응형 웹 적용",
          "start": "2023-12-31",
          "finish": "2023-12-31"
      },
      {
          "role": "백엔드 개발자",
          "task": "DB 스키마 작성",
          "start": "2023-12-08",
          "finish": "2023-12-10"
      },
      {
          "role": "백엔드 개발자",
          "task": "API 기능 구현",
          "start": "2023-12-11",
          "finish": "2023-12-20"
      },
      {
          "role": "백엔드 개발자",
          "task": "서버 구축 및 배포",
          "start": "2023-12-21",
          "finish": "2023-12-25"
      },
      {
          "role": "디자이너",
          "task": "로고 디자인",
          "start": "2023-12-08",
          "finish": "2023-12-10"
      },
      {
          "role": "디자이너",
          "task": "UI/UX 디자인",
          "start": "2023-12-11",
          "finish": "2023-12-20"
      }
  ]
  ]);

  // useEffect(() => {
  //   axios.get('http://43.201.85.197/recommend/schedule') // API
  //     .then(response => {
  //       // 데이터를 상태로 설정, 수정필요
  //       setSchedule(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data: ', error);
  //     });
  // }, []);


const groupedSchedule = schedule[0].reduce((groups, item) => {
  const group = groups.find(group => group.role === item.role);
  if (group) {
    group.tasks.push(item);
  } else {
    groups.push({ role: item.role, tasks: [item] });
  }
  return groups;
}, []);


  return(
    <>
      <p className="mt-6 mb-7 text-headline2">
          {teamname}님을 위해<br/>
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