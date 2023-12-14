import debounce from '@/utils/debounce';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PlaceholderLine from './PlaceHolderLine';
import PlaceholderRound from './PlaceHolderRound';

function TestPlaceHolder() {
  const teamName = /^.{0,14}[가-힣a-zA-Z0-9]$/; // 한글 영문 숫자 1~15글자
  const koreaName = /^.{1,9}[가-힣]$/; // 한글 2~10글자
  const nickName = /^.{0,40}[a-z | A-Z]$/; // 영문 3~15글자
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 일반적인 이메일 형식
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/; // 6~16글자 영문+숫자

  const [formState, setFormState] = useState({
    name: '',
    teamname: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  // 유효성 검사 상태
  const [validationErrors, setValidationErrors] = useState({
    name: false,
    teamname: false,
    username: false,
    email: false,
    password: false,
    passwordConfirm: false,
  });

  // 유효성 검사 전체 통과 확인
  const isFormValid = () => {
    return Object.values(validationErrors).every((error) => error === false);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    let isValid;

    switch (name) {
      case 'teamname':
        isValid = teamName.test(value);
        break;
      case 'name':
        isValid = koreaName.test(value);
        break;
      case 'username':
        isValid = nickName.test(value);
        break;
      case 'email':
        isValid = emailRegex.test(value);
        break;
      case 'password':
        isValid = passwordRegex.test(value);
        break;
      case 'passwordConfirm':
        isValid = formState.password === value;
        break;
      case 'search':
        isValid = true;
        break;

      default:
        return;
    }

    setValidationErrors({
      ...validationErrors,
      [name]: !isValid,
    });

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleDebounceInput = debounce(handleInput, 500);

  return (
    <form className="flex flex-col items-start justify-start gap-2 p-40 pt-6 mt-4 border-t-2 border-gray-800">
      <PlaceholderLine
        name="teamname"
        label="팀이름"
        defaultValue={formState.teamname}
        placeholder="팀이름을 입력해 주세요"
        type="text"
        onChange={handleDebounceInput}
        isValid={!validationErrors.teamname && formState.teamname !== ''}
        errorMessage="1자 이상 15자 이하의 한글,영문,숫자 조합"
      />
      {/* <PlaceholderRound
        name="name"
        label="이름"
        defaultValue={formState.name}
        placeholder="이름을 입력해 주세요"
        type="text"
        onChange={handleDebounceInput}
        isValid={!validationErrors.name && formState.name !== ''}
        errorMessage="2자 이상 10자 이하의 한글"
      />
      <PlaceholderRound
        name="search"
        label="검색"
        defaultValue={formState.username}
        placeholder="검색어를 입력해 주세요"
        type="text"
        onChange={handleDebounceInput}
        isValid={!validationErrors.search}
        errorMessage="검색어를 입력해주세요"
      />
      <PlaceholderRound
        name="email"
        label="이메일"
        defaultValue={formState.email}
        placeholder="example@gmail.com"
        type="email"
        onChange={handleDebounceInput}
        isValid={!validationErrors.email && formState.email !== ''}
        errorMessage="올바른 이메일 형식이 아닙니다."
      /> */}
      {/* 
      <PlaceholderLine
        name="name"
        label="이름"
        defaultValue={formState.name}
        placeholder="이름을 입력해 주세요"
        type="text"
        onChange={handleDebounceInput}
        isValid={!validationErrors.name && formState.name !== ''}
        errorMessage="2자 이상 10자 이하의 한글"
      />

        <PlaceholderLine
        name="email"
        label="이메일"
        defaultValue={formState.email}
        placeholder="example@gmail.com"
        type="email"
        onChange={handleDebounceInput}
        isValid={!validationErrors.email && formState.email !== ''}
        errorMessage="올바른 이메일 형식이 아닙니다."
      /> */}

      {/* <PlaceholderLine
        name="password"
        label="비밀번호"
        defaultValue={formState.password}
        placeholder="비밀번호를 입력해주세요"
        type={'password'}
        onChange={handleDebounceInput}
        isValid={!validationErrors.password && formState.password !== ''}
        errorMessage="비밀번호는 영문, 숫자를 포함하여 6자~16자로 입력해주세요."
      />
      <PlaceholderLine
        name="passwordConfirm"
        label="비밀번호 확인"
        defaultValue={formState.passwordConfirm}
        placeholder="비밀번호를 확인해주세요"
        type={'password'}
        onChange={handleDebounceInput}
        isValid={
          !validationErrors.passwordConfirm && formState.passwordConfirm !== ''
        }
        errorMessage="비밀번호와 일치하지 않습니다. 다시 확인해주세요."
      /> */}
      <div className="w-full mt-4 text-center">
        {/* <button
          type="submit"
          disabled={!isFormValid()}
          className={`px-10 py-2 rounded-md w-full ${
            isFormValid()
              ? 'bg-primary cursor-pointer'
              : 'bg-gray-1 cursor-not-allowed'
          }`}
        >
          가입하기
        </button> */}
        <Link
          to="/home"
          className="block w-full px-10 py-2 mt-4 text-white rounded-md bg-pet-green"
        >
          취소
        </Link>
      </div>
    </form>
  );
}
export default TestPlaceHolder;
