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
  const formattedDate = new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
  }).format(new Date(datetime));

  return (
    <Link
      to={`/meetingminutesdetail/${id}`}
      onClick={() => window.scrollTo(0, 0)}
    >
      <div className="box-border border-[1px] rounded-lg -bg--primary-blue50 -border--grey300  p-4 flex flex-row justify-between">
        <div className="flex flex-col gap-1 ">
          <p className="inline-flex items-center text-headline4">
            <span>{title}</span>
            {mypage ? '' : <img src={chevronRight} />}
          </p>

          <time className="text-title5 -text--grey700">{formattedDate}</time>
          <p className="pt-1 overflow-hidden break-words text-body4 text-ellipsis line-clamp-2">
            {summary}
          </p>
        </div>
        {mypage ? <img src={chevronBigRight} /> : ''}
      </div>
    </Link>
  );
}

export default ButtonMeetingMinutes;

ButtonMeetingMinutes.propTypes = {
  title: PropTypes.string.isRequired,
  datetime: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  mypage: PropTypes.bool,
};
