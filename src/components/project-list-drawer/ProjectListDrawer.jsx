import { x } from '@/assets/icons/svg-icons.js';
import { useContext } from 'react';
import { UserContext } from '@/contexts/UserContext';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ButtonBox from '../ButtonBox';
import styles from './../project-list-drawer/ProjectListDrawer.module.css';
import { plus } from '@/assets/icons/svg-icons.js';

function ProjectListDrawer({ isOpen, onClose }) {
  const { userId, projectId, setProjectId } = useContext(UserContext);

  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    axios
      .get('http://43.201.85.197/project/', {
        params: {
          userId: userId,
        },
      })
      .then((response) => {
        setProjectList(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
      });
  }, [isOpen]);

  return (
    <>
      <div
        className={`${styles.black} ${isOpen ? 'block' : 'hidden'}`}
        onClick={onClose}
      />
      <div
        className={`${styles.drawer} ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <img className="w-full h-full" src={x} alt="닫기" />
        </button>
        <ul className="flex flex-col gap-4">
          {projectList.map((item, index) => {
            return (
              <li key={index}>
                <ButtonBox
                  status={
                    item.projectId == Number(projectId) ? 'default' : 'revers'
                  }
                  mt={0}
                  mb={0}
                  navigateTo="/home"
                  onClick={() => {
                    setProjectId(item.projectId + 1);
                    console.log('설정된 프로젝트 아이디', projectId);
                    onClose();
                  }}
                >
                  {item.name}
                </ButtonBox>
              </li>
            );
          })}

          <li>
            <ButtonBox
              status="revers"
              mt={0}
              mb={0}
              navigateTo="/putprojectname"
              onClick={() => {
                onClose();
              }}
            >
              <img src={plus} className="h-6" alt="프로젝트 생성" />
            </ButtonBox>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ProjectListDrawer;
