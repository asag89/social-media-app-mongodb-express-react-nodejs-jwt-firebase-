
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { resetPost } from "../../feautures/post/postSlice"
import { getOtherUsers, resetUser } from "../../feautures/user/userSlice"

import LeftSide from "../../components/leftSide/LeftSide"
import Navbar from "../../components/navbar/Navbar"
import Account from "../../components/account/Account"

import "./profile.css"

const Profile = () => {

    const dispatch = useDispatch()
    const { username } = useParams()

    const { userProfile } = useSelector((state) => state.user)
    const { user } = useSelector((state) => state.currentUser)

    useEffect(() => {
        if (username !== user.id) {
            dispatch(getOtherUsers(username))
        }
        return () => {
            dispatch(resetUser())
            dispatch(resetPost())
        }
    }, [dispatch, username, user.id])

    return (
        <div className="container">
            <Navbar />
            <div className="main-profile">
                <LeftSide />
                <Account userData={userProfile ? userProfile : user} />
            </div>
        </div>
    )
}

export default Profile