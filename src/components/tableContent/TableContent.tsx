import React, { useState, useEffect } from 'react';
import { IUser } from '../../lib/interfaces/IUsers';
import styles from './tableContent.module.scss';
import { Dispatch, SetStateAction } from 'react';

type users = {
  users: IUser;
  allClicked: string[];
  setAllClicked: Dispatch<SetStateAction<string[]>>;
};

const TableContent = ({
  users,
  allClicked,
  setAllClicked,
}: users) => {
  const onClick = (e: React.ChangeEvent) => {
    if (!allClicked.includes(users.id)) {
      setAllClicked([...allClicked, e.target.id]);
    } else {
      setAllClicked(
        allClicked.filter((item) => item != e.target.id)
      );
    }
  };

  return (
    <div className={styles.content} key={users.id}>
      <div className={styles.nameContainer}>
        <input
          type="checkbox"
          id={users.id}
          checked={allClicked.includes(users.id)}
          onChange={onClick}
        />
        <p className={styles.name}>{users.name}</p>
      </div>
      <p className={styles.items}>{users.username}</p>
      <p className={styles.items}>{users.email}</p>
      <p className={styles.items}>{users.phone}</p>
      <p className={styles.items}>{users.website}</p>
      <p className={styles.items}>{users.address.street}</p>
    </div>
  );
};

export default TableContent;
