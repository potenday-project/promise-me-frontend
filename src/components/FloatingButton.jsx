import React, { useState } from 'react';

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
          <div className="absolute bottom-[calc(16px+60px)] right-4 flex flex-col gap-4 items-end  ">
            <dl className="flex items-center">
              <dt>
                <p>회의 녹음하기</p>
              </dt>
              <dd>
                <button
                  onClick={() => console.log('Button 1 clicked')}
                  className="text-black bg-white rounded-full w-14 h-14 "
                >
                  Button 1
                </button>
              </dd>
            </dl>
            <dl className="flex items-center">
              <dt>
                <p>회의록 직접 쓰기</p>
              </dt>
              <dd>
                <button
                  onClick={() => console.log('Button 2 clicked')}
                  className="text-black bg-white rounded-full w-14 h-14"
                >
                  Button 2
                </button>
              </dd>
            </dl>
          </div>
        </div>
      )}
      <button
        onClick={handleClick}
        className={`w-14 h-14 rounded-full focus:outline-none ${
          isOpen ? 'bg-white text-black' : 'bg-blue-500 text-white'
        }`}
      >
        {isOpen ? '' : 'Open'}
      </button>
    </div>
  );
}

export default FloatingButton;
