import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { chevronRight, chevronBigRight } from '@/assets/icons/svg-icons';

function ButtonMeetingMinutes({
  title,
  datetime,
  summary,
  id,
  mypage = false,
}) {
  const idString = String(id);
  let formattedDate;
  if (!mypage && datetime) {
    formattedDate = new Intl.DateTimeFormat('ko-KR', {
      month: 'long',
      day: 'numeric',
    }).format(new Date(datetime));
  }

  return (
    <Link
      to={`/meetingminutesdetail/${id}`}
      onClick={() => window.scrollTo(0, 0)}
    >
      <div className="box-border border-[1px] rounded-lg -bg--primary-blue50 -border--grey300  p-4 flex flex-row justify-between">
        <div className="flex flex-col gap-1 ">
          <div className="flex flex-row">
            <p className="overflow-hidden center text-headline4 text-ellipsis line-clamp-1">
              <span>{title}</span>
            </p>
            {!mypage && <img src={chevronRight} alt="chevron-right" />}
          </div>
          <time className="text-title5 -text--grey700 ">
            {mypage ? datetime : formattedDate}
          </time>
          <p
            className={`pt-1 overflow-hidden break-words text-body4 text-ellipsis line-clamp-2 ${
              mypage ? '' : ` min-h-[46px]`
            }`}
          >
            {summary}
          </p>
        </div>
        {mypage && <img src={chevronBigRight} alt="chevron-big-right" />}
      </div>
    </Link>
  );
}

export default ButtonMeetingMinutes;

ButtonMeetingMinutes.propTypes = {
  title: PropTypes.string.isRequired,
  datetime: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // id의 타입을 string 또는 number로 설정
  mypage: PropTypes.bool,
};
