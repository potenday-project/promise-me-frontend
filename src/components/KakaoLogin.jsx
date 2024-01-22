import { kakao } from '@/assets/icons/svg-icons.js';

function KakaoLogin() {
  const Rest_api_key='cf5d0607440feb573093943fcca8377f'
  const redirect_uri = 'http://localhost:5173'
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
  
  const handleLogin = () => {
      window.location.href = kakaoURL }

  return(
    <button
      onClick={handleLogin}
      className="flex justify-center items-center rounded-lg gap-2 w-full h-12 -bg--kakao mb-10"
    >
      <img src={kakao} alt="" className="w-5 h-5"/>
      <p className="text-title4 text-opacity-80">카카오로 시작하기</p>
    </button>
  )
}

// https://kauth.kakao.com/oauth/authorize?client_id=cf5d0607440feb573093943fcca8377f&redirect_uri=http://localhost:5173&response_type=code

export default KakaoLogin;