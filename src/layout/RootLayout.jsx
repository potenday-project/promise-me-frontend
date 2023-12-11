import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import TabBar from '@/components/tab-bar/TabBar';
import { useLocation } from 'react-router-dom';

function RootLayout() {
  const { pathname } = useLocation();

  let isHiddenPadding = null;

  if ( pathname === '/' || pathname === '/signin' || pathname === '/signup') {
    isHiddenPadding = null;
  }

  return (
    <>
      <Header />
      <main className={!isHiddenPadding ? 'pb-20' : isHiddenPadding}>
        <Outlet />
      </main>
      <TabBar />
    </>
  );
}

export default RootLayout;
