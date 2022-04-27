import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { GraphQLResponse } from 'graphql-request/dist/types';
import { IUser } from '../lib/interfaces/IUsers';
import graphqlRequestClient from '../lib/client/graphqlRequestClient';
import {
  SearchIcon,
  UserAddIcon,
} from '@heroicons/react/solid';
import TableHeader from '../components/tableHeader/TableHeader';
import TableContent from '../components/tableContent/TableContent';
import { useEffect, useState } from 'react';

type UserResponse = {
  data: IUser[];
};

const query = gql`
  query getALLUsers {
    users {
      data {
        id
        name
        username
        email
        phone
        website
        address {
          street
        }
      }
    }
  }
`;

const Home: NextPage = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [allClicked, setAllClicked] = useState<string[]>(
    []
  );
  const [filteredUsers, setFilteredUsers] = useState<
    IUser[]
  >([]);

  const { isLoading, error, data } = useQuery<
    GraphQLResponse,
    Error,
    UserResponse
  >(
    'users',
    async () => {
      return graphqlRequestClient.request(query);
    },
    { select: (response) => response.users }
  );

  const users = data?.data;

  useEffect(() => {
    users && setFilteredUsers(users);
  }, [isLoading]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Errors: {error?.message}</p>;
  const onInputChange = (e: any) => {
    const searchValue = e.target.value;
    const regex = new RegExp(searchValue, 'i');
    setFilteredUsers(
      users?.filter(
        (user) =>
          regex.test(user.name) ||
          regex.test(user.username) ||
          regex.test(user.email) ||
          regex.test(user.phone) ||
          regex.test(user.address.street)
      ) ?? []
    );
  };

  if (data) {
    return (
      <>
        <Head>
          <title>Task</title>
        </Head>
        <div className={styles.header}>
          <h2>Users</h2>
          <div className={styles.headerEnd}>
            <input
              className={styles.input}
              onChange={onInputChange}
            />
            <button className={styles.addUserButton}>
              <UserAddIcon
                height={15}
                width={15}
                className={styles.addUserIcon}
              />
              <p className={styles.addUser}>Add user</p>
            </button>
          </div>
        </div>
        <div className={styles.tableContainer}>
          <TableHeader
            isClicked={isClicked}
            setIsClicked={setIsClicked}
            setAllClicked={setAllClicked}
            users={users}
            allClicked={allClicked}
          />
          {filteredUsers
            ?.sort((a: IUser, b: IUser) =>
              a?.username.toLowerCase() >
              b?.username.toLowerCase()
                ? 1
                : -1
            )
            .map((user: IUser) => {
              return (
                <TableContent
                  users={user}
                  allClicked={allClicked}
                  setAllClicked={setAllClicked}
                />
              );
            })}
        </div>
      </>
    );
  }

  return <div>No data</div>;
};

export default Home;
