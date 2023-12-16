import { useState, useEffect } from 'react';
import { x } from '@/assets/icons/svg-icons.js';
import ButtonBox from '../ButtonBox';
import styles from './../project-list-drawer/ProjectListDrawer.module.css';
import axios from 'axios';

function ProjectListDrawer({ isOpen, onClose }) {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    const fetchProjectList = async () => {
      try {
        const response = await axios.get('http://43.201.85.197/project/', {
          params: {
            userId: 2
          }
        });
        const projectNames = response.data.map(project => project.name);
        setProjectList(projectNames);
        console.log(projectNames);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
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
            <ButtonBox key={index} mt={0} mb={0} navigateTo='/home'>
              {title}
            </ButtonBox>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ProjectListDrawer;
