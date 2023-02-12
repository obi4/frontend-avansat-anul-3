import { MenuItem, Typography } from "@mui/material";
import Image from "../images/vector.svg";
import homeIcon from "../images/homeIcon.svg";
import profileIcon from "../images/ProfileIcon.svg";
import matchesIcon from "../images/MatchesIcon.svg";
import { Box } from "@mui/joy";

interface Props {
  currentTab: "main" | "matches" | "profile";
  setCurrentTab: (value: "main" | "matches" | "profile") => void;
}

export const Menu: React.FC<Props> = ({ currentTab, setCurrentTab }) => {
  return (
    <Box sx={{ position: "fixed", backgroundColor: "white", height: "100vh" }}>
      <img
        src={Image}
        style={{ width: 310, paddingRight: 100 }}
        alt="LoginImage"
      />
      <div>
        <Typography
          sx={{
            fontSize: "50px",
            textAlign: "center",
            paddingTop: 6,
            paddingBottom: 5,
          }}
        >
          GYMDER
        </Typography>
        <MenuItem
          onClick={() => setCurrentTab("main")}
          sx={{ display: "flex", justifyContent: "space-between", padding: 3 }}
        >
          <img src={homeIcon} style={{ width: 50 }} alt="LoginImage" />
          <Typography
            sx={{
              fontSize: "40px",
              fontWeight: currentTab === "main" ? "bold" : "",
            }}
          >
            Dashboard
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => setCurrentTab("matches")}
          sx={{ display: "flex", justifyContent: "space-between", padding: 3 }}
        >
          <img src={matchesIcon} style={{ width: 50 }} alt="LoginImage" />
          <Typography
            sx={{
              fontSize: "40px",
              fontWeight: currentTab === "matches" ? "bold" : "",
            }}
          >
            My Matches
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => setCurrentTab("profile")}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: 3,
          }}
        >
          <img src={profileIcon} style={{ width: 50 }} alt="LoginImage" />
          <Typography
            sx={{
              fontSize: "40px",
              fontWeight: currentTab === "profile" ? "bold" : "",
            }}
          >
            Profile
          </Typography>
        </MenuItem>
      </div>
    </Box>
  );
};
