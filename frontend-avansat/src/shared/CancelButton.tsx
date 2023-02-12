import styled from "@emotion/styled";
import React from "react";

interface Props {
  text: string;
}

const Button = styled.button`
  background-color: white;
  height: 80px;
  width: 204px;
  border-radius: 50%;
  color: #ff5757;
  border: none;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: 700;
  font-size: 30px;
  cursor: pointer;
`;

export const CancelButton: React.FC<Props> = ({ text }) => {
  return <Button>{text}</Button>;
};
