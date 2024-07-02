import PlaceholderLine from '../components/PlaceHolderLine';
import ButtonBox from '../components/ButtonBox';
import { useState } from 'react';

function SignUp1() {
  const [ input, setInput ] = useState('');
  // email 중복 체크 용도로 사용
  const [ isExistingMember, setIsExistingMember ] = useState(false);
  // email 형식 체크 용도으로 사용
  const [ isValid, setIsValid ] = useState(true);


  // 이메일 형식 검사
  const validation = () => {

  }

  // 이메일 형식 검사는 입력할때마다 실행시키고, 중복 검사는 확인버튼 클릭하면 하는걸로 ?

  const handleChange = (event) => {
    setInput(event.target.value);
  }
  const handleClick = () => {
    // zustand 사용하여 회원 이메일 정보 저장
  }

  return(
    <>
      <p className="mt-6 mb-7 text-headline2">이메일을 입력해주세요</p>
      <section className='flex flex-col gap-1'>
        <PlaceholderLine
          name="email"
          label="회원 이메일"
          type="email"
          placeholder="example@gmail.com"
          onChange={handleChange}
          isValid={isValid}
        />
        {isExistingMember !== false && (
          <div className='flex gap-1 -text--system-danger'>
            <p>이미 회원이신가요?</p>
            <a href="" className='underline'>로그인하기</a>
          </div>
        )}
      </section>
      <div className="fixed w-[calc(100vw-32px)] bottom-4">
        <ButtonBox
          type='button'
          navigateTo='/signup2'
          onClick={handleClick}
          value={input}
        >
          확인
        </ButtonBox>
      </div>
      
    </>
  )
}

export default SignUp1;