import { useState } from 'react';
import styled, { css } from 'styled-components';
import { squareChecked, square } from '@/assets/icons/svg-icons';

function TodoItem({ text }) {
  const [isChecked, setIsChecked] = useState(false);

  const onClickCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <StyledInputWrapper className="flex w-full">
        <StyledInput
          className="hidden"
          type="checkbox"
          id={text}
          name={text}
          isChecked={isChecked}
        />
        <StyledLabel
          className="flex bg-no-repeat cursor-pointer"
          htmlFor={text}
          onClick={onClickCheck}
          isChecked={isChecked}
        >
          <StyledP
            isChecked={isChecked}
            className={`ml-8 ${
              isChecked ? '-text--grey400' : '-text--system-black'
            }    `}
          >
            {text}
          </StyledP>
        </StyledLabel>
      </StyledInputWrapper>
    </>
  );
}

export default TodoItem;

const StyledInputWrapper = styled.div``;

const StyledInput = styled.input`
  ${({ isChecked }) =>
    isChecked
      ? css`
          &:after: {
            opacity: 1;
          }
        `
      : null}
`;

const StyledLabel = styled.label`
  background-image: url(${(props) =>
    props.isChecked ? squareChecked : square});
`;

const StyledP = styled.p``;
