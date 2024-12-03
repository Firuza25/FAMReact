import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileMenu.css"

const ProfileMenu =() => {
    const navigate = useNavigate()

    return (<div className="profile-menu">
        <p>My Account</p>
        <div className="profile-menu-box" onClick={() => (navigate("/user-profile"))}><p>My profile</p></div>
        <div className="profile-menu-box" onClick={() => (navigate("tickets"))}><p>Tickets</p></div>

    </div>)

}
export default ProfileMenu