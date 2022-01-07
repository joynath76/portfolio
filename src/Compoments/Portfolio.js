import React, { useContext, useEffect, useCallback } from 'react';
import Header from '../Compoments/Header';
import ShowCase from '../Compoments/ShowCase';
import NavBar from '../Compoments/NavBar';
import Profile from '../Compoments/Profile';
import { useParams, useHistory } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import { getCall } from '../Server/APIRequests';

function Portfolio({isLogin}) {
    const { User, dispatch } = useContext(UserContext);
    const { userHandle } = useParams();
    const history = useHistory();
    if(!isLogin() && !userHandle) history.push('/');
    const routePath = userHandle ? `/user/${userHandle}`:"/user";

    const getDatas = useCallback(
        (data) => {
            dispatch({type: 'SET_USERDATA',data})
        },
        [dispatch],
    )

    useEffect(() => {
        getCall(routePath)
        .then(data => getDatas(data))
        .catch(err => {
            console.error(err.response.data);
        });
    },[routePath,getDatas])

    return (
        <div>
            <Header />
            
            {!User.credentail?console.log("loading") : User.credentail.map(credentail => {
                        return (
                            <Profile 
                                key={credentail.userId}
                                fullname={credentail.fullname}
                                bio={credentail.bio}
                                backgroundImageUrl={credentail.backgroundImageUrl}
                                profileImageUrl={credentail.profileImageUrl}
                            />
                        )
                    })}
            <NavBar />
            <ShowCase isLogin={isLogin()}/>
        </div>
    )
}

export default Portfolio
