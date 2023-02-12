import React from "react";
import { ButtonsWrapper, LeftContainer, Wrapper } from "./styles";
import Image from "../../images/vector.svg";
import { DefaultButton } from "../../shared/DefaultButton";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const WelcomePage: React.FC = () => {
  return (
    <Wrapper>
      <LeftContainer>
        <Typography sx={{ fontSize: "100px" }}>GYMDER</Typography>
        <Typography sx={{ fontSize: "70px" }}>
          To find the gym <br />
          buddy you need
        </Typography>
        <ButtonsWrapper>
          <Link to="/login">
            <DefaultButton text={"Log in"} />
          </Link>
          <Link to="/register">
            <DefaultButton text={"Register"} />
          </Link>
        </ButtonsWrapper>
      </LeftContainer>
      <img src={Image} style={{ width: 500 }} alt="LoginImage" />
    </Wrapper>
  );
};

export default WelcomePage;
