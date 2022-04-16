
import HomeIcon from '@mui/icons-material/Home';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import GroupsIcon from '@mui/icons-material/Groups';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';

import userAvatar from "../../assets/avatar.png"
import "./leftSide.css"

const LeftSide = () => {

  const { user } = useSelector((state) => state.currentUser)

  return (
    <section className='left-side-wrapper'>
      <div className='left-side'>
        <div className='left-side-items'>
          <Link to="/">
            <div className='left-side-item'>
              <HomeIcon className='left-side-item-icon' />
              <span className='left-side-item-text'>Home</span>
            </div>
          </Link>
          <div className='left-side-item'>
            <NotificationsNoneIcon className='left-side-item-icon' />
            <span className='left-side-item-text'>Notifications</span>
          </div>
          <div className='left-side-item'>
            <MailOutlineOutlinedIcon className='left-side-item-icon' />
            <span className='left-side-item-text'>Messages</span>
          </div>
          <div className='left-side-item'>
            <BookmarkBorderIcon className='left-side-item-icon' />
            <span className='left-side-item-text'>Place marks</span>
          </div>
          <Link to={`/profile/${user?.username.toLowerCase()}`}>
            <div className='left-side-item'>
              <AccountCircleIcon className='left-side-item-icon' />
              <span className='left-side-item-text'>Profile</span>
            </div>
          </Link>
          <div className='left-side-item'>
            <GroupsIcon className='left-side-item-icon' />
            <span className='left-side-item-text'>Communities</span>
          </div>
        </div>
        <div className='left-side-profile'>
          <img src={user?.image || userAvatar} alt="" className='left-side-profile-img' />
          <div className='left-side-profile-info'>
            <div className='left-side-profile-name'>{user?.username}</div>
            <div className='left-side-profile-mail'>@{user?.email.split("@")[0]}</div>
          </div>
          <MoreHorizIcon className='left-side-more-icon' />
        </div>
      </div>
    </section>
  )
}

export default LeftSide