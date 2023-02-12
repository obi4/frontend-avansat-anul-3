import { Box, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MenuArray, MenuItemType } from "../../shared/Constants";
import { ImagesTab } from "./ProfileTabs/ImagesTab";
import { PasswordTab } from "./ProfileTabs/PasswordTab";
import { InputsWrapper, ProfileWrapper, Wrapper } from "./styles";

const Profile: React.FC = () => {
  const [editTab, setEditTab] = useState("photos");
  const navigate = useNavigate();

  const renderEditTabs = (editTab: MenuItemType | string) => {
    switch (editTab) {
      case "profile":
        return null;
      case "photos":
        return <ImagesTab />;
      case "password":
        return <PasswordTab />;
    }
  };

  useEffect(() => {
    if (editTab === "profile") {
      navigate("/createProfile");
    }
    if (editTab === "logout") {
      localStorage.clear();
      navigate("/register");
    }
  }, [editTab]);

  return (
    <Wrapper>
      <ProfileWrapper>
        <Box sx={{ display: "flex", height: "100%" }}>
          <Box className="profileMenu">
            {MenuArray.map(({ text, item }) => (
              <MenuItem
                key={item}
                sx={{
                  fontSize: "40px",
                  fontWeight: editTab === item ? "bold" : "",
                }}
                onClick={() => setEditTab(item)}
              >
                {text}
              </MenuItem>
            ))}
          </Box>
          <InputsWrapper>{renderEditTabs(editTab)}</InputsWrapper>
        </Box>
      </ProfileWrapper>
    </Wrapper>
  );
};

export default Profile;
