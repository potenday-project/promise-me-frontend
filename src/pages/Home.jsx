import { useState } from 'react';
// 스와이퍼
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import { chevronRight } from '@/assets/icons/svg-icons.js';
// 컴포넌트
import ProgressAll from '@/components/ProgressAll';
import MyCalendar from '@/components/my-calendar/MyCalendar';
import ButtonRound from '@/components/ButtonRound';
import TodoItem from '@/components/TodoItem';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '@/contexts/UserContext';
import axios from 'axios';

function Home() {
  const { userId, projectId, setProjectId } = useContext(UserContext);
  // 나중에 불러온 데이터로 바꿔주기
  let members = ['기획자', '디자이너', '프론트엔드 개발자', '백엔드 개발자'];
  const [isProjectData, setIsProjectData] = useState([]);
  const [isTodoArray, setIsTodoArray] = useState([]);
  const [isProgress, setIsProgress] = useState(null);
  const [isDday, setIsDday] = useState(null);
  const [isSelectedButton, setIsSelectedButton] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectDataRes, dDayRes, progressRes] = await Promise.all([
          axios.get('http://43.201.85.197/project/', {
            params: {
              userId: userId,
            },
          }),
          axios.get('http://43.201.85.197/project/dday', {
            params: {
              userId: userId,
            },
          }),
          axios.get('http://43.201.85.197/project/progress', {
            params: {
              userId: userId,
            },
          }),
        ]);

        setIsProjectData(projectDataRes.data);
        setIsDday(dDayRes.data);
        setIsProgress(progressRes.data);
        console.log(projectDataRes, dDayRes, progressRes);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchData();
  }, [projectId]);

  // 버튼 클릭 상태 관리

  // const [selectedDate, setSelectedDate] = useState(null);

  // const handleDateSelect = (date) => {
  //setSelectedDate(date);
  // api 요청을 통해 해당 날짜의 todoItem 을 가져져오거나, 상태를 업데이트하는 등의 작업
  //}
  return (
    <>
      <section className="py-10 bg-blue-50">
        <Swiper
          modules={[Navigation]}
          navigation={{
            clickable: true,
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
        >
          <SwiperSlide>
            <img src={chevronRight} className="swiper-button-next" />
            <ProgressAll />
          </SwiperSlide>
          <SwiperSlide>
            <MyCalendar />
          </SwiperSlide>
        </Swiper>
      </section>
      <section className="pb-2 pl-4 bg-white border-t -border--grey300">
        <Swiper
          slidesPerView="auto"
          freeMode={true}
          modules={[FreeMode]}
          className="w-full my-3"
          spaceBetween={4}
        >
          {members.map((member, index) => (
            <SwiperSlide style={{ width: 'auto' }} key={index}>
              <ButtonRound
                status={isSelectedButton === member ? 'selected' : 'default'}
                onClick={() => {
                  setIsSelectedButton(member);
                  console.log(isSelectedButton);
                }}
              >
                {member}
              </ButtonRound>
            </SwiperSlide>
          ))}
        </Swiper>
        <p className="pr-4 mb-4 text-headline4">
          AI가 추천해준 큰 일정...이것도 서버에서 받아와야함
        </p>
        <ul className="flex flex-col gap-6">
          {isTodoArray.map((person, index) => {
            if (isSelectedButton === person.role) {
              return (
                <li key={index} className="flex flex-col gap-2">
                  <p>{person.name}</p>
                  {person.todo.map((todo, todoIndex) => (
                    <TodoItem
                      key={todoIndex}
                      text={todo.text}
                      isChecked={todo.isChecked}
                    />
                  ))}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </section>
    </>
  );
}

export default Home;
