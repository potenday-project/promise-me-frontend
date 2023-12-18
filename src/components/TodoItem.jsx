import { square, squareChecked } from '@/assets/icons/svg-icons';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

function TodoItem({ text, ischecked, onClick, disableClick }) {
  const [isCheckedState, setIsChecked] = useState(ischecked);

  const onClickCheck = () => {
    if (!disableClick) {
      setIsChecked(!isCheckedState);
    }
  };
  return (
    <>
      <StyledInputWrapper onClick={onClick} className="flex w-full px-2">
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

TodoItem.propTypes = {
  text: PropTypes.string,
  ischecked: PropTypes.bool,
};
