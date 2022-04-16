
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { recommendedUsers, followUnfollow } from "../../feautures/user/userSlice"
import { getAllPosts } from "../../feautures/post/postSlice"

import Footer from "../footer/Footer"
import userAvatar from "../../assets/avatar.png"
import "./rightSide.css"

const RightSide = () => {
  
  const dispatch = useDispatch()

  const { users } = useSelector((state) => state.user)

  const handleFollow = async(userId) => {
    await dispatch(followUnfollow(userId))
    await dispatch(recommendedUsers())
    dispatch(getAllPosts())
  }

  useEffect(() => {
    dispatch(recommendedUsers())
  }, [dispatch])

  return (
    <section className="right-side-wrapper">
      <div className="right-side">
        {users.length > 0 &&
          <div className="right-side-header">
            <div>Suggestions for you</div>
            <div>See all</div>
          </div>
        }
        <div className="right-side-suggestions">
          {users.map((user) => (
            <div key={user._id} className="suggestion-item">
              <div>
                <img src={user.image || userAvatar} alt="" className="user-profile-img" />
                <div className="suggestion-item-name"><Link to={`/profile/${user._id}`}>{user.username}</Link></div>
              </div>
              <div className="suggestion-item-follow"><button onClick={() => handleFollow(user._id)}>follow</button></div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </section>
  )
}

export default RightSide