import { Input, Button } from "@chakra-ui/react";

import { useState } from "react";
import { Link } from "react-router-dom";
import AuthImage from "../assets/authentication-logo.png";
import JVerseLogo from "../assets/jverse logo.png";
import { useDispatch, useSelector } from "react-redux";
import { signUser } from "../store/auth-actions";

import "./AuthPage.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const authButtonLoading = useSelector((state) => state.auth.authBtnLoading);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginFormHandler = (e) => {
    e.preventDefault();
    const requestObject = {
      method: "POST",
      url: process.env.REACT_APP_API_URL + "/api/auth/login",
      data: { email, password },
    };
    dispatch(signUser(requestObject));
  };

  return (
    <div className="Auth__Wrapper">
      <div className="Auth__LeftContainer">
        <img
          src={AuthImage}
          alt={"authentication-banner"}
          className="Auth_LeftContainer__BannerImage"
        />
      </div>
      <div className="Auth__RightContainer">
        <div className="Auth__FormWrapper">
          <div className="SiteLogo">
            <img
              src={JVerseLogo}
              alt="JVERSELOGO"
              className="Auth__FormWrapper__JVerseLogo"
            />
          </div>{" "}
          <form
            method="post"
            onSubmit={loginFormHandler}
            className="Auth__FormWrapper__Form"
            autoComplete="off"
          >
            <Input
              marginY="14px"
              name="email"
              type="email"
              isRequired
              placeholder="Enter email"
              size="md"
              disabled={authButtonLoading}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              marginY="14px"
              name="password"
              type="password"
              isRequired
              placeholder="Enter password"
              size="md"
              disabled={authButtonLoading}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              color="white"
              size="md"
              disabled={authButtonLoading}
              className="Auth__FormWrapper__SubmitButton"
              isLoading={authButtonLoading}
            >
              Login
            </Button>
          </form>
          {!authButtonLoading && (
            <div className="Auth__FormWrapper__DescContainer">
              Not a user?&nbsp;&nbsp; <Link to="/register">Register</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
