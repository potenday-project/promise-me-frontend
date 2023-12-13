import PropTypes from 'prop-types';

function TitleTextBox({ title, sub }) {
  return (
    <>
      <p
        style={{ whiteSpace: 'pre-line' }}
        className="h-[60] mt-6 text-headline2"
      >
        {title}
      </p>
      <p style={{ whiteSpace: 'pre-line' }} className="text-body4">
        {sub}
      </p>
    </>
  );
}

export default TitleTextBox;

TitleTextBox.propTypes = {
  title: PropTypes.string.isRequired,
  sub: PropTypes.string,
};
