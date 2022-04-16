
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import { Modal } from '@mui/material';

import userAvatar from "../../assets/avatar.png"

import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { getMyPosts } from "../../feautures/post/postSlice"
import { getFollowings, getFollowers } from "../../feautures/user/userSlice"
import { updateUser } from '../../feautures/currentUser/currentUserSlice';

import AccountPosts from '../accountPosts/AccountPosts';
import "./account.css"

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";

import app from '../../firebase';

const Account = ({ userData }) => {

    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.currentUser)
    const { posts, isLoading } = useSelector((state) => state.post)
    const { followings, followers } = useSelector((state) => state.user)

    const [userInfo, setUserInfo] = useState({
        biography: user.biography,
        // ...
    })
    const { username, biography } = userInfo

    const [userImage, setUserImage] = useState(null)

    const [modalFollowings, setModalFollowings] = useState(false)
    const [modalFollowers, setmodalFollowers] = useState(false)
    const [modalSettings, setModalSettings] = useState(false)

    useEffect(() => {
        dispatch(getMyPosts())
        dispatch(getFollowings(userData._id))
        dispatch(getFollowers(userData._id))

    }, [userData._id, dispatch])

    const handleChange = (e) => {
        setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = () => {
        if (userImage) {
            const imageName = new Date().getTime() + userImage.name
            const storage = getStorage(app)
            const storageRef = ref(storage, imageName)

            const uploadTask = uploadBytesResumable(storageRef, userImage);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                },
                (error) => {
                    // Handle unsuccessful uploads
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const updatedUser = { username, biography, image: downloadURL }
                        dispatch(updateUser(updatedUser))
                    });
                }
            );
        }
        else {
            const updatedUser = { username, biography }
            dispatch(updateUser(updatedUser))
        }
        setModalSettings(false)
    }

    return (
        <section>
            <div className="account">
                <div className="account-top">
                    <img src={userData.image || userAvatar} alt="" className="account-img" />
                    <div className="account-info">
                        <div>
                            <div className="account-info-name">
                                <h2>{userData.username}</h2>
                                {userData._id === user._id &&
                                    <SettingsIcon className='account-settings-icon' onClick={() => setModalSettings(true)} />
                                }
                            </div>
                            <span className="account-mail">@{userData.email.split("@")[0]}</span>
                        </div>
                        <div className="account-follow-info">
                            <div><span>{posts.length}</span> posts</div>
                            <button onClick={() => setModalFollowings(true)}><span>{followings.length}</span> followed</button>
                            <button onClick={() => setmodalFollowers(true)}><span>{followers.length}</span> followers</button>
                        </div>
                        <p className="account-bio">{userData.biography}</p>
                    </div>
                </div>

                <Modal open={modalSettings} onClose={() => setModalSettings(false)}>
                    <div className='modal-settings-container'>
                        <div className='modal-settings'>
                            <div className='modal-settings-image-container'>
                                <h3>{user.username}</h3>
                                <img src={user.image || userAvatar} alt={user.username} className='modal-settings-image' />
                                <label htmlFor="input-image" className='modal-settings-img-label'>{userImage ? "Edit a Photo" : "Add a Photo"}
                                    <EditIcon />
                                    <input type="file" id="input-image" className='modal-settings-input-file' onChange={(e) => setUserImage(e.target.files[0])} />
                                </label>
                            </div>
                            <div className='modal-settings-info-container'>
                                <label htmlFor="input-biography">Biography</label>
                                <div className='form-group'>
                                    <textarea id="input-biography" name="biography" value={biography} onChange={(e) => handleChange(e)} cols="35" rows="10" />
                                </div>
                                <div className='form-group'>
                                    <button onClick={handleClick} className='modal-settings-btn' >Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal open={modalFollowings} onClose={() => setModalFollowings(false)}>
                    <div className='modal-follow-container' >
                        <h3>Followings</h3>
                        <div className='modal-list'>
                            {followings.map((user) => (
                                <div key={user._id} className="modal-user">
                                    <Link to="/" className='modal-user-info'>
                                        <img src={user.image || userAvatar} className="modal-user-image" alt={user.username} />
                                        <div className=''>{user.username}</div>
                                    </Link>
                                    <button className='modal-follow-btn'>unfollow</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal>

                <Modal open={modalFollowers} onClose={() => setmodalFollowers(false)}>
                    <div className='modal-follow-container' >
                        <h3>Followers</h3>
                        <div className='modal-list'>
                            {followers.map((user) => (
                                <div key={user._id} className="modal-user">
                                    <Link to="/" className='modal-user-info'>
                                        <img src={user.image || userAvatar} className="modal-user-image" alt={user.username} />
                                        <div className=''>{user.username}</div>
                                    </Link>
                                    <button className='modal-follow-btn'>follow</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal>

                <AccountPosts posts={posts} isLoading={isLoading} userData={userData} user={user} />
            </div>
        </section>
    )
}

export default Account