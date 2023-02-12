import styled from "@emotion/styled";
import React from "react";

interface Props {
  text: string;
  disabled?: boolean;
  onClickfunc?: () => void;
}

const Button = styled.button`
  background-color: #9090f0;
  height: 80px;
  width: 204px;
  border-radius: 50%;
  color: white;
  border: none;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: 700;
  font-size: 30px;
  cursor: pointer;
`;

export const DefaultButton: React.FC<Props> = ({
  text,
  disabled,
  onClickfunc,
}) => {
  return (
    <Button disabled={disabled} onClick={onClickfunc} type="submit">
      {text}
    </Button>
  );
};
