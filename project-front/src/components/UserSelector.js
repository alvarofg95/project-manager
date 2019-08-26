import React from 'react';

export default ({ users = [], onSelectUser, selectedUsers }) => {
  console.log(users);
  if (users && users.length) {
    return users.map(user => {
      const selected = selectedUsers.findIndex(su => su === user._id) > -1;
      return (
        <div
          key={`user_${user._id}`}
          className={`userSelectorItem${selected ? ' activeUser' : ''}`}
          onClick={() => onSelectUser(user._id)}
        >
          <span>{user.nick}</span>
        </div>
      );
    });
  } else {
    return null;
  }
};
