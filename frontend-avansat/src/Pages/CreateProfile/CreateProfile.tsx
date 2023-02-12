import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Input } from "../RegisterPage/styles";
import { Card, InputWrapper, Wrapper } from "./styles";
import "./styles.tsx";
import "./styles.css";
import Textarea from "@mui/joy/Textarea";
import { DefaultButton } from "../../shared/DefaultButton";
import { getUser, updateUser } from "../../API/user";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useNavigate } from "react-router";

export interface ExerciseType {
  personalRecordId: number;
  exerciseName: string;
  record: 0;
}

export const CreateProfile = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [description, setDecription] = useState("");
  const [state, setState] = useState<ExerciseType[]>([
    { personalRecordId: 0, exerciseName: "", record: 0 },
    { personalRecordId: 1, exerciseName: "", record: 0 },
    { personalRecordId: 2, exerciseName: "", record: 0 },
    { personalRecordId: 3, exerciseName: "", record: 0 },
  ]);
  const [isNatural, setIsNatural] = useState<"yes" | "no">("no");
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "experience" || name === "age") {
      setUserData({ ...userData, [name]: parseInt(value) });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleChangeDecription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setDecription(value);
  };

  const handleInputChange = <T extends HTMLInputElement | HTMLTextAreaElement>(
    e: React.ChangeEvent<T>,
    id: number
  ) => {
    const { name, value, type } = e.target;
    const newEx: any = [...state];
    if (type === "text") {
      newEx[id][name] = value;
    } else if (type === "number") {
      newEx[id][name] = parseInt(value, 10);
    } else {
      newEx[id][name] = value;
    }
    setState(newEx);
  };

  const handleSubmit = async () => {
    userData.isNatural = isNatural === "yes";
    userData.personalRecords = state;
    userData.description = description;
    await updateUser(userData);
    navigate("/dashboard");
  };

  const handleChangeToggle = (event: any) => {
    setIsNatural(event.target.value);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUser();
        const { data } = response.data;
        if (data) {
          const { description, isNatural, personalRecords } = data;
          setUserData(data);
          setDecription(description || "");
          setIsNatural(isNatural === true ? "yes" : "no");
          if (personalRecords.length) {
            setState(personalRecords);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchUserData();
  }, [setUserData]);

  return (
    <Wrapper>
      <Card>
        <Box className="title">Create Profile</Box>
        <Box className="profileContainer">
          <Box className="row1">
            <InputWrapper>
              First Name{" "}
              <Input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
              />
            </InputWrapper>
            <InputWrapper>
              Last Name
              <Input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
              />
            </InputWrapper>
            <InputWrapper>
              Age
              <Input
                type="number"
                name="age"
                value={userData.age}
                onChange={handleChange}
              />
            </InputWrapper>
            <InputWrapper>
              Gym Location
              <Input
                type="text"
                name="gymArea"
                value={userData.gymArea}
                onChange={handleChange}
              />
            </InputWrapper>
            <InputWrapper>
              Natural
              <ToggleButtonGroup
                color="primary"
                value={isNatural}
                exclusive
                onChange={handleChangeToggle}
                aria-label="Platform"
              >
                <ToggleButton value={"yes"}>Yes</ToggleButton>
                <ToggleButton value={"no"}>No</ToggleButton>
              </ToggleButtonGroup>
            </InputWrapper>
            <InputWrapper>
              Experience
              <Input
                type="number"
                name="gymExperience"
                value={userData.gymExperience}
                onChange={handleChange}
              />
            </InputWrapper>
          </Box>
          <Box>
            <InputWrapper>
              Description
              <Textarea
                value={description}
                name="description"
                minRows={5}
                onChange={handleChangeDecription}
                sx={{ width: "500px", bgcolor: "white" }}
                placeholder="Tell us a bit about your gym experience..."
              />
            </InputWrapper>
            <Box sx={{ display: "flex", gap: "20px", flexDirection: "column" }}>
              <Box sx={{ textAlign: "center", fontSize: 40, padding: 5 }}>
                Personal Records
              </Box>
              {state?.map((item: ExerciseType, index: number) => (
                <Box
                  sx={{ display: "flex", gap: "25px", fontSize: 24 }}
                  key={item.personalRecordId}
                >
                  <Box>
                    Exercise
                    <Input
                      name="exerciseName"
                      value={item.exerciseName}
                      style={{ width: 250, marginLeft: 10 }}
                      onChange={(event) => handleInputChange(event, index)}
                    />
                  </Box>
                  <Box>
                    Record (in kg)
                    <Input
                      name="record"
                      value={item.record}
                      type="number"
                      style={{ width: 100, marginLeft: 10 }}
                      onChange={(event) => handleInputChange(event, index)}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box sx={{ p: 5, display: "flex", gap: 5, justifyContent: "center" }}>
          <DefaultButton onClickfunc={handleSubmit} text="Submit" />
          <DefaultButton
            text={"Cancel"}
            onClickfunc={() => {
              navigate("/dashboard");
            }}
          />
        </Box>
      </Card>
    </Wrapper>
  );
};
