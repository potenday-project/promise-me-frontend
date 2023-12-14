import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ButtonBox({
  type = 'button',
  revers = false,
  disable = false,
  onClick,
  navigateTo = '/',
  ...restProps
}) {
  const colorClass = disable
    ? '-bg--grey200 -text--grey400'
    : revers
      ? 'border-[1px] -border--primary-blue500 -text--primary-blue500'
      : '-bg--primary-blue500 -text--system-white';

  const navigate = useNavigate();
  const handleNavigate = () => {
    if (type === 'button') {
      if (navigateTo === '-1') {
        navigate(-1);
      } else {
        navigate(navigateTo);
      }
    }
  };

  const handleClick = () => {
    if (typeof onClick === 'function') {
      onClick(); // 수정 필요: onClick 함수 호출
    }
  };

  return (
    <button
      type={type}
      className={`p-2.5 text-title4 box-border rounded-lg w-full ${colorClass}`}
      disabled={disable}
      {...restProps}
      onClick={handleClick} // 수정 필요: handleClick 함수로 연결
    ></button>
  );
}

export default ButtonBox;

ButtonBox.propTypes = {
  type: PropTypes.string,
  revers: PropTypes.bool,
  disable: PropTypes.bool,
  onClick: PropTypes.func,
  navigateTo: PropTypes.string,
};
