import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { gql } from "graphql-request";
import {  useQuery } from 'react-query'
import { GraphQLResponse } from "graphql-request/dist/types";
import { FC } from "react";
import { IUser } from "../lib/interfaces/IUsers";
import graphqlRequestClient from "../lib/client/graphqlRequestClient"; 
import { SearchIcon, UserAddIcon } from '@heroicons/react/solid'
import TableHeader from "../components/tableHeader/TableHeader";
import TableContent from "../components/tableContent/TableContent";

const query = gql`
    query getALLUsers{
        users{
            data{
                id
                name
                username
                email
                phone
                website
                address{
                    street
                }
            }
        }
    }
        
`



const Home: NextPage = () => {
  const { isLoading, error, data } = useQuery<GraphQLResponse, Error, IUser[]>(
    'users',
    async ()=>{
        return graphqlRequestClient.request(query)},
    {select: (response)=> response.users  })

  if(isLoading) return <p>Loading...</p>
  if(error) return <p>Errors: {error.message}</p>
  if(data){
    const users = data['data']
    console.log(users)
    return (
        <>  
            <div className={styles.header}>
                <h2>Users</h2>
                <div className={styles.headerEnd}>
                    <SearchIcon className={styles.searchIcon} />
                    <button className={styles.addUserButton}>
                        <UserAddIcon height={15} width={15} className={styles.addUserIcon}/>
                        <p className={styles.addUser}>Add user</p>
                    </button>
                </div>
            </div>
            <div className={styles.tableContainer}>
                <TableHeader/>
                {users?.map((user:IUser) => <TableContent props = {user}/>
                )}
            </div>
        </>
    )
  }

  return (
      <div>No data</div>
  )
}

export default Home
