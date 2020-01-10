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
  animation: ${FadeIn} 0.2s;
`;

const Greeting = styled.div`
  font-size: 44px;
  color: #fff;
  font-weight: 500;
  text-align: center;
  letter-spacing: 1px;
  margin-top: 20px;
  animation: ${FadeIn} 0.2s;
`;

export const WelcomeText = () => {
  let currentTime = new Date();
  let userDetails = localStorage.getItem("_user_details_");
  const time = currentTime.getHours();
  const [name, setName] = useState("");
  let greetings = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ];

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
      {name ? (
        <>
          <UserName>Hey {name}</UserName>
          <Greeting>{greetings[time]}</Greeting>
        </>
      ) : null}
    </WelcomeTextWrapper>
  );
};
