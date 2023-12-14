import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ButtonBox({
  type = 'button',
  status = 'default',
  disable = false,
  onClick,
  navigateTo = '/',
  mt = '4',
  mb = '4',
  ...restProps
}) {
  let colorClass;
  if (disable) {
    colorClass = '-bg--grey200 -text--grey400';
  } else {
    switch (status) {
      case 'revers':
        colorClass = 'border-[1px] -border--primary-blue500 -text--primary-blue500';
        break;
      default:
        colorClass = '-bg--primary-blue500 -text--system-white';
    }
  }

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
      className={`p-2.5 text-title4 box-border rounded-lg w-full ${colorClass} mt-${mt} mb-${mb}`}
      disabled={disable}
      {...restProps}
      onClick={handleClick} // 수정 필요: handleClick 함수로 연결
    ></button>
  );
}

export default ButtonBox;

ButtonBox.propTypes = {
  type: PropTypes.string,
  status : PropTypes.text,
  disable: PropTypes.bool,
  onClick: PropTypes.func,
  navigateTo: PropTypes.string,
  mt: PropTypes.number,
  mb: PropTypes.number,
};