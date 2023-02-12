import { Box } from "@mui/material";
import React, { useState } from "react";
import { changePassword } from "../../../API/auth";
import { DefaultButton } from "../../../shared/DefaultButton";
import { Input } from "../../RegisterPage/styles";

export const PasswordTab: React.FC = () => {
  const [oldPassword, setOldPassword] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState<string | null>(null);
  const [checkPassword, setCheckPassword] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleChangeOldPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOldPassword(event.target.value);
  };

  const handleChangeNewPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(event.target.value);
  };

  const handleChangeCheckPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckPassword(event.target.value);
  };

  const handleSubmit = async () => {
    if (newPassword !== checkPassword) {
      setError("Passwords don't match");
      return;
    }

    if (oldPassword && newPassword) {
      try {
        await changePassword(oldPassword, newPassword);
      } catch (e: any) {
        setError(e.code);
      }
    }
  };

  return (
    <Box className="passwordContainer">
      <Input
        placeholder="Old Password"
        type={"password"}
        value={oldPassword || ""}
        onChange={handleChangeOldPassword}
      />
      <Input
        placeholder="New Password"
        type={"password"}
        value={newPassword || ""}
        onChange={handleChangeNewPassword}
      />
      <Input
        placeholder="Re-enter New Password"
        type={"password"}
        value={checkPassword || ""}
        onChange={handleChangeCheckPassword}
      />
      {error}
      <Box
        sx={{ display: "flex", justifyContent: "center", paddingTop: "100px" }}
      >
        <DefaultButton
          text={"Save"}
          onClickfunc={handleSubmit}
          disabled={!oldPassword || !newPassword || !checkPassword}
        />
      </Box>
    </Box>
  );
};
