import ButtonBox from "@/components/ButtonBox";
import TextBox from "@/components/TextBox";
import axios from 'axios';
import { useState, useEffect } from "react";

function RoleInfo() {
  const [memberInfo, setMemberInfo] = useState('');

  useEffect(() => { // 컴포넌트가 렌더링될 때마다 실행
    axios.get('')
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
        {} 프로젝트에는<br/>
        이런 역할이 필요해요
      </p>
      <TextBox>
        {memberInfo ? memberInfo : 'AI가 열심히 작성중이에요'}
      </TextBox>
      <ButtonBox navigateTo="/putmembers">
        팀원 초대 하러 가기
      </ButtonBox>
    </>
  )
}

export default RoleInfo;