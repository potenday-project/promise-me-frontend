import PropTypes from 'prop-types';

function TitleTextBox({ title, sub }) {
  return (
    <>
      <p className="py-[15px] mt-6 text-headline2">{title}</p>
      <p className="text-body4">{sub}</p>
    </>
  );
}

export default TitleTextBox;

TitleTextBox.propTypes = {
  title: PropTypes.string.isRequired,
  sub: PropTypes.string,
};
