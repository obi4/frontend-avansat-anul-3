import React, { useContext } from "react";
import { ButtonsWrapper, LeftContainer, Wrapper } from "./styles";
import Image from "../../images/vector.svg";
import { DefaultButton } from "../../shared/DefaultButton";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Input, InputBox } from "../RegisterPage/styles";
import { CancelButton } from "../../shared/CancelButton";
import { loginUser } from "../../API/auth";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required("Please enter your email"),
  password: yup.string().min(5).max(32).required("Please enter your password"),
});

const LoginPage: React.FC = () => {
  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submitLogin: SubmitHandler<FieldValues> = async (data) => {
    const { email, password } = data;

    try {
      const response = await loginUser(email, password);
      setToken(response.data.data.accessToken);
      localStorage.setItem("userToken", response.data.data.accessToken);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <LeftContainer>
        <form onSubmit={handleSubmit(submitLogin)}>
          <InputBox>
            <Typography
              sx={{ fontSize: "30px", color: "black", fontWeight: "700" }}
            >
              LOG IN
            </Typography>
            <Input {...register("email")} placeholder="Email" />
            <>{errors?.email?.message}</>
            <Input
              {...register("password")}
              placeholder="Password"
              type={"password"}
            />
            <>{errors?.password?.message}</>
            <ButtonsWrapper>
              <div>
                <DefaultButton text={"Log in"} />
              </div>
              <Link to="/">
                <CancelButton text={"Cancel"} />
              </Link>
            </ButtonsWrapper>
          </InputBox>
        </form>
      </LeftContainer>
      <img src={Image} style={{ width: 500 }} alt="LoginImage" />
    </Wrapper>
  );
};

export default LoginPage;
