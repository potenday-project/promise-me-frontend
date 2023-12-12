import React, { useState } from 'react';
import { mic, noteTaking, editDefault } from '@/assets/icons/svg-icons';

function FloatingButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const closeOverlay = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-[calc(16px+60px)] right-4">
      {isOpen && (
        <div
          onClick={closeOverlay}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60"
        >
          <div className="absolute bottom-[calc(16px+60px)] right-4 flex flex-col gap-2 items-end text-title3 -text--system-white ">
            <dl className="flex items-center gap-4 ">
              <dt>
                <p>회의 녹음하기</p>
              </dt>
              <dd>
                <button className="rounded-full">
                  <img
                    onClick={() => console.log('Button 1 clicked')}
                    src={mic}
                    alt=""
                    className=""
                  />
                </button>
              </dd>
            </dl>
            <dl className="flex items-center gap-4">
              <dt>
                <p>회의록 직접 쓰기</p>
              </dt>
              <dd>
                <button className="rounded-full">
                  <img
                    onClick={() => console.log('Button 2 clicked')}
                    src={noteTaking}
                    alt=""
                    className=""
                  />
                </button>
              </dd>
            </dl>
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
