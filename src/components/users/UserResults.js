import React from 'react';
import {useEffect, useContext} from "react";
import UserItem from './UserItem'
import Spinner from "../layout/Spinner";
import GitHubContext from "../../context/github/GitHubContext";

function UserResults() {
    const {users, loading, fetchUsers} = useContext(GitHubContext)

    useEffect(() => {

    }, [])


    if(!loading) {
        return (
            <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 md:grid-cols-2'>
                {users.map((user) => (
                    <UserItem key= {user.id} user={user}/>
                ))}
            </div>
        );
    } else {
        return <Spinner />
    }

}

export default UserResults;