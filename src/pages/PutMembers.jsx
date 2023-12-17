import ButtonBox from "@/components/ButtonBox";
import ButtonRound from "@/components/ButtonRound";
import PlaceholderLine from "@/components/PlaceHolderLine";
import PlaceholderRound from "@/components/PlaceHolderRound";
import useProjectStore from "@/store/project";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const host = window.location.hostname === "localhost" 
  ? 'http://{your server URL}'
  : "api";

export const apiClient = axios.create({
  baseURL: host,
});

function PutMembers() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [counts, setCounts] = useState({});
  const [isValid, setIsValid] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const roles = useProjectStore(state => state.memberInfo);
  const setProjectSchedule = useProjectStore(state => state.setProjectSchedule);

  // 이메일 유효성 검사
  const isValidEmail = (email) => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  }

  // 이메일 입력 값을 상태로 관리, 유효성 검사
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    const valid = isValidEmail(event.target.value)
    setIsValid(valid);
  };

  // 각 역할 버튼 클릭시, 서버 이메일 존재 여부 요청
  // 유효하다면 해당 역할에 이메일 추가, zustand 정보 저장
  //존재하지 않는 사용자인 경우 메세지 표시
  const handleButtonClick = (role) => {
    if(isValid) {
      axios
      .post('http://43.201.85.197/users/check', { email : email })
      .then(response => {
        const { data } = response;
        if(data) {
          setCounts({
            ...counts,
            [role]: counts[role] ? [...counts[role], email] : [email],
            // 직군별로 이메일 그룹화
          });
          // zustand 스토어에 저장
          useProjectStore.getState().setMembers(counts);
          setIsDisabled(false) // 확인 버튼 활성화
        } else {
          alert(data.message);
        }
      })
      .catch(error => {
        alert('가입된 사용자가 아닙니다.')
        setIsValid(false);
        console.error('Error verifying email:',error) //오류처리
      })
    }
  };

  // 확인 버튼 누르면 zustand 의 정보를 꺼내 서버로 전달
  const handleConfirmClick = () => {
    const { teamName, category, start, deadline } = useProjectStore.getState();
  
    // 프로젝트 생성
    const projectCreatePromise = axios.post('http://43.201.85.197/project/create', {
      name: teamName,
      category: category,
      memberList: Object.entries(counts).flatMap(([role, emails]) =>
        emails.map(email => ({ email: String(email), role }))
      ),
      start: start,
      deadline: deadline,
    }).then(response => response.data.projectId);
  
    // 프로젝트 일정 추천
    const projectRecommendPromise = projectCreatePromise.then(projectId =>
      axios.post('http://43.201.85.197/project/recommend/schedule', {
        category: category,
        members: Object.keys(counts),
        start: start,
        deadline: deadline,
        projectId,
      }).then(response => {
        setProjectSchedule(response.data);
      })
    );
  
    Promise.all([projectCreatePromise, projectRecommendPromise])
      .then(([createResponse, recommendResponse]) => {
        if(createResponse.status === 200 && recommendResponse.status === 200) {
          alert('프로젝트 생성 및 스케줄 추천에 성공하였습니다.');
          navigate('/projectInfo');
        } else {
          alert('프로젝트 생성 또는 스케줄 추천에 실패하였습니다.')
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // 이메일 삭제
  const handleDeleteEmail = (role, email) => {
    setCounts((prevCounts) => {
      const emails = prevCounts[role];
      if (!emails) {
        return prevCounts; // prevCounts[role]이 undefined인 경우 prevCounts를 그대로 반환
      }
      const updatedEmails = emails.filter((e) => e !== email);
      return { ...prevCounts, [role]: updatedEmails };
    });
  };

  return(
    <>
      <p className="mt-6 text-headline2">
          팀원을 초대해주세요
      </p>
      <p className="my-4 text-body4 -text--grey700">
        이메일을 입력한 후 해당 팀원의 역할을 골라주세요
      </p>
      <PlaceholderRound
        placeholder="팀원의 이메일을 입력해주세요"
        value={email}
        onChange={handleEmailChange}
        isValid={isValid}
      >
      </PlaceholderRound>
      <ul className="flex flex-row flex-wrap gap-2 mt-4 mb-6">
        {
          roles
          ? (roles.length > 0
            ? roles.map((item, index) => (
              <li key={index}>
                <ButtonRound
                  status={counts[item.role] && counts[item.role].length > 0 ? 'clicked' : ''} // 이메일이 추가되었으면 파랑색으로 변경
                  onClick={() => handleButtonClick(item.role)} // 클릭하면 카운트, 아래에 이메일 입력
                >
                  {item.role}
                </ButtonRound>
              </li>
            ))
            : 'AI가 열심히 작성중이에요 ...')
          : '데이터를 불러오는 중입니다'
        }
        </ul>
      <div className="bg-blue-50 border -border--grey300 rounded-lg p-4 mb-20 flex flex-col gap-6">
        {Object.entries(counts).map(([role, emails], index) => (
          emails.length > 0 && (
          <div key={index}>
            <p className="text-title4">
              {role} {emails.length}명
            </p>
            {emails.map((email, index) => (
              <PlaceholderLine
                key={index}
                values={email}
                isValid={true}
                readonly={true}
                clickDelete={true}
                deletInput={() => handleDeleteEmail(role, email)}
              />
            ))}
          </div>
          )
        ))}
      </div>
      <div className="fixed w-[calc(100vw-32px)] bottom-0 bg-white">
        <ButtonBox
          disable={isDisabled}
          onClick={handleConfirmClick}
          navigateTo="/projectInfo"
        >
          확인
        </ButtonBox>
      </div>
    </>
  )
}

export default PutMembers;