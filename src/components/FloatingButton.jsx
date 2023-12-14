import { useState } from 'react';
import { mic, noteTaking, editDefault } from '@/assets/icons/svg-icons';
import { Link } from 'react-router-dom';

function FloatingButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const closeOverlay = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-[calc(16px+60px)] z-[3000] right-4 h-12">
      {isOpen && (
        <div
          onClick={closeOverlay}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60"
        >
          <div className="absolute bottom-[calc(16px+60px)]  right-4 flex flex-col gap-2 items-end text-title3 -text--system-white ">
            <Link
              to="/meetingminutesvoice"
              onClick={() => window.scrollTo(0, 0)}
            >
              {' '}
              <dl className="flex items-center gap-4 ">
                <dt>
                  <p>회의 녹음하기</p>
                </dt>
                <dd>
                  <img src={mic} alt="" className="" />
                </dd>
              </dl>
            </Link>
            <Link
              to="/meetingminutestext"
              onClick={() => window.scrollTo(0, 0)}
            >
              <dl className="flex items-center gap-4">
                <dt>
                  <p>회의록 직접 쓰기</p>
                </dt>
                <dd>
                  <img src={noteTaking} alt="" className="" />
                </dd>
              </dl>
            </Link>
          </div>
        </div>
      )}
      <button
        onClick={handleClick}
        className={` rounded-full  ${isOpen ? 'hidden' : ''}`}
      >
        <img src={editDefault} alt="" />
      </button>
    </div>
  );
}

export default FloatingButton;
