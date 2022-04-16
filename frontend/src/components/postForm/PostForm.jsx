
import userAvatar from "../../assets/avatar.png"

import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../feautures/post/postSlice';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from '../../firebase';

import "./postForm.css"

const PostForm = ({ user }) => {

  const dispatch = useDispatch()
  const [text, setText] = useState("")
  const [image, setImage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (image && text) {
      const imageName = new Date().getTime() + image.name
      const storage = getStorage(app)
      const storageRef = ref(storage, imageName)
      const uploadTask = uploadBytesResumable(storageRef, image);

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
            const post = { text, image: downloadURL }
            dispatch(createPost(post))
          });
        }
      );
    }
    setText("")
    setImage(null)
  }
  return (
    <div className='post-form'>
      <form onSubmit={handleSubmit}>
        <div className='post-form-top'>
          <img src={user?.image || userAvatar} alt="" className='user-profile-img' />
          <textarea className='post-form-textarea' value={text} onChange={e => setText(e.target.value)} placeholder='What do you think?' maxLength={174} rows="5" />
        </div>
        <div className='post-form-bottom'>
          <div className='post-form-bottom-icon-wrapper'>
            <div className='post-form-bottom-icon-item'>
              <label htmlFor="file" className='post-form-bottom-label'>
                <BrokenImageOutlinedIcon className='post-form-bottom-icon' />
                <input type="file" id="file" className='post-form-input-file' onChange={(e) => setImage(e.target.files[0])} />
                Add Photo
              </label>
            </div>
            <div className='post-form-bottom-icon-item'>
              <FmdGoodOutlinedIcon className='post-form-bottom-icon' />
              <span>Location</span>
            </div>
          </div>
          <button type='submit' className='post-form-bottom-btn'>Send</button>
        </div>
      </form>
    </div>
  )
}

export default PostForm