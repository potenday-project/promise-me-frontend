import ButtonBox from "@/components/ButtonBox";
import ButtonRound from "@/components/ButtonRound";
import PlaceholderLine from "@/components/PlaceHolderLine";
import PlaceholderRound from "@/components/PlaceHolderRound";
import useProjectStore from "@/store/project";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function PutMembers() {

  const navigate = useNavigate();

  // 작업을 위한 예시 데이터, 나중에 지우기
  const exampleData = [
    '프로젝트 매니저',
    '백엔드 개발자',
    '프론트엔드 개발자',
    'UI/UX 디자이너'
  ];
  const [roles, setRoles] = useState(exampleData);
  const [email, setEmail] = useState('');
  const [counts, setCounts] = useState({});
  const [isValid, setIsValid] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);

  // useEffect(() => {
  //   axios.get('') // api
  //   .then(response => {
  //     const roles = response.data.flatMap(item =>
  //       item.member_list.map(member => member.role))
  //     setRoles(roles);
  //   })
  // })

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
    console.log(valid)
  };

  // 각 역할 버튼 클릭시, 서버 이메일 존재 여부 요청
  // 유효하다면 해당 역할에 이메일 추가, zustand 정보 저장
  //존재하지 않는 사용자인 경우 메세지 표시
  const handleButtonClick = (role) => {
    if(isValid) {
      axios
      .post('', { email })// 이메일 검증 api/users/check, {email} 도 바꿔야할 수도 있음
      .them(response => {
        const { data } = response;
        if(data.user_id) {
          setCounts({
            ...counts,
            [role]: counts[role] ? [...counts[role], email] : [email], // 직군별로 이메일 그룹화
          });
          // zustand 스토어에 저장
          useProjectStore.getState().setMembers(counts);
          setIsDisabled(false) // 확인 버튼 활성화
        } else {
          alert(data.message);
        }
        setEmail('') //이메일 초기화
      })
      .catch(error => {
        console.error('Error verifying email:',error) //오류처리
      })
    }
  };

  // 확인 버튼 누르면 zustand 의 정보를 꺼내 서버로 전달
  const handleConfirmClick = () => {
    const { name, category, start, deadline, members } = useProjectStore.getState();
    // http://localhost:8080/project/create
    axios.post('', {
      name,
      category,
      memberList: members,
      start,
      deadline,
    })
    .then(response => {
      if(response.state === 200 ) {
        alert('프로젝트 생성에 성공하였습니다.');
        navigate('/projectInfo');
      } else {
        alert('프로젝트 생성에 실패하였습니다.')
      }
    })
    .catch(error => {
      console.error('Error creating project:', error); // 오류 처리
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
      <ul className="flex flex-row flex-wrap gap-2 mt-4 mb-8">
        {roles && roles.map((role, index) => ( // roles 가 정의되었는지 확인, 추후 수정 가능
          <li key={index}>
            <ButtonRound
              status={counts[role] && counts[role].length > 0 ? 'clicked' : ''} // 이메일이 추가되었으면 파랑색으로 변경
              onClick={() => handleButtonClick(role)} // 클릭하면 카운트, 아래에 이메일 입력
            >
              {role}
            </ButtonRound>
          </li>
        ))}
      </ul>
      <div className="bg-blue-50 border -border--grey300 rounded-lg p-4 flex flex-col gap-6">
        {Object.entries(counts).map(([role, emails], index) => (
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
        ))}
      </div>
      <div className="fixed w-[calc(100vw-32px)] bottom-4">
        <ButtonBox
          disable={isDisabled}
          onClick={handleConfirmClick}
        >
          확인
        </ButtonBox>
      </div>
    </>
  )
}

export default PutMembers;