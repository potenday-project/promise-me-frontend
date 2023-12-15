import ButtonBox from "@/components/ButtonBox";
import TextBox from "@/components/TextBox";
import useProjectStore from "@/store/project";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function ProjectInfo() {
  // 서버에서 받아온 데이터를 저장할 상태
  const teamname = useProjectStore(state => state.teamname);
  const [schedule, setSchedule] = useState('');

  useEffect(() => {
    axios.get('') // API
      .then(response => {
        // 데이터를 상태로 설정, 수정필요
        setSchedule(response.data.schedule);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return(
    <>
      <p className="mt-6 mb-7 text-headline2">
          {teamname}님을 위해<br/>
          AI가 프로젝트 일정을 짜왔어요
      </p>
      <TextBox>{schedule}</TextBox>
      <div className="fixed w-[calc(100vw-32px)] bottom-4">
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