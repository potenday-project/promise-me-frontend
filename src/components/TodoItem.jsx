import { useState } from 'react';
import styled, { css } from 'styled-components';
import { squareChecked, square } from '@/assets/icons/svg-icons';

function TodoItem({ text, isChecked }) {
  const [isCheckedState, setIsChecked] = useState(isChecked);

  const onClickCheck = () => {
    setIsChecked(!isCheckedState);
  };

  return (
    <>
      <StyledInputWrapper className="flex w-full">
        <StyledInput
          className="hidden"
          type="checkbox"
          id={text}
          name={text}
          isChecked={isCheckedState}
        />
        <StyledLabel
          className="flex bg-no-repeat cursor-pointer"
          htmlFor={text}
          onClick={onClickCheck}
          isChecked={isCheckedState}
        >
          <StyledP
            isChecked={isCheckedState}
            className={`ml-8 ${
              isCheckedState ? '-text--grey400' : '-text--system-black'
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
