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
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(selectedDate);
  };

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
          params: { projectId: projectId, todoDate: selectedDate },
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
  }, [projectId]);

  if (isLoading || !data.todoAll) {
    // 데이터를 불러오는 동안 실행할 코드
  } else {
    roles = data.todoAll.map((item) => item.role);
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
            <MyCalendar onDateChange={handleDateChange} />
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
            roles &&
            roles.map((role, index) => (
              <SwiperSlide style={{ width: 'auto' }} key={index}>
                <ButtonRound
                  status={isSelectedButton === index ? 'selected' : 'default'}
                  onClick={() => {
                    setIsSelectedButton(index);
                    console.log(isSelectedButton);
                  }}
                >
                  {role}
                </ButtonRound>
              </SwiperSlide>
            ))}
        </Swiper>

        <ul className="flex flex-col gap-6">
          {!isLoading && data.todoAll && (
            <div>
              {data.todoAll
                .filter((allData, index) => index === isSelectedButton)
                .map((item, index) => (
                  <div key={index}>
                    <h3 className="mb-4 text-headline4">
                      {item.recommendation}
                    </h3>
                    {item.members &&
                      item.members.map((member, memberIndex) => (
                        <div key={memberIndex}>
                          <p className="text-title4">{member.name}</p>
                          {member.todoList && member.todoList.length > 0
                            ? member.todoList.map((todo, todoIndex) => (
                                <p className="text-body4" key={todoIndex}>
                                  {todo}
                                </p>
                              ))
                            : null}
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          )}
        </ul>
      </section>
    </>
  );
}

export default Home;
