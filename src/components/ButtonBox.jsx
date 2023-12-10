import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ButtonBox({
  type = 'button',
  revers = false,
  disable = false,
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

  return (
    <button
      type={type}
      className={`p-2.5 text-title4 box-border rounded-lg w-full ${colorClass}`}
      disabled={disable}
      {...restProps}
      onClick={handleNavigate}
    ></button>
  );
}

export default ButtonBox;

ButtonBox.propTypes = {
  type: PropTypes.string,
  revers: PropTypes.bool,
  disable: PropTypes.bool,
  navigateTo: PropTypes.string,
};
