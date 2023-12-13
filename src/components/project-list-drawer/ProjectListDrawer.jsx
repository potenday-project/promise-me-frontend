import { useState, useEffect } from 'react';
import { x } from '@/assets/icons/svg-icons.js';
import ButtonBox from '../ButtonBox';
import styles from './../project-list-drawer/ProjectListDrawer.module.css';

function ProjectListDrawer({ isOpen, onClose }) {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    // 프로젝트 리스트를 불러오는 비동기함수
    const fetchProjectList = async () => {
      // 데이터를 가져오는 비동기 요청
      const response = await fetch(API_URL);
      const data = await response.json();
      setProjectList(data); // 데이터 설정
    };
    fetchProjectList();
  }, []);

  return (
    <>
      <div
        className={`${styles.black} ${isOpen ? 'block' : 'hidden'}`}
        onClick={onClose}
      />
      <div
        className={`${styles.drawer} ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <img className="w-full h-full" src={x} alt="닫기" />
        </button>
        <ul className='flex flex-col gap-4'>
          {projectList.map((title, index) => (
            <ButtonBox key={index}>{title}</ButtonBox>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ProjectListDrawer;
