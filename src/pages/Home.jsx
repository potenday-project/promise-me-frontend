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

function Home() {

  // 나중에 불러온 데이터로 바꿔주기
  let members = ['기획자', '디자이너', '프론트엔드 개발자', '백엔드 개발자'];
  const [todoArray, setTodoArray] = useState([
    {
      name: '김희소',
      role: '프론트엔드 개발자',
      todo: [
        { text: '컬러칩 체크하기', isChecked: false },
        {
          text: '컬러칩 체크하기',
          isChecked: false,
        },
      ],
    },
    {
      name: '신동혁',
      role: '프론트엔드 개발자',
      todo: [
        { text: '컬러칩 체크하기', isChecked: false },
        {
          text: '컬러칩 체크하기',
          isChecked: false,
        },
        {
          text: '컬러칩 체크하기',
          isChecked: true,
        },
      ],
    },
    {
      name: '황초원',
      role: '기획자',
      todo: [
        { text: '두부 발톱 잘라주기', isChecked: false },
        {
          text: '두부 산책 시키기',
          isChecked: true,
        },
      ],
    },
  ]);

  useEffect( () => {
    const fetchData = async () => {
      try {
        // 데이터를 가져오는 비동기 요청
        const response = await fetch(''); // api 넣기
        const data = await response.json();

        setTodoArray(data.rodoArray);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류가 발생하였습니다.', error)
      }
    };
    fetchData();
  }, []);

  // 버튼 클릭 상태 관리
  const [selectedButton, setSelectedButton] = useState(null);
  // const [selectedDate, setSelectedDate] = useState(null);

  // const handleDateSelect = (date) => {
    //setSelectedDate(date);
    // api 요청을 통해 해당 날짜의 todoItem 을 가져져오거나, 상태를 업데이트하는 등의 작업
  //}
  return (
    <>
    <section className='bg-blue-50 py-10'>
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
          <MyCalendar/>
        </SwiperSlide>
      </Swiper>
    </section>
      <section className="border-t -border--grey300 bg-white pl-4 pb-2">
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
                status={selectedButton === member ? 'selected' : 'default'}
                onClick={() => {
                  setSelectedButton(member);
                  console.log(selectedButton);
                }}
              >
                {member}
              </ButtonRound>
            </SwiperSlide>
          ))}
        </Swiper>
        <p className="text-headline4 mb-4 pr-4">AI가 추천해준 큰 일정...이것도 서버에서 받아와야함</p>
        <ul className="flex flex-col gap-6">
          {todoArray.map((person, index) => {
            if (selectedButton === person.role) {
              return (
                <li key={index} className='flex flex-col gap-2'>
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