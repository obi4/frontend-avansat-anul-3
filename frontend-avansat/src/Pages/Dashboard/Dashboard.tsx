import React, { useState } from "react";
import { Menu } from "../../shared/Menu";
import { MainScreen } from "./MainScreen";
import { Matches } from "./Matches";
import Profile from "./Profile";
import { DasboardWrapper } from "./styles";

export const Dashboard: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<"main" | "matches" | "profile">(
    "main"
  );

  const renderTab = (currentTab: string) => {
    switch (currentTab) {
      case "main":
        return <MainScreen />;
      case "matches":
        return <Matches />;
      case "profile":
        return <Profile />;
    }
  };

  return (
    <DasboardWrapper>
      <Menu currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {renderTab(currentTab)}
    </DasboardWrapper>
  );
};
