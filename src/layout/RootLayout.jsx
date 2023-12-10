import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import TabBar from '@/components/tab-bar/TabBar';

function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <TabBar />
    </>
  );
}

export default RootLayout;
