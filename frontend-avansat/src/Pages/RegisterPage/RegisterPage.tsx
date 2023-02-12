import { Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Buttons, Input, InputBox, LeftContainer, Wrapper } from "./styles";
import Image from "../../images/vector.svg";
import { DefaultButton } from "../../shared/DefaultButton";
import { CancelButton } from "../../shared/CancelButton";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../API/auth";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required("Please enter your email"),
  password: yup.string().min(5).max(32).required("Please enter your password"),
  firstName: yup.string().required("Please enter first name"),
  lastName: yup.string().required("Please enter last name"),
});

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submitUser: SubmitHandler<FieldValues> = async (formData) => {
    const { email, firstName, lastName, password } = formData;

    try {
      const response = await registerUser(email, firstName, lastName, password);
      const { accessToken } = response.data.data;
      localStorage.setItem("userToken", accessToken);
      navigate("/dashboard");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Wrapper>
      <LeftContainer>
        <form onSubmit={handleSubmit(submitUser)}>
          <InputBox>
            <Typography
              sx={{ fontSize: "30px", color: "black", fontWeight: "700" }}
            >
              SIGN UP
            </Typography>
            <Input placeholder="First Name" {...register("firstName")} />
            <>{errors?.firstName?.message}</>
            <Input placeholder="Last Name" {...register("lastName")} />
            <>{errors?.lastName?.message}</>
            <Input placeholder="Email" {...register("email")} />
            <>{errors?.email?.message}</>
            <Input
              placeholder="Password"
              type={"password"}
              {...register("password")}
            />
            <>{errors?.password?.message}</>
            <Buttons>
              <DefaultButton text={"Sign up"} />
              <Link to="/">
                <CancelButton text={"Cancel"} />
              </Link>
            </Buttons>
          </InputBox>
        </form>
      </LeftContainer>
      <img src={Image} style={{ width: 500 }} alt="LoginImage" />
    </Wrapper>
  );
};
