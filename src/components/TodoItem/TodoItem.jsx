import { useState } from 'react';
import styled, { css } from 'styled-components';
import {
  squareBeforeChecked,
  squareChecked,
  square,
} from '@/assets/icons/svg-icons';

function TodoItem({ text }) {
  const [isChecked, setIsChecked] = useState(false);

  const onClickCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <StyledInputWrapper>
        <StyledInput
          type="checkbox"
          id={text}
          name={text}
          isChecked={isChecked}
        />
        <StyledLabel
          htmlFor={text}
          onClick={onClickCheck}
          isChecked={isChecked}
        >
          <StyledP isChecked={isChecked}>{text}</StyledP>
        </StyledLabel>
      </StyledInputWrapper>
    </>
  );
}

export default TodoItem;

const StyledInputWrapper = styled.div`
  // padding-left: 8px;
  // padding-right: 8px;
  width: full;
  display: flex;
`;

const StyledInput = styled.input`
  visibility: hidden;
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
  cursor: pointer;
  display: flex;
  cursor: pointer;
  ${({ isChecked }) =>
    isChecked
      ? css`
          background-image: url(${squareChecked});
          background-repeat: no-repeat;
        `
      : css`
          background-image: url(${square});
          background-repeat: no-repeat;
        `}
`;

const StyledP = styled.p`
  margin-left: 32px;
  ${({ isChecked }) =>
    isChecked
      ? css`
          color: gray;
        `
      : css`
          color: black;
        `}
`;
