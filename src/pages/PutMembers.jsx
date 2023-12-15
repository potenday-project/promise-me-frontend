import ButtonBox from "@/components/ButtonBox";
import ButtonRound from "@/components/ButtonRound";
import PlaceholderLine from "@/components/PlaceHolderLine";
import PlaceholderRound from "@/components/PlaceholderRound";
import TextBox from "@/components/TextBox";
import axios from "axios";
import { useState, useEffect } from "react";

function PutMembers() {
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

  useEffect(() => {
    // 모든 직군 카운트 초기값 0
    const initialCounts = roles.reduce((obj, role) => ({
      ...obj,
      [role]: 0,
    }), {});
    setCounts(initialCounts);
  }, [roles]);

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

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    const valid = isValidEmail(event.target.value)
    setIsValid(valid);
    console.log(valid)
  };

  const handleButtonClick = (role) => {
    setCounts({
      ...counts,
      [role]: counts[role] + 1,
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
              status="" // 이메일이 입력 완료 되면 clicked 로 변경
              onClick={() => handleButtonClick(role)} // 클릭하면 카운트, 아래에 이메일 입력
            >
              {role}
            </ButtonRound>
          </li>
        ))}
      </ul>
      <div className="bg-blue-50 border -border--grey300 rounded-lg p-4">
        {roles && roles.map((role, index) => (
          <div key={index}>
          <p className="text-title4">{role} {counts[role]}명</p>
          </div>
        ))}
        <PlaceholderLine></PlaceholderLine>
      </div>
      <div className="fixed w-[calc(100vw-32px)] bottom-4">
        <ButtonBox
          navigateTo = '/projectInfo'
          // 이메일 형식 유효성 검사 통과 시 활성화되어 있지만, 나중에 팀원을 최소 1명 선택해야 활성화되게 수정하기
          disable={!isValid}
        >
          확인
        </ButtonBox>
      </div>
    </>
  )
}

export default PutMembers;