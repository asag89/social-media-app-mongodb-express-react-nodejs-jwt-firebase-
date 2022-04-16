
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { FaRegComment } from "react-icons/fa"
import { FaRegHeart } from "react-icons/fa"
import { FaRegSmile } from "react-icons/fa"
import { FiShare } from "react-icons/fi"
import { HiOutlineBookmark } from "react-icons/hi"

import { Link } from 'react-router-dom';
import moment from "moment"

import userAvatar from "../../assets/avatar.png"
import "./timelinePost.css"

const PostList = ({ post, user }) => {

  return (
    <div key={post._id} className="middle-post-item">
      <div className='middle-post-item-top'>
        <div className='middle-post-item-top-user'>
          <Link to={`/profile/${post.user}`} className="middle-post-item-top-link"><img src={user?.image || userAvatar} alt="" className='middle-post-item-user-img' /></Link>
          <Link to={`/profile/${post.user}`}><b>{post.username}</b></Link>
        </div>
        <MoreHorizIcon />
      </div>
      <div>
        <img src={post.image} alt="" className='middle-post-item-img' />
      </div>
      <div className='middle-post-item-bottom'>
        <div className='post-item-bottom-icons'>
          <div>
            <FaRegHeart className='post-icon' />
            <FaRegComment className='post-icon' />
            <FiShare className='post-icon' />
          </div>
          <div>
            <HiOutlineBookmark className='post-icon' />
          </div>
        </div>
        <div>6 likes</div>
        <p><b>{post.username} </b>{post.text}</p>
        <div className='post-item-info'>{moment(post.createdAt).fromNow()}</div>
        <div className='post-item-info'>14 comments</div>
        <div className='post-item-add-comment'>
          <FaRegSmile />
          <input type="text" className='post-item-comment-input' placeholder='Add comment...' />
        </div>
      </div>
    </div>
  )
}

export default PostList