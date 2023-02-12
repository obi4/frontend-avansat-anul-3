import TinderCard from "react-tinder-card";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import "./Style.css";
import { getConnections, swipe } from "../../API/userConnection";
import ImagesStepper from "./ImagesStepper";
import { Box, Modal, Typography } from "@mui/material";
import { DefaultButton } from "../../shared/DefaultButton";
import { SwipeButton } from "../../shared/SwipeButton";
import heart from "../../images/heart.svg";
import xIcon from "../../images/x.svg";

type ConnectionType = {
  userId: number;
  firstName: string;
  lastName: string;
  age: number;
  description: string;
  gymArea: string;
  photos: string[];
};

export const MainScreen = () => {
  const [connections, setConnections] = useState<ConnectionType[] | null>(null);
  const [isMatch, setIsMatch] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState("");
  const currentIndexRef = useRef(currentIndex);

  const canSwipe = currentIndex >= 0;

  const childRefs: any = useMemo(
    () =>
      Array(connections?.length)
        .fill(0)
        .map(() => createRef()),
    [connections]
  );

  const handleClose = (): void => {
    setIsMatch(false);
  };

  const updateCurrentIndex = (val: number): void => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const swipeAction = async (dir: string) => {
    if (canSwipe && connections?.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  const swiped = async (
    direction: string,
    swipedUserId: number,
    index: number
  ) => {
    try {
      updateCurrentIndex(index - 1);
      const result = await swipe(swipedUserId, direction === "right");
      console.log(result);
      setIsMatch(result.data.data.isMatch);
      console.log(isMatch);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const result = await getConnections();
        setConnections(result.data.data.data);
        setCurrentIndex(result.data.data.data.length - 1);
      } catch (e) {
        console.error(e);
      }
    };
    fetchConnections();
  }, []);

  return (
    <div className="mainWrapper">
      <div>
        {connections?.map(
          (
            { userId, firstName, lastName, photos, age, description, gymArea },
            index
          ) => (
            <TinderCard
              className="swipe"
              ref={childRefs[index]}
              key={`${userId}-${index}`}
              onSwipe={(dir) => {
                setCurrentUser(`${firstName} ${lastName}`);
                swiped(dir, userId, index);
              }}
            >
              <div className="card">
                <Typography className="cardText">
                  {firstName} {lastName}, {age}
                </Typography>
                <ImagesStepper images={photos} />
                <Box sx={{ p: 2 }}>
                  <Typography sx={{ fontSize: "22px", color: "grey" }}>
                    Location:
                  </Typography>
                  <Typography sx={{ fontSize: "22px" }}>{gymArea}</Typography>
                  <Typography sx={{ fontSize: "22px", color: "grey" }}>
                    Description:
                  </Typography>
                  <Typography sx={{ fontSize: "22px" }}>
                    {description}
                  </Typography>
                </Box>
              </div>
            </TinderCard>
          )
        )}
        <Modal
          open={isMatch}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100vh",
              flexDirection: "column",
              fontSize: "30px",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              gap: 5,
            }}
          >
            <Typography
              sx={{ fontSize: 40, color: "white", fontWeight: "bold" }}
            >
              Congratulations! You and {currentUser} are now a match!
            </Typography>
            <DefaultButton text="Continue Swiping" onClickfunc={handleClose} />
          </Box>
        </Modal>
      </div>
      <Box className="dashboardButtons">
        <SwipeButton onClick={() => swipeAction("left")}>
          <img src={xIcon} alt="x" />
        </SwipeButton>
        <SwipeButton onClick={() => swipeAction("right")}>
          <img src={heart} alt="3" />
        </SwipeButton>
      </Box>
    </div>
  );
};
