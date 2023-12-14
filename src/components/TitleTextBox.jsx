import PropTypes from 'prop-types';

function TitleTextBox({ title, sub }) {
  return (
    <div>
      <p
        style={{ whiteSpace: 'pre-line' }}
        className="h-[60px] mt-6 text-headline2  flex items-center "
      >
        {title}
      </p>
      <p
        style={{ whiteSpace: 'pre-line' }}
        className="text-body4 -text--grey700"
      >
        {sub}
      </p>
    </div>
  );
}

export default TitleTextBox;

TitleTextBox.propTypes = {
  title: PropTypes.string.isRequired,
  sub: PropTypes.string,
};
