import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getMathces } from "../../API/userConnection";
import ImagesStepper from "./ImagesStepper";

type MatchType = {
  matchId: number;
  firstName: string;
  lastName: string;
  age: number;
  description: string;
  gymArea: string;
  photos: string[];
};

export const Matches: React.FC = () => {
  const [matches, setMatches] = useState<MatchType[] | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const result = await getMathces();
        setMatches(result.data.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchMatches();
    console.log(matches);
  }, []);

  return (
    <div className="matchesWrapper">
      {matches?.map(
        (
          {
            matchId,
            firstName,
            lastName,
            age,
            photos,
            gymArea,
            description,
          }: MatchType,
          index
        ) => (
          <Box key={`${matchId}-${index}`}>
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
                <Typography sx={{ fontSize: "22px" }}>{description}</Typography>
              </Box>
            </div>
          </Box>
        )
      )}
    </div>
  );
};
