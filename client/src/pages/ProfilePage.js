import React from "react";

import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { fetchProfileData } from "../store/feed-actions";
import { UISliceActions } from "../store/UISlice";

import { useState } from "react";
import ProfilePosts from "../components/Profile/ProfilePosts";
import ProfileUserInfo from "../components/Profile/ProfileUserInfo";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const dispatch = useDispatch();
  const params = useParams();
  const username = params.username;

  const [fetchedData, setFetchedData] = useState({});
  const isPageLoading = useSelector((state) => state.UISlice.isPageLoading);

  useEffect(() => {
    dispatch(UISliceActions.setPageLoading({ isPageLoading: true }));

    dispatch(fetchProfileData(setFetchedData, username));
  }, [username]);

  return !isPageLoading ? (
    <>
      <ProfileUserInfo fetchedData={fetchedData} />
      <ProfilePosts fetchedPosts={fetchedData.posts} />
    </>
  ) : (
    <p>Loading</p>
  );
}

export default ProfilePage;
