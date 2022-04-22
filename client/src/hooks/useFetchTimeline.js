import React, { useState, useEffect, useCallback } from "react";
import routeInstance from "../routes.instance";
import setToastData from "../utils/showToast";

const useFetchTimeline = (page) => {
  const [timelinePosts, setTimelinePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [morePosts, setMorePosts] = useState(true);
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await routeInstance({
        url: `/api/posts/timeline?page=${page}&count=4`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await response.data;
      const data = resData.data;
      console.log("Timeline posts", data);
      setLoading(false);
      if (data.length === 0) {
        setMorePosts(false);
      }
      setTimelinePosts([...timelinePosts, ...data]);
    } catch (error) {
      setToastData();
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return {
    timelinePosts,
    loading,
    morePosts,
    setTimelinePosts,
  };
};

export default useFetchTimeline;
