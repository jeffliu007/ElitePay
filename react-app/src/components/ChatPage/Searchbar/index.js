import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkCreateRoom } from "../../../store/rooms";
import "./Searchbar.css";

export const Searchbar = ({ existingUsers }) => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.room.allUsers);
  const session = useSelector((state) => state.session.user);
  const users = Object.values(allUsers);
  const availableUsers = users.filter(
    (user) => user.id !== session.id && !existingUsers.has(user.id)
  );

  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleFilter = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchInput(inputValue);
    const newFilter = availableUsers.filter((user) => {
      const lowerCaseEmail = user.email.toLowerCase();
      const lowerCaseUsername = user.username.toLowerCase();
      return (
        lowerCaseEmail.includes(inputValue) ||
        lowerCaseUsername.includes(inputValue)
      );
    });
    setFilteredUsers(newFilter);
  };

  const handleUserSelect = (e) => {
    const payload = {
      friend_id: e.target?.id,
    };
    dispatch(thunkCreateRoom(payload));
    setSearchInput("");
  };

  return (
    <>
      <div className="person-search-container">
        <div className="search">
          <input
            placeholder="Search for people by username..."
            value={searchInput}
            onChange={handleFilter}
          />
        </div>
        {searchInput.length != 0 && (
          <div className="dataResult">
            {filteredUsers.map((user) => {
              return (
                <div
                  className="member-selection"
                  key={`${user?.id}`}
                  id={user?.id}
                  onClick={handleUserSelect}
                >
                  {user?.username}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Searchbar;
