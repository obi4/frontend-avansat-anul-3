import React, { useState, createContext } from "react";
import { ExerciseType } from "../Pages/CreateProfile/CreateProfile";

type UserContextProps = {
  children: React.ReactNode;
};

export interface User {
  firstName: string;
  lastName: string;
  age: number;
  gymArea: string;
  gymExperience: number;
  isNatural: boolean;
  experience: string;
  description: string;
  personalRecords: ExerciseType[];
}

type UserContextType = {
  email: string | null;
  setEmail: (value: string) => void;
  token: string | null;
  setToken: (value: string) => void;
  userData: User;
  setUserData: (value: User) => void;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserContextProvider = ({ children }: UserContextProps) => {
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<User>({
    firstName: "",
    lastName: "",
    age: 0,
    gymArea: "",
    gymExperience: 0,
    isNatural: false,
    experience: "",
    description: "",
    personalRecords: [],
  });

  return (
    <UserContext.Provider
      value={{
        email,
        setEmail,
        token,
        setToken,
        userData,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
