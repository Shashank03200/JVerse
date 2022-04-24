import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import React, { Suspense, useEffect } from "react";
import { Spinner, useToast } from "@chakra-ui/react";

import checkSession from "./utils/checkSession";
import { getTokens } from "./utils/handleTokens";
import showTost from "./utils/showToast";

import "./App.css";
import { UISliceActions } from "./store/UISlice";
import { authSliceActions } from "./store/authSlice";

import LoadOverlay from "./components/VisualFeedback/LoadOverlay";
import SuggestionsPage from "./pages/SuggestionsPage";
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));

const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));

const EditProfilePage = React.lazy(() => import("./pages/EditProfilePage"));

const ProcessOverlay = React.lazy(() =>
  import("./components/VisualFeedback/ProcessOverlay")
);
const LogoutAlert = React.lazy(() =>
  import("./components/VisualFeedback/LogoutAlert")
);

const NewPostCreator = React.lazy(() =>
  import("./components/VisualFeedback/NewPostCreator")
);
const NavWrapper = React.lazy(() => import("./components/Appbar/NavWrapper"));

const FeedPage = React.lazy(() => import("./pages/FeedPage"));

const socket = io("https://server-domain.com");

socket.emit("hello", "world");

function App() {
  const dispatch = useDispatch();
  const toast = useToast();
  const history = useHistory();
  const { isPageLoading, toastData } = useSelector((state) => state.UISlice);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const modalProcess = useSelector((state) => state.UISlice.modalProcess);
  const modalProcessResultStatus = modalProcess.result.status;
  const isLogoutAlertVisible = useSelector(
    (state) => state.UISlice.isLogoutAlertVisible
  );
  const { isActive } = toastData;

  useEffect(() => {
    if (!isLoggedIn) {
      const tokens = getTokens();
      const accessToken = tokens.accessToken;
      const refreshToken = tokens.refreshToken;
      if (!navigator.onLine) {
        showTost(dispatch, { success: false, msg: "No internet" });
        return;
      }
      if (accessToken && refreshToken) {
        dispatch(UISliceActions.setPageLoading({ isPageLoading: true }));

        checkSession(dispatch)
          .then((data) => {
            dispatch(authSliceActions.loginUser());
            dispatch(UISliceActions.setPageLoading({ isPageLoading: false }));
          })
          .catch((err) => {
            showTost(dispatch, { success: false, msg: "Server Error" });
            dispatch(authSliceActions.logoutUser());
            dispatch(UISliceActions.setPageLoading({ isPageLoading: false }));
            history.replace("/login");
          });
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isActive) {
      let toastPosition = "top-right";
      if (window.innerWidth < 700) {
        toastPosition = "bottom";
      }

      toast({
        title: toastData.title,
        status: toastData.status,
        position: toastPosition,
        isClosable: true,
        duration: 2000,
        containerStyle: {
          fontSize: toastPosition === "bottom" ? "12px" : "14px",
        },
      });
    }

    return () => {
      dispatch(UISliceActions.resetToastData());
    };
  }, [isActive]);

  useEffect(() => {
    if (modalProcessResultStatus !== undefined) {
      setTimeout(() => {
        dispatch(UISliceActions.resetProcess());
      }, 2000);
    }
  }, [modalProcessResultStatus, dispatch]);

  useEffect(() => {
    window.addEventListener("offline", () => {
      showTost(dispatch, { success: false, msg: "Connection Lost" });
    });
    window.addEventListener("online", () => {
      showTost(dispatch, { success: true, msg: "Connected to server" });
    });
  }, []);

  console.log("App.js");

  return (
    <div className="App">
      <Suspense fallback={<LoadOverlay />}>
        {isLoggedIn && <ProcessOverlay data={modalProcess} />}
        {isLoggedIn && (
          <LogoutAlert
            isOpen={isLogoutAlertVisible}
            onClose={() =>
              dispatch(
                UISliceActions.setLogoutAlertVisibility({
                  isLogoutAlertVisible: false,
                })
              )
            }
          />
        )}
        {isPageLoading && <LoadOverlay />}
        {isLoggedIn && <NewPostCreator />}

        <Switch>
          <Route path="/login" exact>
            {isLoggedIn ? <Redirect to="/" /> : <LoginPage />}
          </Route>
          <Route path="/register" exact>
            {isLoggedIn ? <Redirect to="/" /> : <RegisterPage />}
          </Route>
          <Route path="/profile/:username">
            {isLoggedIn ? (
              <NavWrapper>
                <ProfilePage />
              </NavWrapper>
            ) : (
              <RegisterPage />
            )}
          </Route>
          <Route path="/update" exact>
            {isLoggedIn ? (
              <NavWrapper>
                <SuggestionsPage />
              </NavWrapper>
            ) : (
              <RegisterPage />
            )}
          </Route>
          <Route path="/edit-profile" exact>
            {isLoggedIn ? (
              <NavWrapper>
                <EditProfilePage />
              </NavWrapper>
            ) : (
              <RegisterPage />
            )}
          </Route>
          <Route path="/">
            {isLoggedIn ? (
              <NavWrapper>
                <FeedPage />
              </NavWrapper>
            ) : (
              <LoginPage />
            )}
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
