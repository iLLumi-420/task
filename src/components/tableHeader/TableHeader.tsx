import React, { Dispatch, SetStateAction } from 'react';
import { IUser } from '../../lib/interfaces/IUsers';
import styles from './TableHeader.module.scss';
import { useState, useEffect } from 'react';

type Props = {
  isClicked: boolean;
  setIsClicked: Dispatch<SetStateAction<boolean>>;
  setAllClicked: Dispatch<SetStateAction<string[]>>;
  users?: IUser[];
  allClicked: string[];
};

const TableHeader = ({
  isClicked,
  setIsClicked,
  setAllClicked,
  users,
  allClicked,
}: Props) => {
  const checkOnClick = () => {
    if (isClicked) {
      setAllClicked([]);
    } else {
      setAllClicked(users?.map((user) => user.id) ?? []);
    }
  };

  useEffect(() => {
    setIsClicked(allClicked.length === users?.length);
  }, [allClicked.length]);

  return (
    <div className={styles.tableHeader}>
      <div className={styles.nameContainer}>
        <input
          type="checkbox"
          onChange={checkOnClick}
          checked={isClicked}
        />
        <h3 className={styles.name}>Name</h3>
      </div>
      <h3 className={styles.hItem}>Username</h3>
      <h3 className={styles.hItem}>Email</h3>
      <h3 className={styles.hItem}>Phone</h3>
      <h3 className={styles.hItem}>Website</h3>
      <h3 className={styles.hItem}>Address</h3>
    </div>
  );
};

export default TableHeader;
