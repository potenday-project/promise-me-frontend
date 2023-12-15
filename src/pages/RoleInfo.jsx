import ButtonBox from "@/components/ButtonBox";
import TextBox from "@/components/TextBox";
import axios from 'axios';
import { useState, useEffect } from "react";

function RoleInfo() {
  const [memberInfo, setMemberInfo] = useState({});
  
  useEffect(() => {
    let exampleData =
      {
        "데이터 분석가": "마케팅 성과를 분석하고 보고서를 작성합니다.",
        "테크니컬 라이터": "기술적인 문서 작성을 담당합니다.",
        "디자이너": "마케팅 전략에 맞는 시각적인 디자인을 담당합니다.",
        "작가": "마케팅 컨텐츠 작성을 담당합니다.",
        "마케팅 전문가": "시장 조사 및 분석, 타겟 마케팅 전략 수립, 광고 캠페인 기획 등을 담당합니다.",
        "소셜 미디어 매니저": "소셜 미디어 채널을 관리하고, 광고 게시 및 고객과의 소통을 담당합니다.",
        "PM": "프로젝트 전반에 걸쳐 일정, 예산, 인력 등을 관리하며 팀원들 간의 의사소통을 중재합니다.",
        "개발자": "웹 또는 앱 개발을 담당하여 사용자 친화적인 인터페이스를 구축합니다.",
        "프로젝트 매니저 보조": "PM을 도와 일정 관리, 예산 관리, 인력 관리 등을 담당합니다.",
        "회계사": "예산 관리 및 회계 업무를 담당합니다."
      }
      setMemberInfo(exampleData);
  }, []);
  

  // useEffect(() => { // 컴포넌트가 렌더링될 때마다 실행
  //   axios.get('')
  //     .then(response => {
  //       setMemberInfo(response.data); // 데이터를 상태로 설정
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data: ', error);
  //     });
  // }, []);

  return (
    <>
      <p className="text-headline2 mt-6 mb-8">
        {} 프로젝트에는<br/>
        이런 역할이 필요해요
      </p>
      <section className="flex flex-col gap-3">
        {Object.keys(memberInfo).length > 0 
          ? Object.entries(memberInfo).map(([role, description], index) => (
              <TextBox  key={index} summary={role} content={description} />
            ))
          : 'AI가 열심히 작성중이에요'}
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