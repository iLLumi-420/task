import { gql } from "graphql-request";
import { Query, useQuery, useQueryClient } from 'react-query'
import { GraphQLResponse } from "graphql-request/dist/types";
import { FC } from "react";
import { IUser } from "../lib/interfaces/IUsers";
import graphqlRequestClient from "../lib/client/graphqlRequestClient"; 

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
            }
        }
    }
        
`


const GetRequestQuery:FC = () => {
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
                {users?.map((user:IUser)=>{
                    console.log(user)
                    return (
                        <div key={user.id}>
                            <p>{user.name}</p>
                            <p>{user.phone}</p>
                            <p>{user.email}</p>
                        </div>
                    )
                })}
                <div>
                    ok
                </div>
            </>
        )
    }
    return (
        <div>No data</div>
    )
    
    
    
}

export default GetRequestQuery