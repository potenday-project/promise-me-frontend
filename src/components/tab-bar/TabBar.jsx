import {
  homeBlue,
  homeGrey,
  meetingBlue,
  meetingGrey,
  todoBlue,
  todoGrey,
  profileBlue,
  profileGrey
} from '@/assets/icons/svg-icons.js';
import styles from './TabBar.module.css';
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function TabBar() {
  const { pathname } = useLocation();

  // 아이콘 상태관리
  const [homeIcon, setHomeIcon] = useState('');
  const [meetingIcon, setMeetingIcon] = useState('');
  const [todoIcon, setTodoIcon] = useState('');
  const [profileIcon, setProfileIcon] = useState('');

  // 텍스트 색깔 상태관리
  const [homeText, setHomeText] = useState('');
  const [meetingText, setMeetingText] = useState('');
  const [todoText, setTodoText] = useState('');
  const [profileText, setProfileText] = useState('');

  // 해당 페이지에 따라 아이콘, 텍스트 색깔 변경
  useEffect( () => {
      setHomeIcon(pathname === '/home' ? homeBlue : homeGrey);
      setHomeText(pathname === '/home' ? '--system-black' : '-text--grey600');
    }, [pathname]
  );

  useEffect( () => {
      setMeetingIcon(pathname === '/meetingminuteslist' ? meetingBlue : meetingGrey);
      setMeetingText(pathname === '/meetingminuteslist' ? '--system-black' : '-text--grey600');
    }, [pathname]
  );

  useEffect( () => {
      setTodoIcon(pathname === '/todolist' ? todoBlue : todoGrey);
      setTodoText(pathname === '/todolist' ? '--system-black' : '-text--grey600');
    }, [pathname]
  );

  useEffect( () => {
      setProfileIcon(pathname === '/profile' ? profileBlue : profileGrey);
      setProfileText(pathname === '/profile' ? '--system-black' : '-text--grey600');
    }, [pathname]
  );

  // 탭바 불필요한 페이지에서 제거하기
  if (pathname === '/landing'
    || pathname === '/signin'
    || pathname === '/signup'
    || pathname === '/projectinfo'
    || pathname === '/putprojectname'
    || pathname === '/putcategory'
    || pathname === '/puttopic'
    || pathname === '/putduration'
    || pathname === '/putmembers'
    || pathname === '/meetingminutesinput'
    || pathname === '/meetingminutestext'
    || pathname === '/meetingminutesvoice'
    ) {
      return null;
    }

  return (
    <nav className={styles.nav}>
      <div className={styles.items}>
        <Link to="/home" className={styles.item}>
          <img src={homeIcon} className={styles.icon} />
          <span className={`${styles.text} ${homeText}`}>홈</span>
        </Link>
        <Link to="/meetingminuteslist" className={styles.item}>
          <img src={meetingIcon} className={styles.icon} />
          <span className={`${styles.text} ${meetingText}`}>회의록</span>
        </Link>
        <Link to="/todolist" className={styles.item}>
          <img src={todoIcon} className={styles.icon} />
          <span className={`${styles.text} ${todoText}`}>할 일</span>
        </Link>
        <Link to="/profile" className={styles.item}>
          <img src={profileIcon} className={styles.icon} />
          <span className={`${styles.text} ${profileText}`}>프로필</span>
        </Link>
      </div>
    </nav>
  );
}

export default TabBar;