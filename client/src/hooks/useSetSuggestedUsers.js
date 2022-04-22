import { useState, useEffect } from "react";
import { loadSuggestedUsers } from "../store/feed-actions";

const useSetSuggestedUsers = () => {
  const [suggestedUsers, setSuggestedUsers] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function anotherFunction() {
      const resData = await loadSuggestedUsers();
      if (resData.success === true) {
        setSuggestedUsers(resData.data);
        setIsLoading(false);
      } else {
        setError(resData.msg);
        setIsLoading(false);
      }
    }
    anotherFunction();
  }, []);

  return {
    suggestedUsers,
    isLoading,
    error,
  };
};

export default useSetSuggestedUsers;
