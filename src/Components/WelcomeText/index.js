import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { FadeIn } from "../Popover";

const WelcomeTextWrapper = styled.div`
  animation: ${FadeIn} 0.2s;
`;

const UserName = styled.div`
  font-size: 84px;
  font-weight: 500;
  text-align: center;
  color: #fff;
  letter-spacing: 3px;
`;

const Greeting = styled.div`
  font-size: 44px;
  color: #fff;
  font-weight: 500;
  text-align: center;
  letter-spacing: 1px;
  margin-top: 20px;
`;

export const WelcomeText = () => {
  let currentTime = new Date();
  let greeting = "";
  let userDetails = localStorage.getItem("_user_details_");
  const [name, setName] = useState("");

  if (currentTime.getHours() >= 6 && currentTime.getHours() <= 12) {
    greeting = "Good Morning";
  } else if (currentTime.getHours() >= 13 && currentTime.getHours() <= 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  useEffect(() => {
    if (userDetails) {
      let details = JSON.parse(userDetails);
      if (details.name) {
        setName(details.name);
      }
    }
  }, []);

  return (
    <WelcomeTextWrapper>
      <UserName>Hey {name}</UserName>
      <Greeting>{greeting}</Greeting>
    </WelcomeTextWrapper>
  );
};
