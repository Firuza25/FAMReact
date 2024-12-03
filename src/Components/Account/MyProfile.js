import React, { memo, useContext, useEffect } from "react";
import axios from "axios";
import { context } from "../../App";
import { Outlet, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import "./MyProfileContent.css"
import { useSelector } from "react-redux";


const MyProfile = memo(() => {
    // const { activeUser, isLoggedIn } = useContext(context)
    const { activeUser, isLoggedIn } = useSelector(state => state.data);


    const navigate = useNavigate()

    //We must uncomment it later!
    useEffect(() => {
        if(!isLoggedIn){
            console.log("in MyProfile.js session expired or user logged out, so it is navigated to home page!")
            navigate("/home")
        }

    }, [isLoggedIn] )

    return (
        <div className="my-profile">
            <ProfileMenu />
            <div className="my-profile-content">
                <Outlet />
            </div>

        </div>
    )
})
export default MyProfile