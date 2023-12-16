import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import TabBar from '@/components/tab-bar/TabBar';
import { useLocation } from 'react-router-dom';

function RootLayout() {
  const { pathname } = useLocation();

  // 탭바 존재하는 페이지에서 패딩 적용
  let isHiddenTabBarPadding = 'pb-[60px]';
  // 헤더 존재하는 페이지에서 패딩 적용
  let isHiddenHeaderPadding = 'pt-12';
  // 배경색 존재하는 페이지 배경색 적용
  let isBackgrounColor = '';
  // 패딩 존재하는 페이지 패딩 적용
  let isPadding = 'px-4';

  // TabBar 없는 페이지
  if (
    pathname === '/' ||
    pathname === '/landing' ||
    pathname === '/signin' ||
    pathname === '/signup' ||
    pathname === '/putcategory' ||
    pathname === '/putduration' ||
    pathname === '/putmembers' ||
    pathname === '/putprojectname' ||
    pathname === '/puttopic' ||
    pathname.startsWith('/meetingminutesdetail/') ||
    pathname === '/meetingminutestext' ||
    pathname === '/meetingminutesvoice'
  ) {
    isHiddenTabBarPadding = '';
  }

  // Header 없는 페이지
  if (pathname === '/' || pathname === '/signin') {
    isHiddenHeaderPadding = '';
  }

  // backgoundColor 있는 페이지
  if (pathname === '/todolist') {
    isBackgrounColor = '-bg--primary-blue50';
  }

  if (pathname === '/home') {
    isPadding = '';
  }

  return (
    <>
      <Header />
      <main
        className={`${isHiddenHeaderPadding} ${isHiddenTabBarPadding} ${isBackgrounColor} ${isPadding} min-h-screen`}
      >
        <Outlet />
      </main>
      <TabBar />
    </>
  );
}

export default RootLayout;
