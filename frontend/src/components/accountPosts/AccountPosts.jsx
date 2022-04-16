
import ViewComfySharpIcon from '@mui/icons-material/ViewComfySharp';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { FaRegComment } from "react-icons/fa"
import { FaRegHeart } from "react-icons/fa"
import { FiShare } from "react-icons/fi"
import { HiOutlineBookmark } from "react-icons/hi"

import { CircularProgress, Modal } from '@mui/material';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from "../../feautures/post/postSlice"

import moment from "moment"
import userAvatar from "../../assets/avatar.png"
import "./accountPosts.css"

const AccountPosts = ({ posts, isLoading, userData, user }) => {
  const dispatch = useDispatch()

  const [modalData, setModalData] = useState({})
  const [modalPost, setModalPost] = useState(false)

  const handleModal = (text) => {
    setModalData(text)
    setModalPost(true)
  }

  if (isLoading) {
    return (
      <CircularProgress />
    )
  }
  return (
    <div className="account-posts">
      <div className="account-posts-top">
        <div>
          <ViewComfySharpIcon />
          <span>Posts</span>
        </div>
        <div>
          <VideoLibraryOutlinedIcon />
          <span>Videos</span>
        </div>
        <div>
          <CollectionsOutlinedIcon />
          <span>Images</span>
        </div>
      </div>
      <div className="post-list">
        {posts.map((post) => (
          <div key={post._id} className="post-item" onClick={() => handleModal(post)}>
            <img src={post.image} className="post-item-img" alt="post-img" />
            {userData._id === user._id &&
              <HighlightOffIcon className='post-item-delete-icon' onClick={() => dispatch(deletePost(post._id))} />
            }
          </div>
        ))}
      </div>

      <Modal open={modalPost} onClose={() => setModalPost(false)}>
        <div className='modal-post'>
          <div className='modal-post-img-container'>
            <img src={modalData.image || userAvatar} alt="" className='modal-post-img' />
          </div>
          <div className='modal-post-info-container'>
            <div className='modal-post-info-top'>
              <div className='modal-post-info-top-user'>
                <img src={userData.image || userAvatar} alt="" className='modal-post-user-img' />
                <span>{modalData.username}</span>
              </div>
              <MoreHorizIcon className='modal-post-more-icon' />
            </div>
            <div className='modal-post-info'>
              <div className='modal-post-owner'>
                <div className='modal-post-owner-user'>
                  <img src={userData.image || userAvatar} alt="" className='modal-post-user-img' />
                  <div className='modal-Post-text-field'>
                    <span className='modal-post-username'>{modalData.username}</span>
                    <div className='modal-post-desc'>{modalData.text}</div>
                  </div>
                </div>
                <div className='modal-post-hashtag'>#javascript #typescript #react #reactnative #vuejs #webdevelopment #webdeveloper #angular #webdesigner #html #html5 #programming #css #css3 #js #jquery #php #nodejs #rubyonrails #java #swift #laravel #mongodb #nosql #mysql #postgresql #software #python #softwaredeveloper #softwareengineering</div>
                <span className='modal-post-ago'>{moment(modalData.createdAt).fromNow()}</span>
              </div>
              <div className='modal-post-user'>
                <img src={userData.image || userAvatar} alt="" className='modal-post-user-img' />
                <span className='modal-post-comment-username'>Lawrence Mitchell</span>
                <div className='modal-post-comment'>Lorem ipsum dolor sit amet.</div>
                <FavoriteBorderIcon className='modal-post-heart-icon' />
              </div>
            </div>
            <div className='modal-post-info-bottom'>
              <div className='modal-post-info-bottom-icons'>
                <FaRegHeart className='modal-post-info-bottom-icon' />
                <FaRegComment className='modal-post-info-bottom-icon' />
                <FiShare className='modal-post-info-bottom-icon' />
                <HiOutlineBookmark className='modal-post-info-bottom-icon' />
              </div>
              <span className='modal-post-info-likes'>576 likes</span>
              <span className='modal-post-info-bottom-ago'>{moment(modalData.createdAt).fromNow()}</span>
              <form>
                <input type="text" placeholder='Add comment...' className='modal-post-comment-input' />
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AccountPosts