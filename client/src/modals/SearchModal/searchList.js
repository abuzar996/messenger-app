import React from "react";
import SearchRow from "./searchRow";
import "./searchModal.styles.css";
import { useSelector } from "react-redux";
const SearchList = ({ handleUserClick }) => {
  const users = useSelector((state) => state.search.users);
  return (
    <div>
      {users && users.length > 0
        ? users.map((user) => (
            <div key={user.userId} onClick={() => handleUserClick(user)}>
              <SearchRow searchString={user.firstname} />
            </div>
          ))
        : null}
    </div>
  );
};

export default SearchList;
