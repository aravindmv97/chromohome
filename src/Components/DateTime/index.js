import React, { FC, useState, useEffect } from "react";
import moment from "moment";
import styled from "styled-components";

const DateTimeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px auto 100px auto;
`;

const Time = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 70px;
  letter-spacing: 1px;
`;

const Date = styled.div`
  color: #fff;
  font-size: 30px;
  letter-spacing: 2px;
  margin-top: 10px;
`;

export const DateTime = () => {
  const [time, setTime] = useState(moment().format("LT"));

  function updateTime() {
    setInterval(() => {
      setTime(moment().format("LT"));
    }, 1000);
  }

  useEffect(() => {
    updateTime();
  }, []);

  return (
    <DateTimeWrapper>
      <Time>{time}</Time>
      <Date>{`${moment().format("dddd")}, ${moment().format(
        "MMMM Do YYYY"
      )}`}</Date>
    </DateTimeWrapper>
  );
};
