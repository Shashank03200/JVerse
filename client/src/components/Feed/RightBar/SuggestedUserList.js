import { Box } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import useSetSuggestedUsers from "../../../hooks/useSetSuggestedUsers";
import SuggestedUser from "./SuggestedUser";
import _ from "underscore";

function SuggestedUserList(props) {
  // Using a custom hook
  const { suggestedUsers, isLoading, error } = useSetSuggestedUsers();

  let suggestedUsersList = undefined;
  let limitedUsers = undefined;
  if (suggestedUsers) {
    suggestedUsersList = _.first(suggestedUsers, props.count);

    limitedUsers =
      suggestedUsersList &&
      suggestedUsersList.map((suggestedUser, index) => {
        return (
          <SuggestedUser
            key={suggestedUser + index}
            src={suggestedUser.profileImage}
            username={suggestedUser.username}
            userId={suggestedUser._id}
            minWidth={props.minWidth}
          />
        );
      });
  }

  if (isLoading) {
    return (
      <Box w="100%" textAlign="center" p="12px">
        <Spinner />
      </Box>
    );
  }
  if (error) {
    return <Box w="100%" textAlign="center" p="12px"></Box>;
  }
  return limitedUsers;
}

export default SuggestedUserList;
