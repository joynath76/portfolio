import React from 'react'
import '../Styles/Profile.css'

function Profile({ fullname, bio, profileImageUrl, backgroundImageUrl}) {
    return (
        <div className="profile">
            <div className="profile_images">
                <div className="profile_image_background">
                    <img 
                    src={backgroundImageUrl} alt="Background" />   
                </div>
                <div className="profile_image_foreground">
                    <img src={profileImageUrl} alt="Profile pic" />
                </div>
            </div>

            <div className="profile_details">
                <div className="profile_details_container">
                    <h1>{fullname}</h1>
                    <p>{bio}</p>
                </div>
            </div>
            
        </div>

    )
}

export default Profile
