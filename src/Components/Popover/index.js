import React, { useState, FC } from "react";
import styled, { keyframes } from "styled-components";

import Settings from "../images/settings.png";

export const FadeIn = keyframes`
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
`;

const PopoverWrapper = styled.div`
  height: max-content;
  width: max-content;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  color: #fff;
  position: absolute;
  bottom: 60px;
  left: 60px;
  z-index: 999;
  animation: ${FadeIn} 0.4s;
  padding: 20px;
`;

const SettingsIcon = styled.img`
  position: absolute;
  bottom: 20px;
  left: 20px;
  height: 20px;
  width: 20px;
  cursor: pointer;
`;

export const Popover = ({ children, showPopup, toggleSettingsPopop }) => {
  return (
    <>
      <SettingsIcon src={Settings} onClick={toggleSettingsPopop} />
      {showPopup ? <PopoverWrapper>{children}</PopoverWrapper> : null}
    </>
  );
};
