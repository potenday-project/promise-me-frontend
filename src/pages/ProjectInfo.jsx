import ButtonBox from "@/components/ButtonBox";
import TextBox from "@/components/TextBox";
import useProjectStore from "@/store/project";
import axios from 'axios';
import { useState, useEffect } from "react";

function ProjectInfo() {
  const [memberInfo, setMemberInfo] = useState('');
  const teamname = useProjectStore(state => state.teamname);

  useEffect(() => { // 컴포넌트가 렌더링될 때마다 실행
    axios.get('') // http://locallhost:8080/project/recommend/schedule
      .then(response => {
        setMemberInfo(response.data); // 데이터를 상태로 설정
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <>
      <p className="text-headline2 mt-6 mb-8">
        {teamname} 님을 위해<br/>
        AI가 프로젝트 일정을 짜왔어요
      </p>
      <TextBox>
        {memberInfo
          ? memberInfo.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))
          : 'AI가 열심히 작성중이에요'}
      </TextBox>
      <div className="fixed w-[calc(100vw-32px)] bottom-4">
        <ButtonBox navigateTo="/putmembers">
          팀원 초대 하러 가기
        </ButtonBox>
      </div>
    </>
  )
}

export default ProjectInfo;