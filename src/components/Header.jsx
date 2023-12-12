import { chevronLeft, menu } from '@/assets/icons/svg-icons.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ProjectListDrawer from './project-list-drawer/ProjectListDrawer';

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // 타이틀 상태 관리
  const [title, setTitle] = useState('');
  // 햄버거 버튼 상태 관리
  const [isDrawerOpened, setDrawerOpened] = useState(false);

  useEffect(() => {

    // 실행마다 title 값 초기화
    setTitle('');

    // 경로에 따라 타이틀 변경
    if (pathname === '/signup') {
      setTitle('회원가입');
    } else if (pathname === '/projectinfo') {
      setTitle('가이드북');
    } else if (pathname === '/todolist') {
      setTitle('나의 할 일');
    } else if (pathname === '/profile') {
      setTitle('내 정보');
    } else if (
      pathname === '/meetingminuteslist' ||
      pathname === '/meetingminutesdetail' ||
      pathname === '/meetingminutestext' ||
      pathname === '/meetingminutesvoice'
    ) {
      setTitle('회의록');
    } else if (
      pathname === '/putcategory' ||
      pathname === '/putduration' ||
      pathname === '/putmembers' ||
      pathname === '/putprojectname' ||
      pathname === '/puttopic'
    ) {
      setTitle('프로젝트 만들기');
    }
  }, [pathname]);  

  // 헤더 필요 없는 페이지
  if (pathname === '/' || pathname === '/signin') {
    return null;
  }

  // 프로젝트 리스트 열기, 닫기 함수
  const openProjectList = () => {
    setDrawerOpened(true);
  };

  const closeProjectList = () => {
    setDrawerOpened(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full m-auto z-[1000] -bg--system-white">
        <div className="flex justify-between items-center w-full">
          <button
            className="w-12 h-12"
            onClick={() => {
              if (pathname === '/home' || pathname === '/meetingminuteslist') {
                openProjectList();
              } else {
                navigate(-1);
              }
            }}
          >
            {pathname === '/home' || pathname === '/meetingminuteslist' ? (
              <img
                className="w-full h-full"
                src={menu}
                alt="프로젝트 리스트 열기"
              />
            ) : (
              <img className="w-full h-full" src={chevronLeft} alt="뒤로가기" />
            )}
          </button>
          <h1 className="text-headline3">{title}</h1>
          <div className="w-12 h-12"></div>
        </div>
      </header>
      <ProjectListDrawer isOpen={isDrawerOpened} onClose={closeProjectList} />
    </>
  );
}

export default Header;
