
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, resetPost } from '../../feautures/post/postSlice';

import { CircularProgress } from '@mui/material';

import PostForm from "../postForm/PostForm"
import TimelinePost from '../timelinePost/TimelinePost';
import "./timeline.css"

const Timeline = () => {
  const dispatch = useDispatch()
  const { posts, isLoading } = useSelector((state) => state.post)
  const { user } = useSelector((state) => state.currentUser)

  useEffect(() => {
    dispatch(getAllPosts())
    return () => {
      resetPost()
    }
  }, [dispatch])

  if (isLoading) {
    return (
      <CircularProgress />
    )
  }

  return (
    <section className='middle-wrapper'>
      <PostForm user={user} />
      <div className='middle-posts'>
        {posts.map((post) => (
          <TimelinePost key={post._id} post={post} user={user}/>
        ))}
      </div>
    </section>
  )
}

export default Timeline