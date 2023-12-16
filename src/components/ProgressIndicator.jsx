import PropTypes from 'prop-types';
import {
  stage0,
  stage1,
  stage2,
  stage3,
  stage4,
  stage5,
  stage6,
} from '@/assets/icons/svg-icons';

function ProgressIndicator({ percent }) {
  const setMessage = () => {
    switch (true) {
      case percent == 0:
        return '준비가 끝났나요?';
      case percent <= 19:
        return '시작이 반이에요!';
      case percent <= 39:
        return '잘하고 있어요!';
      case percent <= 59:
        return '조금만 더 힘내요!';
      case percent <= 79:
        return '이제 절반도 안 남았어요!';
      case percent <= 99:
        return '거의 다 왔어요!';
      case percent === 100:
        return '드디어 끝났군요 축하해요!';
      default:
        return 'Invalid percent';
    }
  };
  const setImage = () => {
    switch (true) {
      case percent == null:
      case percent == 0:
        return stage0;
      case percent <= 19:
        return stage1;
      case percent <= 39:
        return stage2;
      case percent <= 59:
        return stage3;
      case percent <= 79:
        return stage4;
      case percent <= 99:
        return stage5;
      case percent === 100:
        return stage6;
      default:
        return 'Invalid percent';
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 ">
      <img
        src={setImage()} //이미지 소스 삽입
        alt="진행도 이미지"
        className=" border-[1px] w-[240px] -bg--system-white rounded-lg h-[240px] b"
      />
      <div className="w-[248px] h-2 rounded-full -bg--grey300 relative">
        <div
          style={{ width: `${percent}%` }}
          className="h-2 rounded-full -bg--primary-blue500"
        ></div>
      </div>
      <p>{setMessage()}</p>
    </div>
  );
}

export default ProgressIndicator;

ProgressIndicator.propTypes = {
  percent: PropTypes.number,
};
