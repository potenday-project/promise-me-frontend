import ButtonBox from '@/components/ButtonBox';
import { useState } from 'react';

function SignIn() {
  const [userId, setUserId] = useState('');
  const [projectId, setProjectId] = useState('');

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleProjectIdChange = (e) => {
    setProjectId(e.target.value);
  };

  const handleSignIn = () => {
    const user = { id: userId }; // 실제 로그인 구현에서는 사용자 정보를 서버에서 받아옵니다.
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    localStorage.setItem('currentProjectId', projectId);
  };

  const handleCheckCurrentValue = () => {
    const storedUser = localStorage.getItem('loggedInUser');
    const storedProjectId = localStorage.getItem('currentProjectId');

    console.log(
      'Current stored user:',
      storedUser ? JSON.parse(storedUser) : null
    );
    console.log('Current stored project ID:', storedProjectId);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-40 mx-auto -bg--primary-blue50">
      <label className="text-lg w-80">
        User ID:
        <input
          className="w-full"
          type="number"
          value={userId}
          onChange={handleUserIdChange}
        />
      </label>
      <label className="text-lg w-80">
        Project ID:
        <input
          className="w-full"
          type="number"
          value={projectId}
          onChange={handleProjectIdChange}
        />
      </label>
      <ButtonBox onClick={handleCheckCurrentValue}>현재값 확인하기</ButtonBox>
      <ButtonBox onClick={handleSignIn}>새로 저장하기</ButtonBox>
    </div>
  );
}

export default SignIn;
