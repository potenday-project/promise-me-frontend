import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import TabBar from '@/components/tab-bar/TabBar';
import { useLocation } from 'react-router-dom';

function RootLayout() {
  const { pathname } = useLocation();

  // 탭바 존재하는 페이지에서 패딩 적용
  let isHiddenTabBarPadding = 'pb-20';
   // 헤더 존재하는 페이지에서 패딩 적용
  let isHiddenHeaderPadding = 'pt-12';

  // TabBar 없는 페이지
  if (
      pathname === '/' ||
      pathname === '/signin' ||
      pathname === '/signup' ||
      pathname === '/putcategory' ||
      pathname === '/putduration' ||
      pathname === '/putmembers' ||
      pathname === '/putprojectname' ||
      pathname === '/puttopic' ||
      pathname === '/meetingminutesdetail' ||
      pathname === '/meetingminutestext' ||
      pathname === '/meetingminutesvoice'
    ) {
      isHiddenTabBarPadding = '';
    }

  // Header 없는 페이지
  if (pathname === '/' || pathname === '/signin') {
    isHiddenHeaderPadding = '';
  }

  return (
    <>
      <Header />
      <main className={`${isHiddenHeaderPadding} ${isHiddenTabBarPadding} px-4`}>
        <Outlet />
      </main>
      <TabBar />
    </>
  );
}

export default RootLayout;
