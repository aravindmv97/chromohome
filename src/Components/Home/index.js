import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

import { DateTime } from "../DateTime";
import { UserDetails } from "../UserDetails";
import { Popover } from "../Popover";
import { WelcomeText } from "../WelcomeText";
import { FadeIn } from "../Popover";

import BG from "../images/bg.png";
import Save from "../images/tick.png";
import Cancel from "../images/cancel.png";
import Change from "../images/edit.png";

const HomeContainer = styled.div`
  background: url(${props => props.bg});
  background-color: #333;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-size: cover;
  position: relative;
  animation: ${FadeIn} 0.2s;
  transition: 0.2s;
`;

const Wrapper = styled.div`
  padding-top: 60px;
  width: 100%;
  height: 100%;
`;

const AppName = styled.div`
  letter-spacing: 4px;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  opacity: 0.7;
  background: #fff;
  border-radius: 10px;
  padding: 10px 15px;
  width: max-content;
  transform: skewX(-10deg);
  margin: 50px auto;
`;

const EditDetailsItem = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  padding: 20px 0;

  &:hover {
    opacity: 0.8;
  }
`;

const SelectImageBox = styled.div`
  padding: 20px;
  border: 1px dashed #fff;
  border-radius: 20px;
  outline: none;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`;

const PreviewWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const PreviewImg = styled.img`
  height: 100px;
  width: 100px;
  margin: 0 auto;
  object-fit: cover;
`;

const ActionIconsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
`;

const ActionIcon = styled.img`
  height: 25px;
  width: 25px;
  cursor: pointer;
  margin: 0 15px;
`;

const LoginCTA = styled.div`
  font-size: 16px;
  border: 1px solid #fff;
  font-weight: 500;
  letter-spacing: 1px;
  border-radius: 5px;
  padding: 8px 12px;
  margin: 40px auto;
  color: #fff;
  width: max-content;
  cursor: pointer;
`;

export const Home = () => {
  let userDetails = localStorage.getItem("_user_details_");
  let savedImg = localStorage.getItem("_bg_");

  const [isLoggedIn, setIsLoggedIn] = useState(
    typeof userDetails !== "undefined" && userDetails !== null ? true : false
  );
  const [editProfile, setEditProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [changeBG, setChangeBG] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [savedImage, setSavedImage] = useState(
    typeof savedImg !== "undefined" && savedImg ? savedImg : ""
  );
  const [login, setLogin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  function toggleSettingsPopop() {
    setShowPopup(!showPopup);
  }

  function setLoginState() {
    setIsLoggedIn(true);
  }

  function toggleEditProfile() {
    if (editProfile) toggleSettingsPopop();
    setEditProfile(!editProfile);
  }

  function toggleChangePassword() {
    setChangePassword(!changePassword);
  }

  function toggleChangeBG() {
    setChangeBG(!changeBG);
  }

  const onDrop = useCallback(acceptedFiles => {
    var reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = function() {
      setSelectedImage(reader.result);
    };
    reader.onerror = function(error) {
      console.log("Error: ", error);
    };
  }, []);

  function saveImage() {
    localStorage.setItem("_bg_", JSON.stringify(selectedImage));
    setSavedImage(selectedImage);
    toggleChangeBG();
    setSelectedImage("");
  }

  useEffect(() => {
    let savedImg = localStorage.getItem("_bg_");
    if (typeof savedImg !== "undefined" && savedImg) {
      setSavedImage(JSON.parse(savedImg));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  console.log(savedImage, selectedImage);
  return (
    <HomeContainer bg={selectedImage === "" ? savedImage : selectedImage || BG}>
      <Wrapper>
        {!isLoggedIn || login ? <AppName>CHROMOHOME</AppName> : null}
        {isLoggedIn && !login ? <DateTime /> : null}
        {isLoggedIn && !editProfile ? <WelcomeText /> : null}
        {editProfile || changePassword || !isLoggedIn || login ? (
          <>
            <UserDetails
              login={login}
              isLoggedIn={isLoggedIn}
              changePassword={changePassword}
              editProfile={editProfile}
              setLoginState={setLoginState}
              toggleEditProfile={toggleEditProfile}
              toggleChangePassword={toggleChangePassword}
              toggleSettingsPopop={toggleSettingsPopop}
            />
          </>
        ) : null}
        {/* {!isLoggedIn && !login ? <LoginCTA onClick={toggleLogin}>Login</LoginCTA> : null} */}
        <Popover
          showPopup={showPopup}
          toggleSettingsPopop={toggleSettingsPopop}
        >
          {changeBG ? (
            <>
              {typeof selectedImage !== "undefined" && selectedImage ? (
                <PreviewWrapper>
                  <PreviewImg src={selectedImage} />
                  <ActionIconsWrapper>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <ActionIcon src={Change} />
                    </div>
                    <ActionIcon src={Save} onClick={saveImage} />
                    <ActionIcon
                      src={Cancel}
                      onClick={() => {
                        setSelectedImage("");
                        toggleChangeBG();
                      }}
                    />
                  </ActionIconsWrapper>
                </PreviewWrapper>
              ) : (
                <>
                  <SelectImageBox {...getRootProps()}>
                    <input {...getInputProps()} />
                    {selectedImage ? "Change" : "Select"} Image
                  </SelectImageBox>
                  <ActionIconsWrapper>
                    <ActionIcon
                      src={Cancel}
                      onClick={() => {
                        setSelectedImage("");
                        toggleChangeBG();
                      }}
                    />
                  </ActionIconsWrapper>
                </>
              )}
            </>
          ) : (
            <>
              <EditDetailsItem onClick={toggleChangeBG}>
                Edit Background
              </EditDetailsItem>
              <EditDetailsItem onClick={toggleEditProfile}>
                Edit Name
              </EditDetailsItem>
              {/* <EditDetailsItem onClick={toggleChangePassword}>
                Change Password
              </EditDetailsItem> */}
            </>
          )}
        </Popover>
      </Wrapper>
    </HomeContainer>
  );
};
