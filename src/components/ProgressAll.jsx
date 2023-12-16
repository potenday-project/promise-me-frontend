import ProgressIndicator from './ProgressIndicator';
import ProgressBar from './ProgressBar';

function ProgressAll({ percent, dday }) {
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <ProgressIndicator percent={percent} />
        <ProgressBar percent={percent} dday={dday} />
      </div>
    </>
  );
}

export default ProgressAll;
