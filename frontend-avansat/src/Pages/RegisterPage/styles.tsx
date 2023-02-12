import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(#ff5757, #f54ea2);
  height: 100vh;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #000090;
`;

export const InputBox = styled.div`
  background-color: #ffffffcc;
  width: 600px;
  height: 730px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 20px;
`;

export const Input = styled.input`
  background-color: white;
  border: none;
  width: 350px;
  border-radius: 50px;
  height: 50px;
  text-align: center;
  font-size: 25px;
  font-weight: 700;
  color: black;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 30px;
`;
