import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { FadeIn } from "../Popover";

import Next from "../images/next.png";
import Previous from "../images/previous.png";
import Cancel from "../images/cancel.png";

const UserDetailsWrapper = styled.div`
  width: 100%;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const NameInputWrapper = styled(InputWrapper)`
  display: ${props => (props.show ? "flex" : "none")};
  animation: ${FadeIn} 0.2s;
`;

const EmailInputWrapper = styled(InputWrapper)`
  display: ${props => (props.show ? "flex" : "none")};
  animation: ${FadeIn} 0.2s;
`;

const PasswordInputWrapper = styled(InputWrapper)`
  display: ${props => (props.show ? "flex" : "none")};
  animation: ${FadeIn} 0.2s;
`;

const Label = styled.div`
  font-size: 44px;
  font-weight: 500;
  color: #fff;
  text-align: center;
`;

const Input = styled.input`
  letter-spacing: 3px;
  border: 1px solid #fff;
  min-width: 60%;
  max-width: 100%;
  height: 80px;
  font-size: 44px;
  font-weight: bold;
  background: transparent;
  border-radius: 10px;
  outline: none;
  color: #fff;
  padding: 0 15px;
  margin-top: 40px;
  text-align: center;

  &:focus {
    outline: 0;
  }
`;

const ErrLabel = styled.div`
  margin-top: 20px;
  font-weight: 500;
  font-size: 24px;
  color: #fff;
  height: 40px;
`;

const ActionIconsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100px;
  margin: 20px auto 0 auto;
`;

const ActionIcon = styled.img`
  height: 45px;
  width: 45px;
  cursor: pointer;
  margin: 0 20px;
`;

const IncognitoCTA = styled.div`
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

export const UserDetails = ({
  login,
  isLoggedIn,
  changePassword,
  editProfile,
  setLoginState,
  toggleEditProfile,
  toggleChangePassword,
  toggleSettingsPopop
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState("name");
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  let userDetails = localStorage.getItem("_user_details_");

  function changeStep(proceedTo) {
    if (proceedTo === "next") {
      setStep(step === "name" ? "email" : step === "email" ? "password" : null);
    } else {
      setStep(step === "email" ? "name" : step === "password" ? "email" : null);
    }
  }

  function handleInputChange(e) {
    setErrors({ name: "", email: "", password: "" });
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  }

  function validateName() {
    if (name.length === 0) {
      setErrors({ ...errors, name: "Name can't be empty." });
    } else {
      if (userDetails) {
        localStorage.setItem(
          "_user_details_",
          JSON.stringify({ ...JSON.parse(userDetails), name: name })
        );
      } else {
        localStorage.setItem(
          "_user_details_",
          JSON.stringify({ name: name, email: "" })
        );
      }
      setLoginState();
      if (editProfile) {
        toggleEditProfile();
        toggleSettingsPopop();
      }
      changeStep("next");
    }
  }

  function validateEmail() {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.length === 0) {
      setErrors({ ...errors, email: "Email can't be empty." });
    } else if (!regex.test(String(email).toLowerCase())) {
      setErrors({ ...errors, email: "Invalid Email id." });
    } else {
      if (userDetails) {
        localStorage.setItem(
          "_user_details_",
          JSON.stringify({ ...JSON.parse(userDetails), email: email })
        );
      } else {
        localStorage.setItem(
          "_user_details_",
          JSON.stringify({ name: "", email: email })
        );
      }
      changeStep("next");
    }
  }

  function validatePassword() {
    if (password.length === 0) {
      setErrors({ ...errors, password: "Password can't be empty." });
    } else if (password.length < 8) {
      setErrors({ ...errors, password: "Password must have 8 characters." });
    } else {
      setLoginState();
      if (changePassword) toggleChangePassword();
      changeStep("next");
    }
  }

  function toggleSteps(type) {
    if (step === "name") {
      validateName();
    } else if (step === "email" && !editProfile) {
      type === "next"
        ? validateEmail()
        : login
        ? setStep("password")
        : setStep("name");
    } else if (step === "password" && !isLoggedIn) {
      type === "prev" ? setStep("email") : validatePassword();
    }
  }

  function handleEnterPress(e) {
    if (e.keyCode === 13) {
      validateName();
    }
  }

  function cancelEdit() {
    editProfile ? toggleEditProfile() : toggleChangePassword();
  }

  function switchToIncognito() {
    setLoginState();
  }

  useEffect(() => {
    changePassword ? setStep("password") : setStep("name");
    if (userDetails) {
      let details = JSON.parse(userDetails);
      if (details.name) {
        setName(details.name);
      }
      if (details.email) {
        setEmail(details.email);
      }
    }
  }, []);

  useEffect(() => {
    if (login) setStep("email");
  }, [login]);

  return (
    <UserDetailsWrapper>
      <NameInputWrapper show={step === "name"}>
        <Label>Hey, What's your name?</Label>
        <Input
          value={name}
          onChange={handleInputChange}
          name={"name"}
          onKeyDown={handleEnterPress}
          autoComplete="off"
        />
        <ErrLabel>{errors.name}</ErrLabel>
      </NameInputWrapper>
      {/* <EmailInputWrapper show={step === "email"}>
        <Label>Hey, What's your Email id?</Label>
        <Input
          value={email}
          onChange={handleInputChange}
          name={"email"}
          onKeyDown={handleEnterPress}
          autoComplete="off"
        />
        <ErrLabel>{errors.email}</ErrLabel>
      </EmailInputWrapper>
      <PasswordInputWrapper show={step === "password"}>
        <Label>Set {changePassword ? "new" : "a"} password</Label>
        <Input
          value={password}
          onChange={handleInputChange}
          type="password"
          name={"password"}
          onKeyDown={handleEnterPress}
        />
        <ErrLabel>{errors.password}</ErrLabel>
      </PasswordInputWrapper> */}
      <ActionIconsWrapper>
        {/* {step !== "name" && !changePassword && !login && step === "email" ? (
          <ActionIcon src={Previous} onClick={() => toggleSteps("prev")} />
        ) : null} */}
        <ActionIcon
          src={Next}
          onClick={() =>
            changePassword ? validatePassword() : toggleSteps("next")
          }
        />
        {isLoggedIn || changePassword || editProfile ? (
          <ActionIcon src={Cancel} onClick={cancelEdit} />
        ) : null}
      </ActionIconsWrapper>
      {/* {step !== "name" && !login ? (
        <IncognitoCTA onClick={switchToIncognito}>Stay Logged out</IncognitoCTA>
      ) : null} */}
    </UserDetailsWrapper>
  );
};
