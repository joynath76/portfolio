import React, { createContext, useReducer, useState } from 'react';
import UserReducer from './UserReducer';

const UserContext = createContext();
export function UserContextProvider(props) {
    const [ User, dispatch ] = useReducer(UserReducer, {
        credentail : [],
        Projects : [],
        Educations : [],
        Experiences : []
    });
    const [updateData, setUpdateData] = useState({});

    return (
        <UserContext.Provider value={
            {
                User,
                dispatch,
                updateData,
                setUpdateData
            }
        }>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;
