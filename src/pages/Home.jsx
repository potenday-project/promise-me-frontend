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
  let roles = [];
  const [isProjectData, setIsProjectData] = useState([]);
  const [data, setData] = useState({
    projectData: null,
    dday: null,
    progress: null,
    todoAll: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSelectedButton, setIsSelectedButton] = useState(null);

  useEffect(() => {
    axios
      .all([
        axios.get('http://43.201.85.197/project/', {
          params: { userId: userId },
        }),
        axios.get('http://43.201.85.197/project/dday', {
          params: { projectId: projectId },
        }),
        axios.get('http://43.201.85.197/project/progress', {
          params: { projectId: projectId },
        }),
        axios.get('http://43.201.85.197/calendar/todoAll', {
          params: { projectId: projectId, todoDate: '2023-12-22' },
        }),
      ])
      .then(
        axios.spread((projectRes, ddayRes, progressRes, todoAllRes) => {
          setData({
            projectData: projectRes.data,
            dday: ddayRes.data.Dday,
            progress: progressRes.data.progress,
            todoAll: todoAllRes.data,
          });
          setIsLoading(false);
        })
      )
      .catch((error) => {
        console.error('오류', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    // 데이터를 불러오는 동안 실행할 코드
  } else {
    roles = data.todoAll.reduce((unique, item) => {
      return unique.includes(item.role) ? unique : [...unique, item.role];
    }, []);

    console.log(roles);
    console.log(data.todoAll);
    console.log(
      data.todoAll.filter((allData) => allData.role === isSelectedButton)
    );
  }

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
            <ProgressAll percent={data.progress} dday={data.dday} />
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
          {!isLoading &&
            roles.map((role, index) => (
              <SwiperSlide style={{ width: 'auto' }} key={index}>
                <ButtonRound
                  status={isSelectedButton === role ? 'selected' : 'default'}
                  onClick={() => {
                    setIsSelectedButton(role);
                    console.log(isSelectedButton);
                  }}
                >
                  {role}
                </ButtonRound>
              </SwiperSlide>
            ))}
        </Swiper>
        <p className="pr-4 mb-4 text-headline4">
          AI가 추천해준 큰 일정...이것도 서버에서 받아와야함
        </p>
        <ul className="flex flex-col gap-6">
          {!isLoading &&
            data.todoAll
              .filter((allData) => allData.role === isSelectedButton)
              .reduce((unique, item) => {
                return unique.some(
                  (uniqueItem) =>
                    uniqueItem.recommendation === item.recommendation
                )
                  ? unique
                  : [...unique, item];
              }, [])
              .map((uniqueData, index) => {
                // 중복이 제거된 데이터를 출력합니다.
                // 출력 형식은 필요에 따라 수정해 주세요.
                return (
                  <div key={index}>
                    <h3>{uniqueData.recommendation}</h3>
                  </div>
                );
              })}

          {/*
           {!isLoading &&
            data.todoAll.map((allData, index) => {
              if (isSelectedButton === allData.role) {
                return (
                  <li key={index} className="flex flex-col gap-2">
                    <p>{allData.members}</p>
                    {allData.map((todo, todoIndex) => (
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
            })} */}
        </ul>
      </section>
    </>
  );
}

export default Home;
