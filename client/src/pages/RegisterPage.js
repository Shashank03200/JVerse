import { Link } from "react-router-dom";
import { Input, Button, Box } from "@chakra-ui/react";

import AuthImage from "../assets/authentication-logo.png";
import JVerseLogo from "../assets/jverse logo.png";
import "./AuthPage.css";

import { signUser } from "../store/auth-actions";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useRef } from "react";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameExists, setUsernameExists] = useState(null);

  const authBtnLoading = useSelector((state) => state.auth.authBtnLoading);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const registerData = {
      email,
      username,
      password,
    };

    try {
      const requestObject = {
        method: "POST",
        url: process.env.REACT_APP_API_URL + "/api/auth/register",
        data: registerData,
      };
      dispatch(signUser(requestObject));
      history.push("/edit-profile");
    } catch (err) {}
  };

  let timer = useRef() ;

  const checkExistingUser = (event)=>{
  
    clearTimeout(timer.current);
    console.log(username)
    timer.current = setTimeout(()=>{
        axios({
          method:'GET',
          url:process.env.REACT_APP_API_URL + "/api/users/check-username?queryString="+username,
          
        }).then((res)=>{
          const data = res.data;
          if(data.userExists===true){
            setUsernameExists(true);
          }else{
            setUsernameExists(false);
          }
        })
    }, 500)
  }

  return (
    <div className="Auth__Wrapper">
      <div className="Auth__LeftContainer">
        <img
          src={AuthImage}
          alt={"authentication-banner"}
          className="RegisterBanner"
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
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h2 className="Auth__FormWrapper__DescContainer">
              Sign up to see photos and videos from your friends.
            </h2>
          </div>
          <form
            method="post"
            className="Auth__FormWrapper__Form"
            onSubmit={formSubmitHandler}
            autoComplete="off"
          >
            <Input
              marginY="14px"
              name="email"
              type="email"
              isRequired
              disabled={authBtnLoading}
              placeholder="Enter email"
              size="md"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <Input
              marginY="14px"
              name="username"
              type="text"
              isRequired
              placeholder="Enter username"
              size="md"
              disabled={authBtnLoading}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              onKeyUp={checkExistingUser}
            />
            {usernameExists === true && <Box sx={{color: 'red', fontSize:'12px',letterSpacing:1, marginTop:'-10px'}}>Username Already Exists</Box>}
            <Input
              marginY="14px"
              name="password"
              type="password"
              isRequired
              disabled={authBtnLoading}
              placeholder="Enter password"
              size="md"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              type="submit"
              color="white"
              size="md"
              disabled={authBtnLoading}
              className="Auth__FormWrapper__SubmitButton"
              isLoading={authBtnLoading}
            >
              Sign Up
            </Button>
          </form>
          {!authBtnLoading && (
            <div className="Auth__FormWrapper__DescContainer">
              Already a user?&nbsp;&nbsp; <Link to="/login">Login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
